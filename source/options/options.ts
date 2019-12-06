import {List} from "../ui/list";
import {sortByEncounters, sortByLastSeen, sortByName, User} from "../user/user";
import {createToggle} from "./toggle";
import {selectors} from "../constants/selectors";
import {storageService} from "../util/storage";
import {exportBackup, importBackup} from "../util/backup";
import {createSortBy} from "./sortby";

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

    const header = document.createElement('div');
    header.className = 'lt-user-header';

    content.append(header);

    const tableElement = <HTMLTableElement>document.createElement('table');
    tableElement.id = selectors.options.content.userTable;

    // users
    storageService.getMockUsers().then(users => {
        header.append(createSortBy(users, displayUser,
            {label: browser.i18n.getMessage("appSortByName"), handler: sortByName},
            {label: browser.i18n.getMessage("appSortByLastSeen"), handler: sortByLastSeen},
            {label: browser.i18n.getMessage("appSortByEncounters"), handler: sortByEncounters}));

        displayUser(sortByName(users));
    }).catch(err => console.error(err));
    //add to dom
    content.append(tableElement);
}

function displayUser(users: User[]) {
    const tableElement = <HTMLTableElement>document.getElementById(selectors.options.content.userTable);
    tableElement.innerHTML = '';

    for (const user of users) {
        const newRowElement = <HTMLTableRowElement>tableElement.insertRow();
        // username
        newRowElement.insertCell().innerHTML =
            `<a href="https://lichess.org/@/${user.getUserName()}" target="_blank">${user.getUserName()}</a>`;
        // tag list
        const listCell = newRowElement.insertCell();
        const list = new List(listCell, user);
        list.show();
    }
}

function displayBackup() {
    const content = document.getElementById(selectors.options.content.main);
    if (!content)
        return;

    content.innerHTML = `<h1>${browser.i18n.getMessage("appTitleBackup")}</h1>`;

    const backupElement = document.createElement('div');
    backupElement.className = selectors.options.backup.wrapper;

    const exportElement = document.createElement('div');
    exportElement.className = selectors.options.backup.export;
    const importElement = document.createElement('div');
    importElement.className = selectors.options.backup.import;

    exportElement.append(
        createToggle(setOptionFactory('exportOptions', 'settings'),'',
            browser.i18n.getMessage("appBackupToggleTitleSettings"),'Export LiTags settings.'));
    exportElement.append(
        createToggle(setOptionFactory('exportOptions', 'sets'),'',
            browser.i18n.getMessage("appBackupToggleTitleTagSets")));
    exportElement.append(
        createToggle(setOptionFactory('exportOptions', 'users'),'',
            browser.i18n.getMessage("appBackupToggleTitleUsers")));
    exportElement.append(
        createToggle(setOptionFactory('exportOptions', 'frequentlyUsed'), '',
            browser.i18n.getMessage("appBackupToggleTitleFrequentlyUsed")));

    importElement.append(
        createToggle(setOptionFactory('importOptions', 'settings'),'',
            browser.i18n.getMessage("appBackupToggleTitleSettings")));
    importElement.append(
        createToggle(setOptionFactory('importOptions', 'sets'),'',
            browser.i18n.getMessage("appBackupToggleTitleTagSets")));
    importElement.append(
        createToggle(setOptionFactory('importOptions', 'users'),'',
            browser.i18n.getMessage("appBackupToggleTitleUsers")));
    importElement.append(
        createToggle(setOptionFactory('importOptions', 'frequentlyUsed'), '',
            browser.i18n.getMessage("appBackupToggleTitleFrequentlyUsed")));


    const exportButton = document.createElement('button');
    exportButton.innerText = browser.i18n.getMessage("appBackupExport");
    exportButton.onclick = _ => exportBackup().then(backup => {
        const a = document.createElement('a');
        a.download = `litags-backup-${new Date().getTime()}`;
        a.href = URL.createObjectURL(new Blob([backup], {type: 'application/json'}));
        a.onload = _ => URL.revokeObjectURL(a.href);
        a.click();
    }).catch(err => console.error(err));

    const importButton = <HTMLInputElement>document.createElement('input');
    importButton.innerText =  browser.i18n.getMessage("appBackupImport");
    importButton.type = 'file';
    importButton.accept = '.json';
    importButton.onchange = (ev) => {
        const f = (<HTMLInputElement>ev.target).files[0];
            if (f) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const contents = e.target.result;
                    importBackup(contents as string).catch(err => console.error(err));
                };
                reader.readAsText(f);
            }
    };

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