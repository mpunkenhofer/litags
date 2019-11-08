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
    const options = await browser.storage.sync.get('litagsOptions');
    return options['litagsOptions'];
}

export function setDefaultOptions() {
    browser.storage.sync.set({litagsOptions: defaults});
}