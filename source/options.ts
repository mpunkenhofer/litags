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

class OptionsPage {
    navElement: HTMLElement;
    activeElement: HTMLElement;

    constructor() {
        this.navElement = document.getElementById(litags.selectors.options.nav.main);

        if (!this.navElement)
            return;

        const settingsElement =
            this.createNavElement(browser.i18n.getMessage("appTitleSettings"), this.showSettings, true);
        this.addNavElements(this.navElement, [settingsElement], 'LiTags');

        const dataElements = [];

        dataElements.push(this.createNavElement(browser.i18n.getMessage("appTitleTags"), this.showTags));
        dataElements.push(this.createNavElement(browser.i18n.getMessage("appTitleUsers"), this.showUsers));
        dataElements.push(this.createNavElement(browser.i18n.getMessage("appTitleBackup"), this.showBackup));
        this.addNavElements(this.navElement, dataElements, browser.i18n.getMessage("appTitleData"));

        this.addNavSocialElements(this.navElement);

        this.showSettings();
    }

    createNavElement(name: string, handler: () => any, active: boolean = false): HTMLElement {
        const navElement = document.createElement('a');
        navElement.className = litags.selectors.options.nav.button;
        navElement.innerText = name;
        navElement.onclick = (ev: Event) => {
            this.activeElement.classList.remove('active');
            handler();
            navElement.classList.add('active');
            this.activeElement = navElement;
        };

        if (active) {
            navElement.classList.add('active');
            this.activeElement = navElement;
        }

        return navElement;
    }

    addNavElements(anchor: HTMLElement, elements: HTMLElement[], title: string = ''): HTMLElement {
        if (!anchor)
            return;

        if (title) {
            const titleElement = document.createElement('div');
            titleElement.className = litags.selectors.options.nav.title;
            titleElement.textContent = title;
            anchor.append(titleElement);
        }

        for (let i = 0; i < elements.length; i++)
            anchor.append(elements[i]);

        const separatorElement = document.createElement('div');
        separatorElement.className = litags.selectors.options.nav.separator;
        anchor.append(separatorElement);

        return anchor;
    }

    addNavSocialElements(anchor: HTMLElement) {
        if (!anchor)
            return;

        const socialElement = document.createElement('div');
        socialElement.className = litags.selectors.options.nav.socials;
        socialElement.innerHTML = `<a href="${litags.links.discord}" target="_blank">
<i class="${litags.selectors.icons.discord} ${litags.selectors.options.buttonEffect}"></i>
</a>
<a href="${litags.links.github}" target="_blank">
<i class="${litags.selectors.icons.github} ${litags.selectors.options.buttonEffect}"></i>
</a>`;
        anchor.append(socialElement);
    }

    showSettings() {
        document.getElementById(litags.selectors.options.content.main).innerHTML = `<h1>Settings</h1>`;
    }

    showUsers() {
        document.getElementById(litags.selectors.options.content.main).innerHTML =
            `<h1>${browser.i18n.getMessage("appTitleTaggedUsers")}</h1>
                <div class="lt-content-users-header">
                    <span id="${litags.selectors.options.content.userCount}" class="lt-content-infoText"></span>
                    <span class="lt-dropdown-info">Sort by:</span>
                    <div class="lt-dropdown">
                        <div class="lt-dropdown-button">Name<i class=""></i></div>
                        <div class="lt-dropdown-list">
                            <div class="lt-dropdown-item"></div>
                            <div class="lt-dropdown-item"></div>
                        </div>
                    </div>
                    <div class="lt-content-search-wrap">
                        <input type="search" id="lt-content-user-search" placeholder="Search for a user..." autocapitalize="off" autocomplete="off" spellcheck="false">
                    </div>
                </div>`;

        const userList = document.createElement('div');
        userList.id = litags.selectors.options.content.userList;
        document.getElementById(litags.selectors.options.content.main).append(userList);

        OptionsPage.addUsers(userList).catch(e => console.error(e));
    }

    static async addUsers(anchor: HTMLElement) {
        if (!anchor)
            return;

        const users = await storageService.getUsers();

        const userCountElement = document.getElementById(litags.selectors.options.content.userCount);
        userCountElement.innerText = users.length == 1 ? '1 User' : `${users.length} Users`;

        if (users.length > 0) {
            OptionsPage.addSeparator(anchor);

            for (const user of users) {
                const userElement = document.createElement('div');
                userElement.className = litags.selectors.options.content.user;

                const userNameElement = document.createElement('span');
                userNameElement.className = litags.selectors.options.content.userName;
                userNameElement.textContent = user.username;

                userElement.append(userNameElement);
                anchor.append(userElement);

                const list = new List(userElement, user);
                list.show();

                const userRemoveElement = document.createElement('div');
                userRemoveElement.className = litags.selectors.options.content.userRemove;
                userRemoveElement.innerHTML =
                    `<i class="${litags.selectors.icons.trash} ${litags.selectors.options.buttonEffect}"></i>`;
                userElement.append(userRemoveElement);

                OptionsPage.addSeparator(anchor);
            }
        }
    }

    static addSeparator(anchor: HTMLElement) {
        if (!anchor)
            return;

        anchor.insertAdjacentHTML('beforeend',
            `<div class="${litags.selectors.options.content.separator}"></div>`);
    }

    showTags() {
        document.getElementById(litags.selectors.options.content.main).innerHTML = `<h1>Tags</h1>`;

    }

    showBackup() {
        document.getElementById(litags.selectors.options.content.main).innerHTML = `<h1>Backup</h1>`;
    }
}

console.log('LiTags is open source! https://github.com/mpunkenhofer/litags');

new OptionsPage();
