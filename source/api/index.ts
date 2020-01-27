import defaultSets from "../constants/sets";

const browser = require("webextension-polyfill");
const uuidv4 = require('uuid/v4');

interface Endpoints {
    USERS: string,
    SETS: string,
    OPTIONS: string,
}

export const ENDPOINTS: Endpoints = {
    USERS: 'USERS',
    SETS: 'SETS',
    OPTIONS: 'OPTIONS',
};

interface Methods {
    GET: string,
    POST: string
}

export const METHODS: Methods = {
    GET: 'GET',
    POST: 'POST'
};

export const fetch = async <E extends keyof Endpoints, M extends keyof Methods>(endpoint: E, method: M, key = null,
                                                                                argument?) => {
    const data = (await browser.storage.local.get(endpoint))[endpoint];

    // console.group('Fetch Data');
    // console.log(`%c FETCH DATA: endpoint: ${endpoint}, key: ${key}, arg: ${argument}`,
    //     'font-weight: bold; font-size: 1.2em; color: orange;');
    // console.log('data:', data);
    // console.groupEnd();

    switch (method) {
        case METHODS.GET: {
            if (endpoint == ENDPOINTS.SETS && !data)
                return fetch('SETS', 'POST', null, getDefaultSets());
            else if(key) {
                return data.hasOwnProperty(key) ? data[key] : Promise.reject(`Key: ${key} not found in data.`);
            } else {
                return data;
            }
        }
        case METHODS.POST: {
            if (!argument)
                return Promise.reject(`Method: ${method} but non-valid argument: ${argument}`);

            if (data) {
                const newData = {...data, ...argument};
                await browser.storage.local.set({[endpoint]: newData});
            } else {
                if(key) {
                    await browser.storage.local.set({[endpoint]: {[key]: argument}});
                } else {
                    await browser.storage.local.set({[endpoint]: argument});
                }
            }

            return argument;
        }
        default: {
            return Promise.reject(`Unknown method: ${method}`);
        }
    }
};

const createTag = (name, aliases, resource, color?) => {
    const tag = color != undefined ?
        {name, aliases, resource, frequency: 0, color} :
        {name, aliases, resource, frequency: 0};

    return {[uuidv4()]: tag}
};

export const getDefaultSets = () => {
    let sets = {};

    for (const set of defaultSets) {
        const tags = Object.entries(set.tags).map(([name, [aliases, resource, color]]) =>
            Object.assign({},
                createTag(name, aliases, resource, (set.fontSet && color == undefined) ? '' : color)));


        sets = {...sets, [uuidv4()]: {...set, tags: tags}}
    }
    return sets;
};