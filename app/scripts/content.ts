import {User} from "./user";
import {Button} from "./button";
import {List} from "./list";

const browser = require("webextension-polyfill/dist/browser-polyfill.min");

require('../styles/font.scss');
require('../styles/layout.scss');
require('../styles/styles.scss');

console.log('LiTags is open source! https://github.com/mpunkenhofer/litags');

const element = document.querySelector('.round__app');

if(element) {
    new MutationObserver((mutations, observerInstance) => {
        observerInstance.disconnect();
        console.log('mutation');
        createLiTagsElements(document.querySelector('.ruser-top'), getTopUserName());
        createLiTagsElements(document.querySelector('.ruser-bottom'), getBotUserName());
    }).observe(element, {childList: true, attributes: true, subtree: true, characterData: true});
} else {
    console.log('LiTags found no supported anchors on this page.');
}

function getTopUserName() {
    return removeTitle(document.querySelector('.ruser-top a').textContent);
}

function getBotUserName() {
    return removeTitle(document.querySelector('.ruser-bottom a').textContent);
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
