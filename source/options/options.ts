import {List} from "../ui/list";
import {User} from "../user/user";
import {createToggle} from "./toggle";
import {selectors} from "../constants/selectors";
import {storageService} from "../util/storage";
import {exportBackup} from "../util/backup";

const browser = require("webextension-polyfill");

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

function displaySettings() {
    const content = document.getElementById(selectors.options.content.main);
    if (!content)
        return;

    content.innerHTML = `<h1>${browser.i18n.getMessage("appTitleSettings")}</h1>`;

    content.append(
        createToggle(setOptionFactory('enabled'), 'Litags', 'Litags Enabled', 'Desc'));
}

function displayTags() {
    const content = document.getElementById(selectors.options.content.main);
    if (!content)
        return;

    content.innerHTML = `<h1>${browser.i18n.getMessage("appTitleTags")}</h1>`;
}

function displayUsers() {
    const content = document.getElementById(selectors.options.content.main);
    if (!content)
        return;

    content.innerHTML = `<h1>${browser.i18n.getMessage("appTitleUsers")}</h1>`;

    const tableElement = <HTMLTableElement>document.createElement('table');
    // headElement
    createHeader(tableElement);
    // users
    storageService.getAllUsers().then(users => addUsers(tableElement, users));
    //add to dom
    content.append(tableElement);
}

function addUsers(table: HTMLTableElement, users: User[]) {
    for (const user of users) {
        const newRowElement = <HTMLTableRowElement>table.insertRow();
        // username
        newRowElement.insertCell().innerHTML =
            `<a href="https://lichess.org/@/${user.getUserName()}" target="_blank">${user.getUserName()}</a>`;
        // tag list
        const listCell = newRowElement.insertCell();
        const list = new List(listCell, user);
        list.show();
        // remove button
        newRowElement.insertCell().innerHTML =
            `<i class="${selectors.icons.trash} ${selectors.options.buttonEffect}"></i>`;
    }
}

function createHeader(table: HTMLTableElement) {
    const headElement = table.createTHead();
    const headerRow = headElement.insertRow();
    const userNameCell = headerRow.insertCell();
    userNameCell.textContent = 'Username';
}

function displayBackup() {
    const content = document.getElementById(selectors.options.content.main);
    if (!content)
        return;

    content.innerHTML = `<h1>${browser.i18n.getMessage("appTitleBackup")}</h1>`;

    // const fileElement = document.createElement('input');
    // fileElement.type = 'file';
    // fileElement.textContent = 'Test';
    // fileElement.onchange = (ev) => {
    //     const f = (<HTMLInputElement>ev.target).files[0];
    //
    //     if (f) {
    //         const reader = new FileReader();
    //         reader.onload = (e) => {
    //             const contents = e.target.result;
    //             console.log(contents);
    //         };
    //         reader.readAsText(f);
    //     }
    // };
    //
    // content.append(fileElement);

    const backupElement = document.createElement('div');
    backupElement.className = selectors.options.backup.wrapper;

    const exportElement = document.createElement('div');
    exportElement.className = selectors.options.backup.export;
    const importElement = document.createElement('div');
    importElement.className = selectors.options.backup.import;

    exportElement.append(
        createToggle(setOptionFactory('exportOptions', 'settings'),'', 'Settings',
            'Export LiTags settings.'));
    exportElement.append(
        createToggle(setOptionFactory('exportOptions', 'sets'),'', 'Tag Sets'));
    exportElement.append(
        createToggle(setOptionFactory('exportOptions', 'users'),'', 'Users'));
    exportElement.append(
        createToggle(setOptionFactory('exportOptions', 'frequentlyUsed'), '',
            'Frequently Used Tags'));

    importElement.append(
        createToggle(setOptionFactory('importOptions', 'settings'),'', 'Settings'));
    importElement.append(
        createToggle(setOptionFactory('importOptions', 'sets'),'', 'Tag Sets'));
    importElement.append(
        createToggle(setOptionFactory('importOptions', 'users'),'', 'Users'));
    importElement.append(
        createToggle(setOptionFactory('importOptions', 'frequentlyUsed'), '',
            'Frequently Used Tags'));


    const exportButton = document.createElement('button');
    exportButton.innerText = 'Export';
    exportButton.onclick = _ => exportBackup().then(backup => console.log(backup)).catch(err => console.error(err));
    const importButton = document.createElement('button');
    importButton.innerText = 'Import';

    exportElement.append(exportButton);
    importElement.append(importButton);

    backupElement.append(exportElement);
    backupElement.append(importElement);

    content.append(backupElement);
}

function setOptionFactory(key: string, subkey?: string) {
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