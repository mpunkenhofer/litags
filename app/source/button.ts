import {User} from "./user";
import {Tag} from "./tag";
import {List} from "./list";
import {litags} from "./constants";

const browser = require("webextension-polyfill");
let debounce = require('debounce-promise');

export class Button {
    private user: User;
    private list: List;
    private anchor: HTMLElement;
    private button: HTMLElement;
    private popupActive = false;

    // language=HTML
    private readonly popupHtml = `
        <div class="${litags.selectors.popup.wrappers.main}">
            <div id="${litags.selectors.popup.wrappers.searchResults}">
                <div class="${litags.selectors.popup.title}">Search Results</div>
                <div id="${litags.selectors.popup.searchResults}"></div>
            </div>
            <div id="${litags.selectors.popup.wrappers.freq}">
                <div class="${litags.selectors.popup.title}">Frequently Used</div>
                <div id="${litags.selectors.popup.freq}"></div>
            </div>
            <div id="${litags.selectors.popup.wrappers.all}">
                <div class="${litags.selectors.popup.title}">Available Tags</div>
                <div id="${litags.selectors.popup.all}"></div>
            </div>
        </div>
        <div class="${litags.selectors.popup.wrappers.search}">
            <input type="search" id="${litags.selectors.popup.search}" autocapitalize="off" autocomplete="off" spellcheck="false"
            placeholder="${browser.i18n.getMessage("appSearchPlaceholder")}">
        </div>`;


    constructor(anchor: HTMLElement, user: User, list: List) {
        if (!user || !anchor || !list)
            throw new TypeError('invalid user, anchor or list.');

        this.anchor = anchor;
        this.user = user;
        this.list = list;

        //check if there exists already a popup element
        let popup = document.getElementById(litags.selectors.popup.main);

        if (!popup) {
            // create the popup element
            popup = document.createElement('div');
            popup.id = litags.selectors.popup.main;
            popup.onmouseleave = () => this.hidePopup();
            document.body.append(popup);
        }

        //create the button
        this.button = document.createElement('div');
        this.button.className = litags.selectors.popup.wrappers.addTag;
        const title = browser.i18n.getMessage("appAddTagButtonTitle");
        this.button.innerHTML = `<button class="lt-btn-addTag" title="${title}">O</button>`;
        this.button.onclick = ev => this.showPopup([ev.clientX, ev.clientY]);

        this.anchor.append(this.button);

        this.hide();
    }

    public show() {
        this.button.style.display = 'flex';
    }

    public hide() {
        this.button.style.display = 'none';
        this.hidePopup();
    }

    private showPopup(location?: [number, number]) {
        this.getPopup().innerHTML = this.popupHtml;
        this.initSearchElement();
        // put tags into popup
        this.populatePopup()
            .then(() => {
                // change display mode from none to block
                this.getPopup().style.display = 'block';
                // position popup in viewport
                if (location !== undefined)
                    this.calculatePopupPosition(location, 10);
                // determine popup color
                this.determinePopupColor();
                this.popupActive = true;
            })
            .catch(e => console.error(e));
    }

    private hidePopup() {
        this.popupActive = false;

        this.getPopup().style.display = 'none';
    }

    private initSearchElement() {
        const search = document.getElementById(litags.selectors.popup.search);

        if (search) {
            search.onkeydown = (e: KeyboardEvent) => {
                let term = (<HTMLInputElement>e.target).value;

                if (e.key === 'Backspace') {
                    term = term.substr(0, term.length - 1);
                } else if (e.key.match(/(\w|\s)/g)) {
                    term += e.key;
                }

                if (term.length > 0) {
                    const searchTerm = debounce(Tag.search, 100, {leading: true});
                    searchTerm(term, this.user.tags).then((result: Tag[]) => {
                        document.getElementById(litags.selectors.popup.wrappers.freq).style.display = 'none';
                        const searchResultsElement = document.getElementById(litags.selectors.popup.searchResults);
                        searchResultsElement.innerHTML = '';

                        for (const tag of result)
                            this.addTag(tag, searchResultsElement);

                        document.getElementById(litags.selectors.popup.wrappers.searchResults).style.display = 'block';
                    });
                } else {
                    document.getElementById(litags.selectors.popup.wrappers.searchResults).style.display = 'none';
                    Tag.getFrequentlyUsed(8, this.user.tags).then(value => {
                        if (value.length > 0)
                            document.getElementById(litags.selectors.popup.wrappers.freq).style.display = 'block';
                    });
                }
            };
            // if popup is showing - set input element focused
            document.onkeydown = (e) => {
                if (this.popupActive && e.key.match(/(\w|\s)/g)) {
                    search.focus();
                }
            };
        }
    }

    private calculatePopupPosition(location: [number, number], spacing: number = 0) {
        const clientX = location[0];
        const clientY = location[1];

        let newX = clientX;
        let newY = clientY;

        const element = this.getPopup();

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
        }).observe(this.getPopup(), {childList: true, attributes: true, subtree: true, characterData: true});
    }

    private determinePopupColor() {
        // get the background color of the appTable Element - we do this so this extension can be used on any
        // lichess theme and still feel as if it is a part of the site
        let backgroundColorElement = document.querySelector(litags.selectors.app.appTableElement);
        if (backgroundColorElement) {
            const style = getComputedStyle(backgroundColorElement);
            this.getPopup().style.background = style.background;
        }
    }

    private async populatePopup() {
        try {
            const freqElement = document.getElementById(litags.selectors.popup.freq);
            const freqUsedTags = await Tag.getFrequentlyUsed(8, this.user.tags);

            if (freqElement && freqUsedTags.length > 0) {
                for (const tag of freqUsedTags)
                    this.addTag(tag, freqElement);
                document.getElementById(litags.selectors.popup.wrappers.freq).style.display = 'block';
            } else {
                document.getElementById(litags.selectors.popup.wrappers.freq).style.display = 'none';
            }

            const allElement = document.getElementById(litags.selectors.popup.all);
            const allAvailableTags = await Tag.getAll(freqUsedTags.concat(this.user.tags));

            if (allElement && allAvailableTags.length > 0) {
                for (const tag of allAvailableTags) {
                    this.addTag(tag, allElement);
                }
                document.getElementById(litags.selectors.popup.wrappers.all).style.display = 'block';
            } else {
                if (freqUsedTags.length === 0)
                    this.hidePopup();   // no tags to display - hide popup
                else
                    document.getElementById(litags.selectors.popup.wrappers.all).style.display = 'none';
            }
        } catch (e) {
            console.error(e);
        }
    }

    private addTag(tag: Tag, anchor: HTMLElement) {
        const element = document.createElement('div');
        element.className = litags.selectors.popup.tag;
        element.title = tag.name;
        element.innerHTML = `<span class="lt-popup-symbol">${tag.symbol}</span>`;
        element.onclick = () => {
            this.user.addTag(tag).then(() => this.list.update());
            this.hidePopup();
        };
        anchor.append(element);
    }

    private getPopup() {
        const popup = document.getElementById(litags.selectors.popup.main);
        if (!popup)
            throw new Error('could not get popup element!');
        else return popup
    }
}
