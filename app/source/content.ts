import {User} from "./user";
import {Button} from "./button";
import {List} from "./list";
import {getAllOptions, Options} from "./options";

import {Dict} from "awesome-typescript-loader/dist/instance";
import {Tag} from "./tag";

console.log('LiTags is open source! https://github.com/mpunkenhofer/litags');

const browser = require("webextension-polyfill");

getAllOptions().then((options: Options) => {
    const element = document.querySelector('.round__app');

    if(element && options.enabled && options.gameEnabled) {
        new MutationObserver((mutations, observerInstance) => {
            observerInstance.disconnect();
            createLiTagsElements(document.querySelector('.ruser-top'), getTopUserName());
            createLiTagsElements(document.querySelector('.ruser-bottom'), getBotUserName());
        }).observe(element, {childList: true, attributes: true, subtree: true, characterData: true});
    } else {
        console.log('LiTags found no supported anchors on this page.');
    }
}).catch(e => console.error(e));

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
    if (!anchor || !username)
        return;

    User.getUser(username)
        .then(user => {
            console.log(`user: ${user.username}, tags: ${user.tags.length}`);
            const list = new List(anchor, user);
            const btn = new Button(anchor, user, list);
            btn.show();
            list.show();
        })
        .catch(e => console.error(e));
}
