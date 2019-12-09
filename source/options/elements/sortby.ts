import {selectors} from "../../constants/selectors";

const debounce = require('debounce-promise');

let idCount = 0;

export function createSortDirection<T>(item: T[], display: (item: T[]) => void,
                                       config: {label: string, handler: (item: T[], ascending: boolean) => T[]}) {
    return createSortBy<T>(document.body, item, display, config);
}

export function createSortBy<T>(popupAnchor: HTMLElement, item: T[], display: (item: T[]) => void,
                                ...configs: {label: string, handler: (item: T[], ascending: boolean) => T[]}[])
    : HTMLElement {
    if(!item || !display || configs.length < 1)
        throw Error('invalid item, configs or display function.');

    const displayFunction = debounce(display, 200);

    const element = document.createElement('div');
    element.className = selectors.options.sortby.main;

    const order = document.createElement('input');
    order.type = 'checkbox';
    order.className = selectors.options.sortby.order;

    const type = configs.length > 1 ?
        document.createElement('button') : document.createElement('div');

    type.className = selectors.options.sortby.type;
    type.textContent = configs[0].label;

    if(configs.length > 1) {
        const popupID = `${selectors.options.sortby.popup.main}-${idCount}`;
        const popup = document.createElement('div');
        popup.className = selectors.options.sortby.popup.main;
        popup.id = popupID;

        type.onclick = ev => {
            const typeElement = <HTMLElement>ev.target;
            if (!typeElement)
                return;

            const popup = document.getElementById(popupID);
            popup.style.display = (popup.style.display != 'block') ? 'block' : 'none';

            if (popup.style.display == 'block') {
                popup.style.right = "auto";
                popup.style.top = `${getOffset(typeElement).bot}px`;
                popup.style.left = `${getOffset(typeElement).left}px`;
            }
        };

        const popupInnerWrap = document.createElement('div');
        popupInnerWrap.className = selectors.options.sortby.popup.checkBoxes;

        popup.append(popupInnerWrap);

        for (let i = 0; i < configs.length; i++) {
            const checkBoxID = `${selectors.options.sortby.popup.checkBox}-${idCount}`;

            const checkBoxWrapElement = document.createElement('div');
            checkBoxWrapElement.className = selectors.options.sortby.popup.checkBoxWrap;
            checkBoxWrapElement.onclick = _ => {
                document.querySelectorAll<HTMLInputElement>(`#${popupID} input`).forEach(input => {
                    input.checked = false;
                });

                type.textContent = configs[i].label;
                checkBox.checked = true;
                popup.style.display = 'none';

                displayFunction(getHandler(type.textContent, configs)(item, order.checked));
            };

            const checkBox = <HTMLInputElement>document.createElement('input');
            checkBox.type = 'checkbox';
            checkBox.id = checkBoxID;
            checkBox.className = selectors.options.sortby.popup.checkBox;
            checkBox.checked = (i == 0);

            checkBoxWrapElement.append(checkBox);
            checkBoxWrapElement.insertAdjacentHTML('beforeend',
                `<span class="${selectors.options.sortby.popup.check}"></span>
            <label for="${checkBoxID}">${configs[i].label}</label>`);

            popupInnerWrap.append(checkBoxWrapElement);
            idCount++;
        }

        popupAnchor.append(popup);

        //hide when clicked outside popup
        document.body.onclick = e => {
            const popup = document.getElementById(popupID);
            if(popup.contains(<Node>e.target) || type.isSameNode(<Node>e.target))
                return;

            popup.style.display = 'none';
        }
    } else {
        type.onclick = _ => displayFunction(getHandler(type.textContent, configs)(item, order.checked));
    }

    const orderWrap = document.createElement('div');
    orderWrap.className = selectors.options.sortby.orderWrap;

    orderWrap.onclick = _ => {
        order.checked = !order.checked;
        displayFunction(getHandler(type.textContent, configs)(item, order.checked));
    };

    orderWrap.append(order);
    orderWrap.insertAdjacentHTML(
        'beforeend',
        `<span class="${selectors.options.sortby.popup.check} ${selectors.options.buttonEffect}"></span>`);

    element.append(type);
    element.append(orderWrap);

    return element;
}

function getOffset(element: HTMLElement) {
    const rect = element.getBoundingClientRect();
    return {
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY,
        bot: rect.bottom + window.scrollY,
        right: rect.right + window.scrollX
    };
}

function getHandler<T>(label: string, configs: {label: string, handler: (item: T[], ascending: boolean) => T[]}[]) {
    if(!label || label.length < 1 || configs.length < 1)
        throw Error('invalid label or configs');

    const config = configs.find(config =>  config.label == label);

    return (config != undefined) ? config.handler : configs[0].handler;
}