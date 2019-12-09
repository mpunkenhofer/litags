import {selectors} from "../constants/selectors";
import {storageService} from "../util/storage";
import {displaySettings} from "./settings";
import {displayBackup} from "./backup";
import {displayTags} from "./tags";
import {displayUsers} from "./users";

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

    localize();

    function attachOnClickHandler(element: HTMLElement, handler: () => any) {
        if (element) {
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

    attachOnClickHandler(document.getElementById(selectors.options.nav.settings), displaySettings);
    attachOnClickHandler(document.getElementById(selectors.options.nav.tags), displayTags);
    attachOnClickHandler(document.getElementById(selectors.options.nav.users), displayUsers);
    attachOnClickHandler(document.getElementById(selectors.options.nav.backup), displayBackup);

    displaySettings();
}

function localize() {

}

