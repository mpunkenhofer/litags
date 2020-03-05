import defaultSets from "../constants/sets";
import {browser} from "webextension-polyfill-ts";
import { v4, v5 } from 'uuid';

const ENDPOINTS = {
    USERS: 'USERS',
    SETS: 'SETS',
    OPTIONS: 'OPTIONS',
    FREQUENTLY_USED: 'FREQUENTLY_USED'
};

export type Tag = {
    id: string;
    name: string;
    aliases: string[];
    uri: string;
    color?: string;
}

export type Set = {
    id: string;
    name: string;
    iconUrl: string;
    fontUrl: string;
    tags: Tag[];
}

export type User = {
    name: string;
    tags: string[];
}

export type ImportExportOptions = {
    users: boolean;
    sets: boolean;
    frequentlyUsedTags: boolean;
    settings: boolean;
}

export type Options = {
    enabled: true;
    import: ImportExportOptions;
    export: ImportExportOptions;
}

export type FrequentlyUsed = [string, number][];

export const createTag = (id: string, name: string, aliases: string[], uri: string, color?: string): Tag => {
    return (color !== undefined) ? {id, name, aliases, uri, color} : {id, name, aliases, uri};
};

const getDefaultSets = (): Set[] => {
    const sets = [];

    for (const set of defaultSets) {
        //TODO: create predictable ids for tags to support import of tag ids from backup files
        const tags = Object.entries(set.tags).map(([name, [aliases, uri, color]]) =>
            createTag(v4()/*v5(`${set.name}${name}${uri}`, v5.DNS)*/, name, aliases, uri, color));

        sets.push({...set, id: v4(), tags});
    }

    return sets;
};

const getDefaultOptions = (): Options => {
    const importExportDefaults: ImportExportOptions = {
        users: true,
        sets: true,
        frequentlyUsedTags: true,
        settings: true
    };

    return {enabled: true, export: importExportDefaults, import: importExportDefaults};
};

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

export const postSets = async (sets: Set[] | null): Promise<Set[]> => {
    if (!sets)
        return Promise.reject('postSets: Invalid argument!');
    else {
        await browser.storage.local.set({[ENDPOINTS.SETS]: sets});

        return sets;
    }
};

export const getUser = async (username: string | null): Promise<User> => {
    if (!username)
        return Promise.reject('getUser: Invalid argument!');

    const users = (await browser.storage.local.get(ENDPOINTS.USERS))[ENDPOINTS.USERS];

    if (users && Object.prototype.hasOwnProperty.call(users, username)) {
        return users[username] as User;
    } else {
        return Promise.reject(`User: ${username} not found.`);
    }
};

export const deleteUser = async (username: string | null): Promise<User> => {
    if (!username)
        return Promise.reject('deleteUser: Invalid argument!');

    const users = (await browser.storage.local.get(ENDPOINTS.USERS))[ENDPOINTS.USERS];

    if (users && Object.prototype.hasOwnProperty.call(users, username)) {
        const {[username]: user, ...updatedUsers} = users;
        await browser.storage.local.set({[ENDPOINTS.USERS]: updatedUsers});
        return user as User;
    } else {
        return Promise.reject(`User: ${username} not found.`);
    }
};

export const getUsers = async (): Promise<User[]> => {
    const users = (await browser.storage.local.get(ENDPOINTS.USERS))[ENDPOINTS.USERS];

    if (users) {
        const usersArray: User[] = [];

        for (const user in users) {
            if (Object.prototype.hasOwnProperty.call(users, user))
                usersArray.push(users[user]);
        }

        return usersArray;
    } else {
        return [];
    }
};

export const postUsers = async (users: User[] | null): Promise<User[]> => {
    if (!users)
        return Promise.reject('postUsers: Invalid argument!');
    else {
        let userObj = {};

        for (const user of users) {
            userObj = {[user.name]: user, ...userObj}
        }

        await browser.storage.local.set({[ENDPOINTS.USERS]: userObj});

        return users;
    }
};

export const postUser = async (user: User | null): Promise<User> => {
    if (!user)
        return Promise.reject('postUser: Invalid argument!');

    const users = (await browser.storage.local.get(ENDPOINTS.USERS))[ENDPOINTS.USERS];
    const updatedUsers = Object.assign({}, users, {[user.name]: user});
    await browser.storage.local.set({[ENDPOINTS.USERS]: updatedUsers});
    return updatedUsers[user.name];
};

export const getOptions = async (): Promise<Options> => {
    const options = (await browser.storage.local.get(ENDPOINTS.OPTIONS))[ENDPOINTS.OPTIONS];

    if (!options) {
        const defaultOptions = getDefaultOptions();
        await browser.storage.local.set({[ENDPOINTS.OPTIONS]: defaultOptions});
        return defaultOptions;
    } else {
        return options as Options;
    }
};

export const postOptions = async (options: Options | null): Promise<Options> => {
    if (!options)
        return Promise.reject('postOptions: Invalid argument!');

    await browser.storage.local.set({[ENDPOINTS.OPTIONS]: options});
    return options;
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

export const postFrequentlyUsed = async (frequentlyUsedIDs: FrequentlyUsed | null): Promise<FrequentlyUsed> => {
    if (!frequentlyUsedIDs)
        return Promise.reject('postFrequentlyUsed: Invalid argument!');

    await browser.storage.local.set({[ENDPOINTS.FREQUENTLY_USED]: frequentlyUsedIDs});
    return frequentlyUsedIDs;
};

export const enableStorageApiLogger = (): void => {
    browser.storage.onChanged.addListener((changes, area) => {
        console.group('%cStorage area ' + `%c${area} ` + '%cchanged.',
            'font-size: 1.3em; font-weight: bold; color: gray', 'font-size: 1.3em; font-weight: bold; color: red',
            'font-size: 1.3em; font-weight: bold; color: gray');

        const changedItems = Object.keys(changes);

        for (const item of changedItems) {
            console.log('item:' + `%c${item}`, 'font-size: 1.1em; font-weight: bold; color: blue');
            console.log('prev value\n', changes[item].oldValue);
            console.log('new value\n', changes[item].newValue);
        }
        console.groupEnd();
    });
};
