import * as React from "react";
import * as ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import store from './app/store'
import {enableStorageApiLogger} from "./api/storageAPI";
import {App} from "./app/App";

console.log('LiTags is open source! https://github.com/mpunkenhofer/litags');

if (process.env.NODE_ENV === "development") {
    enableStorageApiLogger();
}

const getLiTagsRoot = () => {
    const root = document.getElementById('litags');
    if (root)
        return root;
    else {
        const newRoot = document.createElement('div');
        newRoot.id = 'litags';
        document.body.append(newRoot);
        return newRoot;
    }
};

const element = document.querySelector('.round__app');

if (element) {
    new MutationObserver((mutations, observerInstance) => {
        observerInstance.disconnect();

        ReactDOM.render(
            <Provider store={store}>
                <App mounts={[
                    {
                        username: getUserName('.ruser-top a'),
                        mount: document.querySelector('.ruser-top'),
                        keyboardShortcutsEnabled: true
                    },
                    {
                        username: getUserName('.ruser-bottom a'),
                        mount: document.querySelector('.ruser-bottom')
                    }
                ]}/>
            </Provider>, getLiTagsRoot()
        );
    }).observe(element, {childList: true, attributes: true, subtree: true, characterData: true});
} else {
    console.log('LiTags found no supported mounts on this page.');
}

const getUserName = (elementName: string) => {
    return removeTitle(document.querySelector(elementName).textContent);
};

const removeTitle = (name: string) => {
    const s = name.split(/(\s+)/);
    return s ? s[s.length - 1] : '';
};
