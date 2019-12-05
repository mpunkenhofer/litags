import {User} from "../user/user";
import {selectors} from "../constants/selectors";

const browser = require("webextension-polyfill");

export function createSortBy(user: User[]): HTMLElement {
    const element = document.createElement('div');
    element.className = selectors.options.sortby.main;

    const popup = document.createElement('div');
    popup.id = selectors.options.sortby.popup;

    const nameCheckbox = document.createElement('input');
    nameCheckbox.type = 'checkbox';
    nameCheckbox.className = selectors.options.sortby.checkbox;
    nameCheckbox.innerText =  browser.i18n.getMessage("appSortByName");

    const lastSeenCheckbox = document.createElement('input');
    lastSeenCheckbox.type = 'checkbox';
    lastSeenCheckbox.className = selectors.options.sortby.checkbox;
    lastSeenCheckbox.innerText =  browser.i18n.getMessage("appSortByLastSeen");

    const encountersCheckbox = document.createElement('input');
    encountersCheckbox.type = 'checkbox';
    encountersCheckbox.className = selectors.options.sortby.checkbox;
    encountersCheckbox.innerText =  browser.i18n.getMessage("appSortByEncounters");

    popup.append(nameCheckbox);
    popup.append(lastSeenCheckbox);
    popup.append(encountersCheckbox);

    document.body.append(popup);

    const type = document.createElement('button');
    type.className = selectors.options.sortby.type;
    type.onclick = ev => {
        const popup = getPopupElement();
        popup.style.display = (popup.style.display != 'block') ? 'block' : 'none';

        if(popup.style.display == 'block') {
            popup.style.right = element.style.bottom = "auto";
            popup.style.top = `${ev.clientX}px`;
            popup.style.left = `${ev.clientY}px`;
        }
    };

    const order = document.createElement('input');
    order.type = 'checkbox';
    order.className = selectors.options.sortby.order;
    order.onclick = _ => console.log('click order');

    element.append(type);
    element.append(order);

    return element;
}

function getPopupElement() {
    const popup = document.getElementById(selectors.options.sortby.popup);

    if (!popup)
        throw new Error('could not get sortby popup element!');

    return popup
}