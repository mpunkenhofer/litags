import { browser } from "webextension-polyfill-ts";
import {
    Set,
    Tag,
    Options,
    User,
    FrequentlyUsed,
    Font
} from '../types';
import { defaultOptions } from "../constants";
import has from "lodash/has";
import { defaultSets } from "../constants/sets";
import { generateID } from "./id";

const createTag = (name: string, uri: string, aliases?: string[], color?: string, font?: Font): Tag => {
    return { id: generateID(), name, aliases, uri, color, font };
};

const getDefaultSets = (): Set[] => {
    const sets = [];

    for (const set of defaultSets) {
        const tags =
            Object.entries(set.tags).map(([name, [uri, aliases, color]]) =>
                createTag(name, uri, aliases, color, set.font));

        sets.push({ ...set, id: generateID(), tags });
    }

    return sets;
};

export const setSets = async (sets: Set[]): Promise<Set[]> => {
    await browser.storage.local.set({ ['sets']: sets });
    return sets;
};

export const getSets = async (): Promise<Set[]> => {
    const sets = (await browser.storage.local.get('sets'))['sets'];

    if (!sets) {
        return setSets(getDefaultSets());
    } else {
        return sets as Set[];
    }
};

export const getUsers = async (): Promise<User[]> => {
    const users = (await browser.storage.local.get('users'))['users'];

    if (users) {
        return Object.values(users);
    } else {
        return [];
    }
};

export const getUser = async (id: string): Promise<User> => {
    const users = (await browser.storage.local.get('users'))['users'];

    if (has(users, id)) {
        return users[id];
    } else {
        return Promise.reject(`User: ${id} not found.`);
    }
};

export const setUsers = async (users: User[]): Promise<User[]> => {
    let userObj = {};

    for (const user of users) {
        userObj = { [user.id]: user, ...userObj }
    }

    await browser.storage.local.set({ ['users']: userObj });

    return users;
};

export const setUser = async (user: User): Promise<User> => {
    const users = (await browser.storage.local.get('users'))['users'];
    const updatedUsers = Object.assign({}, users, { [user.id]: user });
    await browser.storage.local.set({ ['users']: updatedUsers });
    return updatedUsers[user.id];
};

export const deleteUser = async (id: string): Promise<void> => {
    const users = await getUsers();
    await setUsers(users.filter(user => user.id !== id));
};

export const getOptions = async (): Promise<Options> => {
    const options = (await browser.storage.local.get('options'))['options'];

    if (!options) {
        await browser.storage.local.set({ ['options']: defaultOptions });
        return defaultOptions;
    } else {
        return options as Options;
    }
};

export const setOptions = async (options: Options): Promise<Options> => {
    await browser.storage.local.set({ ['options']: options });
    return options;
};


export const getFrequentlyUsed = async (): Promise<FrequentlyUsed[]> => {
    const frequentlyUsed = (await browser.storage.local.get('frequently_used'))['frequently_used'];

    if (!frequentlyUsed) {
        await browser.storage.local.set({ ['frequently_used']: [] });
        return [];
    } else {
        return frequentlyUsed as FrequentlyUsed[];
    }
};

export const setFrequentlyUsed = async (frequentlyUsed: FrequentlyUsed[]): Promise<FrequentlyUsed[]> => {
    await browser.storage.local.set({ ['frequently_used']: frequentlyUsed });
    return frequentlyUsed;
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
