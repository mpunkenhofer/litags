import {Options} from "./options/options";
import {Button} from "./ui/button";
import {List} from "./ui/list";
import {selectors} from "./constants/selectors";
import {storageService} from "./util/storage";
import {User} from "./user/user";

console.log('LiTags is open source! https://github.com/mpunkenhofer/litags');

storageService.getOptions().then((options: Options) => {
    const element = document.querySelector(selectors.app.appElement);

    if (element && options.enabled && options.gameEnabled) {
        new MutationObserver((mutations, observerInstance) => {
            observerInstance.disconnect();
            createLiTagsElements(document.querySelector(selectors.app.topUserElement), getTopUserName());
            createLiTagsElements(document.querySelector(selectors.app.bottomUserElement), getBotUserName());
        }).observe(element, {childList: true, attributes: true, subtree: true, characterData: true});
    } else {
        console.log('LiTags found no supported anchors on this page.');
    }
}).catch(e => console.error(e));

function getTopUserName() {
    return removeTitle(document.querySelector(selectors.app.topUserName).textContent);
}

function getBotUserName() {
    return removeTitle(document.querySelector(selectors.app.bottomUserName).textContent);
}

function removeTitle(name: string) {
    const s = name.split(/(\s+)/);
    return s ? s[s.length - 1] : '';
}

function createLiTagsElements(anchor: HTMLElement, username: string) {
    if (!anchor || !username)
        return;

    User.load(username)
        .then(user => {
            user.debugPrint();
            const list = new List(anchor, user);
            const btn = new Button(anchor, user, list);
            btn.show();
            list.show();
        })
        .catch(e => console.error(e));
}
