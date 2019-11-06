import {User} from "./user";
import {Tag} from "./tag";
import {List} from "./list";

const browser = require("webextension-polyfill/dist/browser-polyfill.min");

export class Button {
    private user: User;
    private list: List;
    private anchor: HTMLElement;
    private popup: HTMLElement;
    private button: HTMLElement;

    // language=HTML
    private popupHtml = `
        <div class="lt-popup-list">
            <div id="lt-popup-freq-wrap">
                <div class="lt-popup-title">Frequently Used</div>
                <div id="lt-popup-freq"></div>
            </div>
            <div id="lt-popup-all-wrap">
                <div class="lt-popup-title">Available Tags</div>
                <div id="lt-popup-all"></div>
            </div>
        </div>
        <div class="lt-popup-search-wrap">
            <label for="lt-popup-search"></label><input type="search" id="lt-popup-search">
        </div>`;


    constructor(anchor: HTMLElement, user: User, list: List) {
        if(!user || !anchor)
            throw new TypeError('invalid user or anchor.');

        this.anchor = anchor;
        this.user = user;

        //create the popup element
        this.popup = document.createElement('div');
        this.popup.id = 'lt-popup';
        this.popup.addEventListener('mouseleave', () => this.hidePopup());

        document.body.append(this.popup);

        //create the button
        this.button = document.createElement('div');
        this.button.className = 'lt-btn-addTag-wrap';
        const title = browser.i18n.getMessage("appAddTagButtonTitle");
        this.button.innerHTML = `<button class="lt-btn-addTag" title="${title}">O</button>`;
        this.button.addEventListener('click', (ev) => {
            this.showPopup([ev.clientX, ev.clientY])
        });

        this.anchor.append(this.button);
    }

    public show() {
        this.button.style.display = 'flex';
    }

    public hide() {
        this.button.style.display = 'none';
    }

    private showPopup(location?: [number, number]) {
        this.popup.innerHTML = this.popupHtml;
        // determine popup color
        this.determinePopupColor();
        // put tags into popup
        this.populatePopup()
            .then(() => {
                // change display mode from none to block
                this.popup.style.display = 'block';
                // position popup in viewport
                if(location !== undefined)
                    this.calculatePopupPosition(location, 10);
            })
            .catch(e => console.error(e));
    }

    private hidePopup() {
        this.popup.style.display = 'none';
    }

    private calculatePopupPosition(location: [number, number], spacing: number = 0) {
        const clientX = location[0];
        const clientY = location[1];

        let newX = clientX;
        let newY = clientY;

        const element = this.popup;

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
        }).observe(this.popup, {childList: true, attributes: true, subtree: true, characterData: true});
    }

    private determinePopupColor() {
        // get the background color of the appTable Element - we do this so this extension can be used on any
        // lichess theme and still feel as if it is a part of the site
        let backgroundColorElement = document.querySelector('round__app__table' +
            '');
        if (backgroundColorElement) {
            const style = getComputedStyle(backgroundColorElement);
            this.popup.style.background = style.background;
        }
    }

    private async populatePopup() {
        const allElement = document.getElementById('lt-popup-all-wrap');
        const freqElement = document.getElementById('lt-popup-freq-wrap');

        try {
            const freqUsedTags = await Tag.getFrequentlyUsed(8, this.user.tags);

            if (freqElement && freqUsedTags.length > 0) {
                for (const tag of freqUsedTags)
                    this.addTag(tag, freqElement);
            } else {
                freqElement.style.display = 'none';
            }

            const allAvailableTags = await Tag.getAvailable(freqUsedTags.concat(this.user.tags));

            if(allElement && allAvailableTags.length > 0) {
                for(const tag of allAvailableTags) {
                    this.addTag(tag, allElement);
                }
            } else {
                allElement.style.display = 'none';
            }
        } catch (e) {
            console.error(e);
        }
    }

    private addTag(tag: Tag, anchor: HTMLElement) {
        const element = document.createElement('div');
        element.className = 'lt-popup-tag';
        element.title = tag.name;
        element.innerHTML = `<span class="lt-popup-symbol">${tag.symbol}</span>`;
        element.addEventListener('click', (ev) => {
            this.user.addTag(tag);
            this.hidePopup();
            this.list.update();
        });
        anchor.append(element);
    }
}
