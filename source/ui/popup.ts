import {selectors} from "../constants/selectors";
import {User} from "../user/user";
import {List} from "./list";
import {createTagElement, filterTags, searchTags, Tag} from "../tag/tag";
import {storageService} from "../util/storage";

const browser = require("webextension-polyfill");
const debounce = require('debounce-promise');

export class Popup {
    private user: User;
    private list: List;

    constructor(user: User, list: List) {
        if (!user || !list)
            throw new TypeError('invalid user or list.');

        this.user = user;
        this.list = list;

        if(!document.getElementById(selectors.popup.main)) {
            const popupElement = document.createElement('div');
            popupElement.id = selectors.popup.main;
            popupElement.onmouseleave = _ => this.hide();
            popupElement.innerHTML = `
            <div class="${selectors.popup.wrappers.main}">
                <div id="${selectors.popup.wrappers.searchResults}">
                    <div class="${selectors.popup.title}">
                        ${browser.i18n.getMessage("searchResults")}</div>
                    <div id="${selectors.popup.searchResults}"></div>
                </div>
                <div id="${selectors.popup.wrappers.freq}">
                    <div class="${selectors.popup.title}">
                        ${browser.i18n.getMessage("frequentlyUsed")}</div>
                    <div id="${selectors.popup.freq}"></div>
                </div>
                <div id="${selectors.popup.sets}"></div>
            </div>
            <div class="${selectors.popup.wrappers.search}">
                <input type="search" id="${selectors.popup.search}" autocapitalize="off" autocomplete="off" 
                spellcheck="false" placeholder="${browser.i18n.getMessage("searchTagPlaceholder")}">
            </div>`;

            document.body.append(popupElement);

            // popup control events
            document.onkeydown = (e) => {
                if (this.isShowing()) {
                    if (e.key === 'Escape') {
                        this.hide();
                    }
                    // if popup is showing - set input element focused
                    else if (e.key.match(/(\w|\s)/g)) {
                        document.getElementById(selectors.popup.search).focus();
                    }
                }
            };
        }
    }

    show(location?: [number, number]) {
        this.populate()
            .then(() => {
                // add user specific search function (to filter out assigned used tags)
                const search = document.getElementById(selectors.popup.search);
                if(search)
                    search.oninput = (e: Event) => this.tagSearch((<HTMLInputElement>e.target).value);

                  // determine popup color
                determinePopupColor();
                // change display mode from none to block
                getPopupElement().style.display = 'block';
                // position popup in viewport
                if (location !== undefined)
                    calculatePopupPosition(location, 10);
            });
    }

    isShowing(): boolean {
        return getPopupElement().style.display != 'none';
    }

    hide() {
        getPopupElement().style.display = 'none';
    }

    private async populate() {
        const freqElement = document.getElementById(selectors.popup.freq);
        freqElement.innerHTML = '';

        const freqUsedTags = await storageService.getFrequentlyUsed(this.user.getTags());

        if (freqElement && freqUsedTags.length > 0) {
            for (const tag of freqUsedTags)
                this.addTag(tag, freqElement);
            document.getElementById(selectors.popup.wrappers.freq).style.display = 'block';
        } else
            document.getElementById(selectors.popup.wrappers.freq).style.display = 'none';

        const setsElement = document.getElementById(selectors.popup.sets);
        setsElement.innerHTML = '';

        const sets = await storageService.getTagSets();

        if (setsElement && sets.length > 0) {
            for (const set of sets) {
                const tags = filterTags(set.getTags(), freqUsedTags.concat(this.user.getTags()));

                if(tags && tags.length > 0) {
                    const wrapElement = document.createElement('div');
                    wrapElement.className = selectors.popup.wrappers.tagset;

                    const setTitleElement = document.createElement('div');
                    setTitleElement.className = selectors.popup.title;
                    setTitleElement.innerText = set.getName();

                    const setElement = document.createElement('div');
                    setElement.className = selectors.popup.tagset;

                    for (const tag of tags)
                        this.addTag(tag, setElement);

                    wrapElement.append(setTitleElement);
                    wrapElement.append(setElement);

                    setsElement.append(wrapElement);
                }
            }
            document.getElementById(selectors.popup.sets).style.display = 'block';
        } else {
            if (freqUsedTags.length === 0)
                this.hide();   // no tags to display - hide popup
            else
                document.getElementById(selectors.popup.sets).style.display = 'none';
        }
    }

    private addTag(tag: Tag, anchor: HTMLElement) {
        const element = document.createElement('div');
        element.className = selectors.popup.tag;
        element.title = tag.getName();

        element.append(createTagElement(tag));

        element.onclick = () => {
            clearSearch();
            this.user.addTag(tag).then(() => this.list.update());
            this.hide();
        };
        anchor.append(element);
    }

    private tagSearch(term: string) {
        if (term && term.length > 0) {
            const searchFunction = debounce(searchTags, 100, {leading: true});
            searchFunction(term, this.user.getTags()).then((result: Tag[]) => {
                document.getElementById(selectors.popup.wrappers.freq).style.display = 'none';
                const searchResultsElement = document.getElementById(selectors.popup.searchResults);
                searchResultsElement.innerHTML = '';

                for (const tag of result)
                    this.addTag(tag, searchResultsElement);

                document.getElementById(selectors.popup.wrappers.searchResults).style.display = 'block';
            });
        } else {
            document.getElementById(selectors.popup.wrappers.searchResults).style.display = 'none';
            storageService.getFrequentlyUsed(this.user.getTags()).then(value => {
                if (value.length > 0)
                    document.getElementById(selectors.popup.wrappers.freq).style.display = 'block';
            });
        }
    }
}

function getPopupElement() {
    const popup = document.getElementById(selectors.popup.main);

    if (!popup)
        throw new Error('could not get popup element!');

    return popup
}

function clearSearch() {
    (<HTMLInputElement>document.getElementById(selectors.popup.search)).value = "";
    document.getElementById(selectors.popup.wrappers.searchResults).style.display = 'none';
}

function determinePopupColor() {
    // get the background color of the appTable Element - we do this so this extension can be used on any
    // lichess theme and still feel as if it is a part of the site
    let backgroundColorElement = document.querySelector(selectors.app.appTableElement);
    if (backgroundColorElement) {
        const style = getComputedStyle(backgroundColorElement);
        getPopupElement().style.background = style.background;
    }
}

function calculatePopupPosition(location: [number, number], spacing: number = 0) {
    const clientX = location[0];
    const clientY = location[1];

    let newX = clientX;
    let newY = clientY;

    const element = getPopupElement();

    function calc() {
        if ((clientY + element.offsetHeight + spacing) > window.innerHeight)
            newY = clientY - ((clientY + element.offsetHeight + spacing) - window.innerHeight);

        if ((clientX + element.offsetWidth + spacing) > window.innerWidth)
            newX = clientX - ((clientX + element.offsetWidth + spacing) - window.innerWidth);

        element.style.right = element.style.bottom = "auto";
        element.style.top = `${newY - 5}px`;
        element.style.left = `${newX - 20}px`;
    }

    // position the element initially
    calc();

    // observe the dom - the element has the correct dimensions only after the css has been applied - recalculate
    new MutationObserver((mutations, observerInstance) => {
        observerInstance.disconnect();
        calc();
    }).observe(getPopupElement(), {childList: true, attributes: true, subtree: true, characterData: true});
}
