import {selectors} from "../constants/selectors";
import {storageService} from "../util/storage";
import {displaySettings} from "./settings";
import {displayBackup} from "./backup";
import {displayTags} from "./tags";
import {displayUsers} from "./users";

const browser = require("webextension-polyfill");
const pkg = require('../../package.json');

export interface BackupOptions {
    sets: boolean,
    users: boolean,
    settings: boolean,
    frequentlyUsed: boolean
}

export interface Options {
    enabled: boolean,
    gameEnabled: boolean,
    profileEnabled: boolean,
    maxTags: number
    frequentlyUsedCap: number,
    exportOptions: BackupOptions,
    importOptions: BackupOptions
}

export const defaultOptions: Options = {
    enabled: true,
    gameEnabled: true,
    profileEnabled: true,
    maxTags: 8,
    frequentlyUsedCap: 20,
    exportOptions: {
        sets: true,
        users: true,
        settings: true,
        frequentlyUsed: true,
    },
    importOptions: {
        sets: true,
        users: true,
        settings: true,
        frequentlyUsed: true,
    }
};

export function setOptionFactory(key: string, subkey?: string) {
    async function f(bool?: boolean): Promise<boolean> {
        const options = await storageService.getOptions();

        if(!(key in options) || (subkey != undefined && !(subkey in options[key])))
            return false;

        if (bool != undefined) {
            if(subkey != undefined)
                options[key][subkey] = bool;
            else
                options[key] = bool;
            await storageService.setOptions(options);
        }

        return (subkey != undefined) ? options[key][subkey] : options[key];
    }

    return f;
}

init();

function init() {
    console.log('LiTags is open source! https://github.com/mpunkenhofer/litags');

    function attachOnClickHandler(element: HTMLElement, handler: () => any, text?: string) {
        if (element) {
            if (text != undefined && text && text.length > 0)
                element.innerText = text;
            element.onclick = (ev: Event) => {
                const activeElement = document.querySelector('.active');

                if (activeElement)
                    activeElement.classList.remove('active');

                const newActiveElement = <HTMLElement>ev.target;

                if (newActiveElement)
                    newActiveElement.classList.add('active');

                handler();
            }
        }
    }

    attachOnClickHandler(document.getElementById(selectors.options.nav.settings), displaySettings,
        browser.i18n.getMessage('settings'));
    attachOnClickHandler(document.getElementById(selectors.options.nav.tags), displayTags,
        browser.i18n.getMessage('tags'));
    attachOnClickHandler(document.getElementById(selectors.options.nav.users), displayUsers,
        browser.i18n.getMessage('users'));
    attachOnClickHandler(document.getElementById(selectors.options.nav.backup), displayBackup,
        browser.i18n.getMessage('backup'));

    displaySettings();

    const version = document.getElementById(selectors.options.version);
    if (version)
        version.textContent = `v${pkg.version}`;
}
