import {selectors} from "../constants/selectors";

const browser = require("webextension-polyfill");

export function displayTags() {
    const content = document.getElementById(selectors.options.content);
    if (!content)
        return;
    content.innerHTML = '';

    const wrap = document.createElement('div');
    wrap.className = selectors.options.tags.wrap;
    wrap.innerHTML =
        `<div class="${selectors.options.tags.sets}">
            <div class="${selectors.options.tags.setListHeader}"></div>
            <div class="${selectors.options.tags.setList}"></div>
        </div>
        <div class="${selectors.options.tags.details}"></div>`;

    content.append(wrap);
}
