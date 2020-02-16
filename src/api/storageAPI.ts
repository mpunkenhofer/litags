import defaultSets from "../constants/sets";
import { browser } from "webextension-polyfill-ts";

const uuidv4 = require('uuid/v4');

const ENDPOINTS = {
    USERS: 'USERS',
    SETS: 'SETS',
    OPTIONS: 'OPTIONS',
    FREQUENTLY_USED: 'FREQUENTLY_USED'
};

export interface Tag {
    id: string,
    name: string,
    aliases: string[],
    uri: string,
    color: string
}

export interface Set {
    id: string,
    name: string,
    icon_url: string,
    font_url: string,
    tags: Tag[]
}

export interface User {
    name: string,
    tags: string[]
}

export interface Options {
    enabled: true
}

export type FrequentlyUsed = [string, number][];

export const getSets = async (): Promise<Set[]> => {
    const sets = (await browser.storage.local.get(ENDPOINTS.SETS))[ENDPOINTS.SETS];

    if (!sets) {
        const defaultSets = getDefaultSets();
        await browser.storage.local.set({[ENDPOINTS.SETS]: defaultSets});
        return defaultSets;
    } else {
        return sets as Set[];
    }
};

export const getUser = async (username: string): Promise<User> => {
    const users = (await browser.storage.local.get(ENDPOINTS.USERS))[ENDPOINTS.USERS];

    if (users && users.hasOwnProperty(username)) {
        return users[username] as User;
    } else {
        return Promise.reject(`User: ${username} not found.`);
    }
};

export const postUser = async (user: User): Promise<User> => {
    const users = (await browser.storage.local.get(ENDPOINTS.USERS))[ENDPOINTS.USERS];
    const updatedUsers = Object.assign({}, users, {[user.name]: user});
    await browser.storage.local.set({[ENDPOINTS.USERS]: updatedUsers});
    return updatedUsers[user.name];
};

export const getOptions = async (): Promise<Options> => {
    const options = (await browser.storage.local.get(ENDPOINTS.OPTIONS))[ENDPOINTS.OPTIONS];

    if (!options) {
        await browser.storage.local.set({[ENDPOINTS.OPTIONS]: {enabled: true}});
        return {enabled: true};
    } else {
        return options as Options;
    }
};

export const getFrequentlyUsed = async (): Promise<FrequentlyUsed> => {
    const frequentlyUsed = (await browser.storage.local.get(ENDPOINTS.FREQUENTLY_USED))[ENDPOINTS.FREQUENTLY_USED];

    if (!frequentlyUsed) {
        await browser.storage.local.set({[ENDPOINTS.FREQUENTLY_USED]: []});
        return [];
    } else {
        return frequentlyUsed as FrequentlyUsed;
    }
};

export const postFrequentlyUsed = async (frequentlyUsedIDs: FrequentlyUsed): Promise<FrequentlyUsed> => {
    await browser.storage.local.set({[ENDPOINTS.FREQUENTLY_USED]: frequentlyUsedIDs});
    return frequentlyUsedIDs;
};

const createTag = (name: string, aliases: string[], uri: string, color: string = ''): Tag => {
    return {id: uuidv4(), name, aliases, uri, color};
};

const getDefaultSets = (): Set[] => {
    const sets = [];

    for (const set of defaultSets) {
        const tags = Object.entries(set.tags).map(([name, [aliases, uri, color]]) =>
                createTag(name, aliases, uri, color));

        sets.push({...set, id: uuidv4(), tags});
    }

    return sets;
};

export const enableStorageApiLogger = () => {
    browser.storage.onChanged.addListener((changes, area) => {
        console.group('%cStorage area ' + `%c${area} ` + '%cchanged.',
            'font-size: 1.3em; font-weight: bold; color: gray', 'font-size: 1.3em; font-weight: bold; color: red',
            'font-size: 1.3em; font-weight: bold; color: gray');

        const changedItems = Object.keys(changes);

        for (const item of changedItems) {
            console.log('item:' + `%c${item}`,  'font-size: 1.1em; font-weight: bold; color: blue');
            console.log('prev value\n', changes[item].oldValue);
            console.log('new value\n', changes[item].newValue);
        }
        console.groupEnd();
    });
};
