import {litags} from "./constants";
import {storageService} from "./storage";
import {List} from "./list";
import {User} from "./user";

const browser = require("webextension-polyfill");

export interface Options {
    enabled: boolean,
    gameEnabled: boolean,
    profileEnabled: boolean,
    maxTags: number
    frequentlyUsedCap: number
}

export const defaults: Options = {
    enabled: true,
    gameEnabled: true,
    profileEnabled: true,
    maxTags: 8,
    frequentlyUsedCap: 20
};

// class OptionsPage {
//
//     showUsers() {
//         document.getElementById(litags.selectors.options.content.main).innerHTML =
//             `<h1>${browser.i18n.getMessage("appTitleTaggedUsers")}</h1>
//                 <div class="lt-content-users-header">
//                     <span id="${litags.selectors.options.content.userCount}" class="lt-content-infoText"></span>
//                     </div>
//                     <div class="lt-content-search-wrap">
//                         <input type="search" id="lt-content-user-search" placeholder="Search for a user..." autocapitalize="off" autocomplete="off" spellcheck="false">
//                     </div>
//                 </div>`;
//
//         const userList = document.createElement('div');
//         userList.id = litags.selectors.options.content.userList;
//         document.getElementById(litags.selectors.options.content.main).append(userList);
//
//         OptionsPage.addUsers(userList).catch(e => console.error(e));
//     }
//
//     static async addUsers(anchor: HTMLElement) {
//         if (!anchor)
//             return;
//
//         const users = await storageService.getUsers();
//
//         const userCountElement = document.getElementById(litags.selectors.options.content.userCount);
//         userCountElement.innerText = users.length == 1 ? '1 User' : `${users.length} Users`;
//
//         if (users.length > 0) {
//
//             for (const user of users) {
//                 const userElement = document.createElement('div');
//                 userElement.className = litags.selectors.options.content.user;
//
//                 const userNameElement = document.createElement('span');
//                 userNameElement.className = litags.selectors.options.content.userName;
//                 userNameElement.textContent = user.username;
//
//                 userElement.append(userNameElement);
//                 anchor.append(userElement);
//
//                 const list = new List(userElement, user);
//                 list.show();
//
//                 const userRemoveElement = document.createElement('div');
//                 userRemoveElement.className = litags.selectors.options.content.userRemove;
//                 userRemoveElement.innerHTML =
//                     `<i class="${litags.selectors.icons.trash} ${litags.selectors.options.buttonEffect}"></i>`;
//                 userElement.append(userRemoveElement);
//
//             }
//         }
//     }
// }

init();

function init() {
    console.log('LiTags is open source! https://github.com/mpunkenhofer/litags');

    localize();

    function attachOnClickHandler(element: HTMLElement, handler: () => any) {
        if(element) {
            element.onclick = (ev: Event) => {
                const activeElement = document.querySelector('.active');

                if(activeElement)
                    activeElement.classList.remove('active');

                const newActiveElement = <HTMLElement>ev.target;

                if(newActiveElement)
                    newActiveElement.classList.add('active');

                handler();
            }
        }
    }

    attachOnClickHandler(document.getElementById(litags.selectors.options.nav.settings), displaySettings);
    attachOnClickHandler(document.getElementById(litags.selectors.options.nav.tags), displayTags);
    attachOnClickHandler(document.getElementById(litags.selectors.options.nav.users), displayUsers);
    attachOnClickHandler(document.getElementById(litags.selectors.options.nav.backup), displayBackup);

    displaySettings();
}

function localize() {

}

function displaySettings() {
    const content = document.getElementById(litags.selectors.options.content.main);
    content.innerHTML = `<h1>${browser.i18n.getMessage("appTitleSettings")}</h1>`;

    addSwitch(content, 'Title', 'Litags Enabled', 'Desc', () => {});
}

function displayTags() {
    const content = document.getElementById(litags.selectors.options.content.main);
    content.innerHTML = `<h1>${browser.i18n.getMessage("appTitleTags")}</h1>`;
}

function displayUsers() {
    const content = document.getElementById(litags.selectors.options.content.main);
    content.innerHTML = `<h1>${browser.i18n.getMessage("appTitleUsers")}</h1>`;
}

function displayBackup() {
    const content = document.getElementById(litags.selectors.options.content.main);
    content.innerHTML = `<h1>${browser.i18n.getMessage("appTitleBackup")}</h1>`;
}

function addSeparator(anchor: HTMLElement) {
    if (!anchor)
        return;

    anchor.insertAdjacentHTML('beforeend',
        `<div class="${litags.selectors.options.content.separator}"></div>`);
}

function addSwitch(
    anchor: HTMLElement,
    categoryTitle: string = '',
    title: string = '',
    description: string = '',
    handler: () => any,
    parent?: HTMLInputElement): HTMLInputElement {
    const settingsWrapElement = document.createElement('div');
    settingsWrapElement.className = litags.selectors.options.settings.wrapper;

    if(categoryTitle) {
        settingsWrapElement.innerHTML +=
            `<span class="${litags.selectors.options.headerSecondary}">${categoryTitle}</span>`
    }

    const settingsElement = document.createElement('div');
    settingsElement.className = litags.selectors.options.settings.main;

    if(title) {
        settingsElement.innerHTML +=
            `<span class="${litags.selectors.options.headerPrimary}">${title}</span>`
    }

    const switchElement = document.createElement('label');
    switchElement.className = litags.selectors.options.switch;

    const checkboxElement = document.createElement('input');
    checkboxElement.type = 'checkbox';

    let checked = handler();
    checked = parent ? parent.checked : checked;
    checkboxElement.setAttribute('checked', checked ? 'true' : 'false');

    checkboxElement.onchange = () => {
        if(parent && parent.checked) {

        }

        console.log('hih');
    };

    checkboxElement.onclick = (ev: Event) => {
        console.log('ho');
        console.log(ev.target);
    };


    switchElement.append(checkboxElement);
    switchElement.innerHTML += `<span class="${litags.selectors.options.slider}"></span>`;


    settingsElement.append(switchElement);
    settingsWrapElement.append(settingsElement);

    if(description) {
        settingsWrapElement.innerHTML +=
            `<span class="${litags.selectors.options.content.infoText}">${description}</span>`;
    }

    anchor.append(settingsWrapElement);

    addSeparator(anchor);

    return checkboxElement;
}