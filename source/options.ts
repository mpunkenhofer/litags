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

class ToggleSetting {
    private readonly element: HTMLInputElement = null;
    private readonly parent: ToggleSetting = null;
    private children: ToggleSetting[] = [];

    constructor(
        handler: (option: Options, b?: boolean) => boolean,
        anchor: HTMLElement,
        categoryTitle: string,
        title: string,
        description: string,
        parent: ToggleSetting = null,
        separator: boolean = true) {

        this.parent = parent;
        if(this.parent)
            this.parent.children.push(this);

        title = `<span class="${litags.selectors.options.headerPrimary}">${title}</span>`;

        if(categoryTitle)
            categoryTitle = `<span class="${litags.selectors.options.headerSecondary}">${categoryTitle}</span>`;

        if(description)
            description = `<span class="${litags.selectors.options.content.infoText}">${description}</span>`;

        const id =
            Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 10);

        const settingHtml =
            `<div class="${litags.selectors.options.settings.wrapper}">
            ${categoryTitle}
            <div class="${litags.selectors.options.settings.main}">
                ${title}
                <label class="${litags.selectors.options.switch}">
                <input id="${id}" type="checkbox">
                <span class="${litags.selectors.options.slider}"></span>
                </label>
            </div>
            ${description}
        </div>`;

        anchor.insertAdjacentHTML('beforeend', settingHtml);

        this.element = <HTMLInputElement>document.getElementById(id);

        if(!this.element)
            return;

        async function asyncHandler(b?: boolean): Promise<boolean> {
            const options = await storageService.getOptions();
            const r = handler(options, b);
            if(b != undefined)
                storageService.setOptions(options);
            return r;
        }

        asyncHandler().then(b => {
            this.element.checked = b;
            if(this.parent && !this.parent.element.checked)
                this.element.disabled = true;
        });

        this.element.onchange = (ev) => {
            const element = <HTMLInputElement> ev.target;
            if(element) {
                if(this.children.length > 0)
                    this.setChildrenDisabled();
                asyncHandler(element.checked);
            }
        };

        if(separator)
            addSeparator(anchor);
    }

    private setChildrenDisabled() {
        for(const child of this.children) {
            child.element.disabled = !this.element.checked;
        }
    }
}

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
    if(!content)
        return;

    content.innerHTML = `<h1>${browser.i18n.getMessage("appTitleSettings")}</h1>`;

    new ToggleSetting(setOptionEnabled, content,'Litags', 'Litags Enabled', 'Desc');
}

function displayTags() {
    const content = document.getElementById(litags.selectors.options.content.main);
    if(!content)
        return;

    content.innerHTML = `<h1>${browser.i18n.getMessage("appTitleTags")}</h1>`;
}

function displayUsers() {
    const content = document.getElementById(litags.selectors.options.content.main);
    if(!content)
        return;

    content.innerHTML = `<h1>${browser.i18n.getMessage("appTitleUsers")}</h1>`;

    const tableElement = <HTMLTableElement>document.createElement('table');
    // const headElement = tableElement.createTHead();
    // headElement
    storageService.getUsers().then(users => {
        for(const user of users) {
            const newRowElement = <HTMLTableRowElement>tableElement.insertRow();
            // username
            newRowElement.insertCell().innerHTML =
                `<a href="https://lichess.org/@/${user.username}" target="_blank">${user.username}</a>`;
            // tag list
            const listCell = newRowElement.insertCell();
            const list = new List(listCell, user);
            list.show();
            // remove button
            newRowElement.insertCell().innerHTML =
                `<i class="${litags.selectors.icons.trash} ${litags.selectors.options.buttonEffect}"></i>`;
        }
    });

    content.append(tableElement);
}
function displayBackup() {
    const content = document.getElementById(litags.selectors.options.content.main);
    if(!content)
        return;

    content.innerHTML = `<h1>${browser.i18n.getMessage("appTitleBackup")}</h1>`;

    const fileElement = document.createElement('input');
    fileElement.type = 'file';
    fileElement.textContent = 'Test';
    fileElement.onchange = (ev) => {
        const f = (<HTMLInputElement>ev.target).files[0];

        if(f) {
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

function addSeparator(anchor: HTMLElement) {
    if (!anchor)
        return;

    anchor.insertAdjacentHTML('beforeend',
        `<div class="${litags.selectors.options.content.separator}"></div>`);
}

function setOptionEnabled(option: Options, bool?: boolean): boolean {
    if(bool != undefined) {
        // if(option.enabled != bool)
        //     browser.runtime.sendMessage({enabled: bool});
        option.enabled = bool;
    }
    return option.enabled;
}