import {TagTip} from "./tagtip";
import {Selectors} from "./selectors";
import {User} from "./user";

const Sortable = require('sortablejs');
const browser = require("webextension-polyfill/dist/browser-polyfill.min");

require('../styles/font.scss');
require('../styles/layout.scss');
require('../styles/styles.scss');

class LiTags {
    private options = {};
    private tagTip: TagTip;

    constructor() {
        this.tagTip = new TagTip();

        let element = document.querySelector(Selectors.app);

        if (element) {
            new MutationObserver((mutations, observerInstance) => {
                observerInstance.disconnect();

                let top = document.querySelector(Selectors.userTop);
                let bot = document.querySelector(Selectors.userBot);

                this.createLiTagsElements(top, LiTags.getTopUserName());
                this.createLiTagsElements(bot, LiTags.getBotUserName());
            }).observe(element, {childList: true, attributes: true, subtree: true, characterData: true});

            return;
        }

        element = document.querySelector(Selectors.header);

        if (element && false /* TODO REMOVE FALSE*/) {
            let header = document.querySelector(Selectors.header + ' span');
            if (!header || !header.parentElement || !header.parentElement.innerText)
                return;

            // Get rid of title
            const nameWithTitle = header.parentElement.innerText.split(/(\s+)/);

            if (!nameWithTitle)
                return;

            const username = nameWithTitle[nameWithTitle.length - 1];
            this.createLiTagsElements(element, username);
            return;
        }
    }

    private createLiTagsElements(anchor: Element, username: string) {
        console.log(`Litags creating elements for user: ${username}`);

        if (!anchor || !username)
            return;

        this.createAddTagButton(anchor, username);
        this.createTagList(anchor, username);
    }

    private createTagList(anchor: Element, username: string) {
        User.getUser(username).then(user => {
            if(user.tags.length > 0) {
                let list = '<div class="litags-tags"><ul id="litags-tag-list">';

                for (const tag of user.tags)
                    list += `<li title="${tag.name}">${tag.symbol}</li>`;

                list += '</ul></div>';
                anchor.insertAdjacentHTML('beforeend', list);
            }
        }).catch(error => console.error(error));
    }

    private createAddTagButton(anchor: Element, username: string) {
        User.getUser(username).then(user => {
            const button = document.createElement('div');
            button.setAttribute('class', 'litags-addtag-button-wrap');
            const button_title = browser.i18n.getMessage("appAddTagButtonTitle");
            button.innerHTML = `<button class="litags-addtag-button" title="${button_title}">O</button>`;
            button.addEventListener('click', (ev) => {
                this.tagTip.show(ev.clientX, ev.clientY, user)
            });
            anchor.append(button);
        }).catch(error => console.error(error));
    }

    private static getTopUserName() {
        return LiTags.removeTitle(document.querySelector(`${Selectors.userTop} a`).textContent);
    }

    private static getBotUserName() {
        return LiTags.removeTitle(document.querySelector(`${Selectors.userBot} a`).textContent);
    }

    private static removeTitle(name: string) {
        const s = name.split(/(\s+)/);
        return s ? s[s.length - 1] : '';
    }

    public static checkForAnchor(): boolean {
        return document.querySelector(Selectors.app) != null ||
            false /*document.querySelector(Selectors.header) != null*/;
    }
}

console.log('LiTags is open source! https://github.com/mpunkenhofer/litags');

if (LiTags.checkForAnchor())
    new LiTags();
else
    console.log('LiTags found no supported anchors on this page.');

// browser.storage.sync.getBytesInUse().then((num: string) => {
//   console.log(`Bytes in use: ${num}`);
// });
