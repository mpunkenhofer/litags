import {User} from "../user/user";
import {List} from "./list";
import {selectors} from "../constants/selectors";
import {Popup} from "./popup";

const browser = require("webextension-polyfill");

export class Button {
    private anchor: HTMLElement;
    private button: HTMLElement;
    private popup: Popup;

    constructor(anchor: HTMLElement, user: User, list: List) {
        if (!user || !anchor || !list)
            throw new TypeError('invalid user, anchor or list.');

        this.anchor = anchor;

        //create popup
        this.popup = new Popup(user, list);

        //create the button
        this.button = document.createElement('div');
        this.button.className = selectors.button.wrapper;
        const title = browser.i18n.getMessage("addTagButtonTooltip");
        this.button.innerHTML = `<button class="${selectors.button.main}" title="${title}">O</button>`;
        this.button.onclick = ev => this.popup.show([ev.clientX, ev.clientY]);

        this.anchor.append(this.button);

        this.hide();
    }

    show() {
        this.button.style.display = 'flex';
    }

    hide() {
        this.button.style.display = 'none';
        this.popup.hide();
    }
}
