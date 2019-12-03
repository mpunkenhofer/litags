import {List} from "../ui/list";
import {User} from "../user/user";
import {ToggleSetting} from "./toggle-setting";
import {selectors} from "../constants/selectors";
import {storageService} from "../util/storage";

const browser = require("webextension-polyfill");

export interface Options {
    enabled: boolean,
    gameEnabled: boolean,
    profileEnabled: boolean,
    maxTags: number
    frequentlyUsedCap: number
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

function displaySettings() {
    const content = document.getElementById(selectors.options.content.main);
    if (!content)
        return;

    content.innerHTML = `<h1>${browser.i18n.getMessage("appTitleSettings")}</h1>`;

    new ToggleSetting(setOptionEnabled, content, 'Litags', 'Litags Enabled', 'Desc');
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
            `<a href="https://lichess.org/@/${user.username}" target="_blank">${user.username}</a>`;
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

    const fileElement = document.createElement('input');
    fileElement.type = 'file';
    fileElement.textContent = 'Test';
    fileElement.onchange = (ev) => {
        const f = (<HTMLInputElement>ev.target).files[0];

        if (f) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const contents = e.target.result;
                console.log(contents);
            };
            reader.readAsText(f);
        }
    };

    content.append(fileElement);
}

function setOptionEnabled(option: Options, bool?: boolean): boolean {
    if (bool != undefined) {
        // if(option.enabled != bool)
        //     browser.runtime.sendMessage({enabled: bool});
        option.enabled = bool;
    }
    return option.enabled;
}
