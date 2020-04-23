import * as React from "react";
import * as ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import store from '../common/store'
import {enableStorageApiLogger} from "../common/storage";
import {App} from "../components/App";

console.log('LiTags is open source! https://github.com/mpunkenhofer/litags');

if (process.env.NODE_ENV === "development") {
    enableStorageApiLogger();
}

const getLiTagsRoot = (): HTMLElement => {
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

const removeTitle = (name: string): string => {
    if(!name)
        return '';

    const s = name.split(/(\s+)/);
    return s ? s[s.length - 1] : '';
};

const getUserName = (elementName: string): string | null => {
    const name = document.querySelector(elementName);
    return (name && name.textContent) ? removeTitle(name.textContent) : null;
};


const element = document.querySelector('.round__app');

if (element) {
    new MutationObserver((_mutations, observerInstance) => {
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
