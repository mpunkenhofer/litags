import {selectors} from "../constants/selectors";
import {createToggle} from "./elements/toggle";
import {setOptionFactory} from "./options";

const browser = require("webextension-polyfill");

export function displaySettings() {
    const content = document.getElementById(selectors.options.content);
    if (!content)
        return;

    content.innerHTML = `<h1>${browser.i18n.getMessage("settings")}</h1>`;

    content.append(
        createToggle(setOptionFactory('enabled'), 'Litags', 'Litags Enabled', 'Desc'));
}