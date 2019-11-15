import {litags} from "./selectors";

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
        const socialElement = document.createElement('div');
        socialElement.className = litags.selectors.options.nav.socials;
        socialElement.innerHTML =
            `<a href="https://discord.gg/4d7QWUK" target="_blank">
                    <i class="fab fa-discord lt-button-effect"></i>D
                </a>
                <a href="https://github.com/mpunkenhofer/litags" target="_blank">
                    <i class="fab fa-github-square lt-button-effect"></i>G
                </a>`;
        anchor.append(socialElement);
    }

    showSettings() {
        document.getElementById(litags.selectors.options.content).innerHTML = `<h1>Settings</h1>`;
    }

    showUsers() {
        document.getElementById(litags.selectors.options.content).innerHTML =
            `<div class="lt-content-users">
                <h1>Tagged Users</h1>
                <div class="lt-content-users-header">
                    <span id="lt-content-users-count" class="lt-content-info-text">13 Users</span>
                    <span class="lt-dropdown-info">Sort by:</span>
                    <div class="lt-dropdown">
                        <div class="lt-dropdown-button">Name<i class="fa fa-angle-down" aria-hidden="true"></i></div>
                        <div class="lt-dropdown-list">
                            <div class="lt-dropdown-item"></div>
                            <div class="lt-dropdown-item"></div>
                        </div>
                    </div>
                    <div class="lt-content-search-wrap">
                        <input type="search" id="lt-content-user-search" placeholder="Search for a user..." autocapitalize="off" autocomplete="off" spellcheck="false">
                    </div>
                </div>
                <div class="lt-content-separator"></div>
                <div class="lt-content-user">
                    <span class="lt-content-userName">Test</span>
                    <div class="lt-list">
                        <ul>
                            <li>0</li>
                            <li>1</li>
                            <li>2</li>
                            <li>3</li>
                            <li>4</li>
                            <li>5</li>
                            <li>6</li>
                        </ul>
                    </div>
                    <div class="lt-content-userRemove">
                        <i class="fa fa-trash-o lt-button-effect" aria-hidden="true"></i>
                    </div>
                </div>
                <div class="lt-content-separator"></div>
                <div class="lt-content-user">
                    <span class="lt-content-userName">Test</span>
                    <div class="lt-list">
                        <ul>
                            <li>0</li>
                            <li>1</li>
                            <li>2</li>
                            <li>3</li>
                            <li>4</li>
                            <li>5</li>
                            <li>6</li>
                        </ul>
                    </div>
                    <div class="lt-content-userRemove">
                        <i class="fa fa-trash-o lt-button-effect" aria-hidden="true"></i>
                    </div>
                </div>
            </div>`;

    }

    showTags() {
        document.getElementById(litags.selectors.options.content).innerHTML = `<h1>Tags</h1>`;

    }

    showBackup() {
        document.getElementById(litags.selectors.options.content).innerHTML = `<h1>Backup</h1>`;
    }
}

console.log('[Options-Script] LiTags is open source! https://github.com/mpunkenhofer/litags');

document.addEventListener("DOMContentLoaded", function () {
    new OptionsPage();
});



