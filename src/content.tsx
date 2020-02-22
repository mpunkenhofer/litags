import * as React from "react";
import * as ReactDOM from 'react-dom';
import TagList from "./components/TagList/TagList";
import TagChooser from "./components/TagChooser/TagChooser";
import {Provider} from 'react-redux'
import store from './app/store'
import {enableStorageApiLogger} from "./api/storageAPI";

console.log('LiTags is open source! https://github.com/mpunkenhofer/litags');

if(process.env.NODE_ENV === "development") {
    enableStorageApiLogger();
}

const element = document.querySelector('.round__app');

if (element) {
    new MutationObserver((mutations, observerInstance) => {
        observerInstance.disconnect();

        createLiTagsElements(document.querySelector('.ruser-top'),
            getUserName('.ruser-top a'), true);
        createLiTagsElements(document.querySelector('.ruser-bottom'),
            getUserName('.ruser-bottom a'));
    }).observe(element, {childList: true, attributes: true, subtree: true, characterData: true});
} else {
    console.log('LiTags found no supported anchors on this page.');
}

function getUserName(elementName: string) {
    return removeTitle(document.querySelector(elementName).textContent);
}

function removeTitle(name: string) {
    const s = name.split(/(\s+)/);
    return s ? s[s.length - 1] : '';
}

function createLiTagsElements(anchor: HTMLElement, username: string, keyboardShortcutsEnabled: boolean = false) {
    if (!anchor || !username)
        return;

    const listElement = document.createElement('div');
    listElement.className = 'lt-list';
    const buttonElement = document.createElement('div');
    buttonElement.className = 'lt-button';

    anchor.append(listElement);
    anchor.append(buttonElement);

    ReactDOM.render(
        <Provider store={store}>
            <TagList username={username}/>
        </Provider>,
        listElement);

    ReactDOM.render(
        <Provider store={store}>
            <TagChooser username={username} keyboardShortcutsEnabled={keyboardShortcutsEnabled}/>
        </Provider>,
        buttonElement);
}
