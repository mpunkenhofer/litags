import defaultSets from "../constants/sets";

const browser = require("webextension-polyfill");
const uuidv4 = require('uuid/v4');

interface Endpoints {
    USERS: string,
    TAGS: string,
    OPTIONS: string,
}

export const ENDPOINTS: Endpoints = {
    USERS: 'USER',
    TAGS: 'TAGS',
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

export const fetch = async<E extends keyof Endpoints, M extends keyof Methods> (endpoint:E, method: M, argument?) => {
    const data = await browser.storage.local.get(endpoint)[endpoint];

    switch (method) {
        case METHODS.GET: {
            if(endpoint == ENDPOINTS.TAGS && !data)
                return fetch(endpoint, 'POST', getDefaultTags());

            return (argument && data.hasOwnProperty(argument)) ? data[argument] : data;
        }
        case METHODS.POST: {
            if (!argument)
                return Promise.reject(`Method: ${method} but non-valid argument: ${argument}`);

            if (data) {
                const newData = {...data, ...argument};
                await browser.storage.local.set({[endpoint]: newData});
            } else {
                await browser.storage.local.set({[endpoint]: argument});
            }

            return argument;
        }
        default: {
            return Promise.reject(`Unknown method: ${method}`);
        }
    }
};

const createTag = (name, set, aliases, resource, color?) => {
    const tag = color != undefined ?
        {name, set, aliases, resource, frequency: 0, color} :
        {name, set, aliases, resource, frequency: 0};

    return {[uuidv4()]: tag}
};

export const getDefaultTags = () => {
    let tags = {};

    for (const set of defaultSets) {
        let tagsWithId = {};
        for (const key in set.tags) {
            if (set.tags.hasOwnProperty(key)) {
                let [aliases, resource, color] = set.tags[key];

                if(set.fontSet && color === undefined)
                    color = '';

                const tag = createTag(key, set.name, aliases, resource, color);

                tagsWithId = {...tagsWithId, ...tag};
            }
        }
        tags = {...tags, ...tagsWithId};
    }
    return tags;
};
