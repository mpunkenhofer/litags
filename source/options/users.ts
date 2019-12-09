import {selectors} from "../constants/selectors";
import {storageService} from "../util/storage";
import {searchUsers, sortByEncounters, sortByLastSeen, sortByName, User} from "../user/user";
import {createSortDirection} from "./elements/sortby";
import {List} from "../ui/list";
import {showConfirmModal} from "./elements/modal";

const browser = require("webextension-polyfill");
const debounce = require('debounce-promise');

export function displayUsers() {
    const content = document.getElementById(selectors.options.content);
    if (!content)
        return;

    content.innerHTML = `<h1>${browser.i18n.getMessage("users")}</h1>`;

    const header = document.createElement('div');
    header.className = selectors.options.users.header;

    const userCount = document.createElement('div');
    userCount.className = selectors.options.users.count;

    const search = <HTMLInputElement>document.createElement('input');
    search.className = selectors.options.users.search;
    search.autocapitalize = 'off';
    search.autocomplete = 'off';
    search.spellcheck = false;
    search.placeholder = browser.i18n.getMessage("searchUserPlaceholder");

    header.append(userCount);
    header.append(search);

    content.append(header);

    const table = <HTMLTableElement>document.createElement('table');
    table.id = selectors.options.users.table;

    // users
    storageService.getMockUsers().then(users => {
        search.oninput = e => {
            const term = (<HTMLInputElement>e.target).value;
            if (term && term.length > 0) {
                const searchFunction = debounce(searchUsers, 100, {leading: true});
                searchFunction(term, users).then((result: User[]) => {
                    if(!result || result.length < 1)
                        clearTable(table);

                    createUserTable(table, result, userCount, browser.i18n.getMessage('usersFound'));
                });
            } else {
                createUserTable(table, users, userCount, browser.i18n.getMessage('taggedUsers'));
            }
        };

        createUserTable(table, users, userCount, browser.i18n.getMessage('taggedUsers'));
    }).catch(err => console.error(err));
    //add to dom
    content.append(table);
}

function clearTable(table: HTMLTableElement) {
    table.innerHTML = '';
}

function createUserTable(table: HTMLTableElement, users: User[],
                         countElement?: HTMLElement, countElementTitle: string = 'Tagged Users') {
    if(!users && countElement != undefined)
        countElement.textContent = `${countElementTitle}: 0`;

    if(countElement != undefined)
        countElement.textContent = `${countElementTitle}: ${users.length}`;

    if(users && users.length > 0) {
        createUserTableHeader(users, table);
        createUserTableBodyFunction(table)(sortByName(users));
    }
}

function createUserTableHeader(users: User[], table: HTMLTableElement) {
    if(!users || users.length < 1)
        return;

    if(table.tHead)
        table.tHead.remove();

    const header = table.createTHead();
    const headerRow = <HTMLTableRowElement>header.insertRow();
    const displayFunction = createUserTableBodyFunction(table);
    headerRow.insertCell().append(createSortDirection(users, displayFunction,
        {label: browser.i18n.getMessage('name'), handler: sortByName}));
    headerRow.insertCell().innerText = browser.i18n.getMessage('tags');
    headerRow.insertCell().append(createSortDirection(users, displayFunction,
        {label: browser.i18n.getMessage('encounters'), handler: sortByEncounters}));
    headerRow.insertCell().append(createSortDirection(users, displayFunction,
        {label: browser.i18n.getMessage('lastSeen'), handler: sortByLastSeen}));
    //remove cell
    headerRow.insertCell();
}

function createUserTableBodyFunction(table: HTMLTableElement): (user: User[]) => void {
    return users => {
        if(!users || users.length < 1)
            return;

        if (table.tBodies.length > 0)
            table.tBodies[0].remove();

        const body = table.createTBody();

        for (const user of users) {
            const newRowElement = <HTMLTableRowElement>body.insertRow();
            // username
            newRowElement.insertCell().innerHTML =
                `<a href="https://lichess.org/@/${user.getUserName()}" target="_blank">${user.getUserName()}</a>`;
            // tag list
            const listCell = newRowElement.insertCell();
            const list = new List(listCell, user);
            list.show();
            // encounters
            newRowElement.insertCell().innerText = `${user.getEncounters()}`;
            // last seen
            newRowElement.insertCell().innerText = `${user.getLastSeen()}`;
            const removeButton = document.createElement('div');
            removeButton.className = selectors.options.users.remove;
            removeButton.innerHTML = `<span class="${selectors.icons.trash} ${selectors.options.buttonEffect}"></span>`;
            removeButton.onclick = _ => {
                const msg = browser.i18n.getMessage('deleteUserConfirm').replace('%s',
                    user.getUserName());
                showConfirmModal(msg, user.delete.bind(user));
            };

            newRowElement.insertCell().append(removeButton);
        }
    }
}