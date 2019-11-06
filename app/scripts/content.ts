import {Selectors} from "./selectors";
import {User} from "./user";
import {Button} from "./button";
import {List} from "./list";

const browser = require("webextension-polyfill/dist/browser-polyfill.min");

require('../styles/font.scss');
require('../styles/layout.scss');
require('../styles/styles.scss');

console.log('LiTags is open source! https://github.com/mpunkenhofer/litags');

const element = document.querySelector(Selectors.app);

if(element) {
    new MutationObserver((mutations, observerInstance) => {
        observerInstance.disconnect();
        createLiTagsElements(document.querySelector(Selectors.userTop), getTopUserName());
        createLiTagsElements(document.querySelector(Selectors.userBot), getBotUserName());
    }).observe(element, {childList: true, attributes: true, subtree: true, characterData: true});
} else {
    console.log('LiTags found no supported anchors on this page.');
}

function getTopUserName() {
    return removeTitle(document.querySelector(`${Selectors.userTop} a`).textContent);
}

function getBotUserName() {
    return removeTitle(document.querySelector(`${Selectors.userBot} a`).textContent);
}

function removeTitle(name: string) {
    const s = name.split(/(\s+)/);
    return s ? s[s.length - 1] : '';
}

function createLiTagsElements(anchor: HTMLElement, username: string) {
    console.log(`Litags creating elements for user: ${username}`);

    if (!anchor || !username)
        return;

    console.log("hhihih");
//     User.getUser(username)
//         .then(user => {
//             const list = new List(anchor, user);
//             const btn = new Button(anchor, user, list);
//             btn.show();
//         })
//         .catch(e => console.error(e));
}
