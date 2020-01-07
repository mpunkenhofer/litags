// import {selectors} from "../../constants/selectors";
//
// export function createToggle(handler: (bool?: boolean) => Promise<boolean>,
//                              categoryTitle: string = '', title: string = '', description: string = '') {
//     const wrapperElement = document.createElement('div');
//     wrapperElement.className = selectors.options.settings.wrapper;
//     if (categoryTitle)
//         wrapperElement.innerHTML = `<span class="${selectors.options.headerSecondary}">${categoryTitle}</span>`;
//
//     const settingElement = document.createElement('div');
//     settingElement.className = selectors.options.settings.main;
//     if (title)
//         settingElement.innerHTML = `<span class="${selectors.options.headerPrimary}">${title}</span>`;
//
//     const labelElement = document.createElement('label');
//     labelElement.className = selectors.options.switch;
//
//     const inputElement = document.createElement('input');
//     inputElement.type = 'checkbox';
//     inputElement.id = selectors.options.slider;
//     inputElement.onchange = (ev) => {
//         const element = <HTMLInputElement>ev.target;
//         handler(element && element.checked).catch(err => console.error(err));
//     };
//
//     handler().then(b => inputElement.checked = b).catch(err => console.error(err));
//
//     const spanElement = document.createElement('span');
//     spanElement.className = selectors.options.slider;
//
//     labelElement.append(inputElement);
//     labelElement.append(spanElement);
//
//     settingElement.append(labelElement);
//
//     wrapperElement.append(settingElement);
//
//     if (description) {
//         const descriptionElement = document.createElement('span');
//         descriptionElement.className = selectors.options.infoText;
//         descriptionElement.innerText = description;
//         wrapperElement.append(descriptionElement);
//     }
//
//     return wrapperElement;
// }