import {selectors} from "../constants/selectors";

const browser = require("webextension-polyfill");

export function displayTags() {
    const content = document.getElementById(selectors.options.content);
    if (!content)
        return;

    content.innerHTML = `<h1>${browser.i18n.getMessage("tags")}</h1>`;
}
