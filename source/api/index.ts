import defaultSets from "../constants/sets";

const browser = require("webextension-polyfill");
const uuidv4 = require('uuid/v4');

export const ENDPOINTS = {
    USERS: 'USERS',
    TAGS: 'TAGS',
    OPTIONS: 'OPTIONS',
    FREQUENTLY_USED: 'FREQUENTLY_USED'
};

export const fetchUser = async (username) => {
    const users = await browser.storage.local.get(ENDPOINTS.USERS)[ENDPOINTS.USERS];
    return users[username];
};

export const fetchTags = async () => {
    const tags = await browser.storage.local.get(ENDPOINTS.USERS)[ENDPOINTS.USERS];

    if (!tags) {
        return addDefaultTags();
    } else {
        return tags;
    }
};

export const fetchFrequentlyUsed = async () => {
    const frequentlyUsed = await browser.storage.local.get(ENDPOINTS.FREQUENTLY_USED)[ENDPOINTS.FREQUENTLY_USED];
    return frequentlyUsed || [];
};


export const fetchOptions = async () => {
    const options = await browser.storage.local.get(ENDPOINTS.OPTIONS)[ENDPOINTS.OPTIONS];

    if (!options) {
        return {};
    } else {
        return {};
    }
};

const createTag = (name, set, aliases, resource, color?) => {
    const tag = color != undefined ?
        {name, set, aliases, resource, color} :
        {name, set, aliases, resource};

    return {[uuidv4()]: tag}
};

const addDefaultTags = () => {
    let tags = {};

    for (const set of defaultSets) {
        let tagsWithId = {};
        for (const key in set) {
            if (set.hasOwnProperty(key)) {
                let [aliases, resource, color] = set[key];

                if(set.fontSet && color === undefined)
                    color = '';

                const tag = createTag(key, set.name, aliases, resource, color);
                tagsWithId = {...tagsWithId, tag};
            }
        }
        tags = {...tags, ...tagsWithId};
    }

    return addTags(tags);
};

export const addTag = async (tag) => {
    const storedTags = await browser.storage.local.get(ENDPOINTS.TAGS)[ENDPOINTS.TAGS];

    const newTags = {...storedTags, tag};
    await browser.storage.local.set({[ENDPOINTS.TAGS]: newTags});

    return tag;
};

export const addTags = async (tags) => {
    const storedTags = await browser.storage.local.get(ENDPOINTS.TAGS)[ENDPOINTS.TAGS];

    const newTags = {...storedTags, ...tags};
    await browser.storage.local.set({[ENDPOINTS.TAGS]: newTags});

    return newTags;
};

