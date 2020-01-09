import {KEYS} from "../constants/keys";
import defaultSets from "../constants/sets";

const browser = require("webextension-polyfill");
const uuidv4 = require('uuid/v4');

export const fetchUser = (username) => {
    browser.storage.local.get(KEYS.USERS)[KEYS.USERS].then(users => {
        return users[username] || createUser(username);
    });
};

export const fetchTags = () => {
    browser.storage.local.get(KEYS.USERS)[KEYS.USERS].then(tags => {
            if(!tags) {
                return addDefaultTags();
            } else {
                return tags;
            }
        }
    );
};

export const fetchOptions = () => {
    browser.storage.local.get(KEYS.OPTIONS)[KEYS.OPTIONS].then(options => {
            if(!options) {
                return {};
            } else {
                return {};
            }
        }
    );
};

const createTag = (name, set, aliases, resource, color?) => {
    const tag = color != undefined ?
        {name, set, aliases, resource, color} :
        {name, set, aliases, resource};

    return {[uuidv4()]: tag}
};

const createUser = (username, tags= []) => {
    return {[username]: { tags, encounters: 0, lastSeen: new Date()}}
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

export const addTag = (tag) => {
    browser.storage.local.get(KEYS.TAGS)[KEYS.TAGS].then(storedTags => {
        const newTags = {...storedTags, tag};
        browser.storage.local.set({[KEYS.TAGS]: newTags});
        return tag;
    });
};

export const addTags = (tags) => {
    browser.storage.local.get(KEYS.TAGS)[KEYS.TAGS].then(storedTags => {
        const newTags = {...storedTags, ...tags};
        browser.storage.local.set({[KEYS.TAGS]: newTags});
        return newTags;
    });
};

