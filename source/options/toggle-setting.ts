import {Options} from "./options";
import {selectors} from "../constants/selectors";
import {optionService} from "./options.service";

export class ToggleSetting {
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
        if (this.parent)
            this.parent.children.push(this);

        title = `<span class="${selectors.options.headerPrimary}">${title}</span>`;

        if (categoryTitle)
            categoryTitle = `<span class="${selectors.options.headerSecondary}">${categoryTitle}</span>`;

        if (description)
            description = `<span class="${selectors.options.content.infoText}">${description}</span>`;

        const id =
            Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 10);

        const settingHtml =
            `<div class="${selectors.options.settings.wrapper}">
            ${categoryTitle}
            <div class="${selectors.options.settings.main}">
                ${title}
                <label class="${selectors.options.switch}">
                <input id="${id}" type="checkbox">
                <span class="${selectors.options.slider}"></span>
                </label>
            </div>
            ${description}
        </div>`;

        anchor.insertAdjacentHTML('beforeend', settingHtml);

        this.element = <HTMLInputElement>document.getElementById(id);

        if (!this.element)
            return;

        async function asyncHandler(b?: boolean): Promise<boolean> {
            const options = await optionService.get();
            const r = handler(options, b);
            if (b != undefined)
                await optionService.set(options);
            return r;
        }

        asyncHandler().then(b => {
            this.element.checked = b;
            if (this.parent && !this.parent.element.checked)
                this.element.disabled = true;
        });

        this.element.onchange = (ev) => {
            const element = <HTMLInputElement>ev.target;
            if (element) {
                if (this.children.length > 0)
                    this.setChildrenDisabled();
                asyncHandler(element.checked);
            }
        };

        if (separator) {
            anchor.insertAdjacentHTML('beforeend',
                `<div class="${selectors.options.content.separator}"></div>`);
        }
    }

    private setChildrenDisabled() {
        for (const child of this.children) {
            child.element.disabled = !this.element.checked;
        }
    }
}
