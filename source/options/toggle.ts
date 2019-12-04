import {selectors} from "../constants/selectors";

// export class Toggle {
//     private readonly element: HTMLInputElement = null;
//     private readonly parent: Toggle = null;
//     private children: Toggle[] = [];
//
//     constructor(
//         handler: (bool?: boolean) => Promise<boolean>,
//         anchor: HTMLElement,
//         categoryTitle: string,
//         title: string,
//         description: string,
//         parent: Toggle = null,
//         separator: boolean = true) {
//
//         this.parent = parent;
//         if (this.parent)
//             this.parent.children.push(this);
//
//         title = `<span class="${selectors.options.headerPrimary}">${title}</span>`;
//
//         if (categoryTitle)
//             categoryTitle = `<span class="${selectors.options.headerSecondary}">${categoryTitle}</span>`;
//
//         if (description)
//             description = `<span class="${selectors.options.content.infoText}">${description}</span>`;
//
//         const id =
//             Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 10);
//
//         const settingHtml =
//             `<div class="${selectors.options.settings.wrapper}">
//             ${categoryTitle}
//             <div class="${selectors.options.settings.main}">
//                 ${title}
//                 <label class="${selectors.options.switch}">
//                 <input id="${id}" type="checkbox">
//                 <span class="${selectors.options.slider}"></span>
//                 </label>
//             </div>
//             ${description}
//         </div>`;
//
//         anchor.insertAdjacentHTML('beforeend', settingHtml);
//
//         this.element = <HTMLInputElement>document.getElementById(id);
//
//         if (!this.element)
//             return;
//
//         handler().then(b => {
//             this.element.checked = b;
//             if (this.parent && !this.parent.element.checked)
//                 this.element.disabled = true;
//         });
//
//         this.element.onchange = (ev) => {
//             const element = <HTMLInputElement>ev.target;
//             if (element) {
//                 if (this.children.length > 0)
//                     this.setChildrenDisabled();
//                 handler(element.checked);
//             }
//         };
//
//         if (separator) {
//             anchor.insertAdjacentHTML('beforeend',
//                 `<div class="${selectors.options.content.separator}"></div>`);
//         }
//     }
//
//     private setChildrenDisabled() {
//         for (const child of this.children) {
//             child.element.disabled = !this.element.checked;
//         }
//     }
// }

export function createToggle(handler: (bool?: boolean) => Promise<boolean>,
                             categoryTitle: string = '', title: string = '', description: string = '') {
    const wrapperElement = document.createElement('div');
    wrapperElement.className = selectors.options.settings.wrapper;
    if (categoryTitle)
        wrapperElement.innerHTML = `<span class="${selectors.options.headerSecondary}">${categoryTitle}</span>`;

    const settingElement = document.createElement('div');
    settingElement.className = selectors.options.settings.main;
    if (title)
        settingElement.innerHTML = `<span class="${selectors.options.headerPrimary}">${title}</span>`;

    const labelElement = document.createElement('label');
    labelElement.className = selectors.options.switch;

    const inputElement = document.createElement('input');
    inputElement.type = 'checkbox';
    inputElement.id = selectors.options.slider;
    inputElement.onchange = (ev) => {
        const element = <HTMLInputElement>ev.target;
        handler(element && element.checked).catch(err => console.error(err));
    };

    handler().then(b => inputElement.checked = b);

    const spanElement = document.createElement('span');
    spanElement.className = selectors.options.slider;

    labelElement.append(inputElement);
    labelElement.append(spanElement);

    settingElement.append(labelElement);

    wrapperElement.append(settingElement);

    if (description) {
        const descriptionElement = document.createElement('span');
        descriptionElement.className = selectors.options.content.infoText;
        descriptionElement.innerText = description;
        wrapperElement.append(descriptionElement);
    }

    return wrapperElement;
}