import defaultSets from "../constants/sets";

const browser = require("webextension-polyfill");
const uuidv4 = require('uuid/v4');

const ENDPOINTS = {
    USERS: 'USERS',
    SETS: 'SETS',
    OPTIONS: 'OPTIONS',
    FREQUENTLY_USED: 'FREQUENTLY_USED'
};

export const getSets = async () => {
    const sets = (await browser.storage.local.get(ENDPOINTS.SETS))[ENDPOINTS.SETS];

    if (!sets) {
        const defaultSets = getDefaultSets();
        await browser.storage.local.set({[ENDPOINTS.SETS]: defaultSets});
        return defaultSets;
    } else {
        return sets;
    }
};

export const getUser = async (username: string) => {
    const users = (await browser.storage.local.get(ENDPOINTS.USERS))[ENDPOINTS.USERS];

    if (users && users.hasOwnProperty(username)) {
        return users[username];
    } else {
        return Promise.reject(`User: ${username} not found.`);
    }
};

export const putUser = async (username: string, userData: Object) => {
    const users = (await browser.storage.local.get(ENDPOINTS.USERS))[ENDPOINTS.USERS];
    const updatedUsers = Object.assign({}, users, {[username]: userData});
    await browser.storage.local.set({[ENDPOINTS.USERS]: updatedUsers});
    return updatedUsers[username];
};

export const getOptions = async () => {
    const options = (await browser.storage.local.get(ENDPOINTS.OPTIONS))[ENDPOINTS.OPTIONS];

    if (!options) {
        await browser.storage.local.set({[ENDPOINTS.OPTIONS]: {}});
        return {};
    } else {
        return options;
    }
};

export const getFrequentlyUsed = async () => {
    const frequentlyUsed = (await browser.storage.local.get(ENDPOINTS.FREQUENTLY_USED))[ENDPOINTS.FREQUENTLY_USED];

    if (!frequentlyUsed) {
        await browser.storage.local.set({[ENDPOINTS.FREQUENTLY_USED]: []});
        return [];
    } else {
        return frequentlyUsed;
    }
};

export const putFrequentlyUsed = async (frequentlyUsedIDs: string[]) => {
    await browser.storage.local.set({[ENDPOINTS.FREQUENTLY_USED]: frequentlyUsedIDs});
    return frequentlyUsedIDs;
};

const createTag = (name, aliases, resource, color?) => {
    const tag = color != undefined ?
        {name, aliases, resource, color} :
        {name, aliases, resource};

    return {[uuidv4()]: tag}
};

const getDefaultSets = () => {
    let sets = {};

    for (const set of defaultSets) {
        const tags = Object.entries(set.tags).map(([name, [aliases, resource, color]]) =>
            Object.assign({},
                createTag(name, aliases, resource, (set.fontSet && color == undefined) ? '' : color)));


        sets = {...sets, [uuidv4()]: {...set, tags: tags}}
    }
    return sets;
};
