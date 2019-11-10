import {litags} from "./constants";

const browser = require("webextension-polyfill");

export interface Options {
    enabled: boolean,
    gameEnabled: boolean,
    profileEnabled: boolean,
    maxTags: number
}

const defaults: Options = {
    enabled: true,
    gameEnabled: true,
    profileEnabled: true,
    maxTags: 8
};

export async function getAllOptions() {
    const options = await browser.storage.sync.get(litags.keys.options);
    return options[litags.keys.options];
}

export function setDefaultOptions() {
    browser.storage.sync.set({[litags.keys.options]: defaults});
}