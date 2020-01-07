import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Options} from "./XOLDoptions/options";
import {storageService} from "./util/storage";
import TagList from "./components/TagList";
import TagChooserButton from "./components/TagChooserButton";


console.log('LiTags is open source! https://github.com/mpunkenhofer/litags');

storageService.getOptions().then((options: Options) => {
    const element = document.querySelector('.round__app');

    if (element && options.enabled && options.gameEnabled) {
        new MutationObserver((mutations, observerInstance) => {
            observerInstance.disconnect();

            createLiTagsElements(document.querySelector('.ruser-top'),
                getUserName('.ruser-top a'));
            createLiTagsElements(document.querySelector('.ruser-bottom'),
                getUserName('.ruser-bottom a'));
        }).observe(element, {childList: true, attributes: true, subtree: true, characterData: true});
    } else {
        console.log('LiTags found no supported anchors on this page.');
    }
}).catch(e => console.error(e));

function getUserName(elementName: string) {
    return removeTitle(document.querySelector(elementName).textContent);
}

function removeTitle(name: string) {
    const s = name.split(/(\s+)/);
    return s ? s[s.length - 1] : '';
}

function createLiTagsElements(anchor: HTMLElement, username: string) {
    if (!anchor || !username)
        return;

    const listElement = document.createElement('div');
    listElement.className = 'lt-list';
    const buttonElement = document.createElement('div');
    buttonElement.className = 'lt-button';

    anchor.append(listElement);
    anchor.append(buttonElement);

    ReactDOM.render(<TagList user={username}/>, listElement);
    ReactDOM.render(<TagChooserButton user={username}/>, buttonElement);
}
