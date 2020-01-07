// import {selectors} from "../../constants/selectors";
//
// const browser = require("webextension-polyfill");
//
// export function showConfirmModal(message: string, handler: () => void) {
//     let modal = document.getElementById(selectors.options.modal.main);
//
//     if(!modal) {
//         modal = document.createElement('div');
//         modal.id = selectors.options.modal.main;
//         document.body.append(modal);
//     } else {
//         modal.innerHTML = '';
//     }
//
//     const content = document.createElement('div');
//     content.className = selectors.options.modal.content;
//
//     const close = document.createElement('span');
//     close.className = `${selectors.options.modal.close} ${selectors.icons.trash}`;
//     close.onclick = _ => modal.style.display = 'none';
//
//     const text = document.createElement('span');
//     text.textContent = message;
//     text.className = selectors.options.modal.text;
//
//     const buttonWrap = document.createElement('div');
//     buttonWrap.className = selectors.options.modal.buttonWrap;
//
//     const yes = document.createElement('button');
//     yes.className = selectors.options.modal.yes;
//     yes.textContent = browser.i18n.getMessage('yes');
//     yes.onclick = _ => {
//         modal.style.display = 'none';
//         handler();
//     };
//
//     const no = document.createElement('button');
//     no.textContent = browser.i18n.getMessage('no');
//     no.className = selectors.options.modal.no;
//     no.onclick = _ => modal.style.display = 'none';
//
//     buttonWrap.append(yes);
//     buttonWrap.append(no);
//
//     content.append(close);
//     content.append(text);
//     content.append(buttonWrap);
//
//     modal.append(content);
//
//     modal.style.display = 'block';
// }