import {addReducer} from 'reactn';
import defaultSets from "../constants/sets";
import {useMemo} from "react";

// addReducer('add', (global, dispatch, i) => ({
//     x: global.users,
// }));
//
// // subtract(2)
// addReducer('subtract', (global, dispatch, i) => ({
//     x: global.x - i,
// }));
//
// // addSubtract(1, 2)
// addReducer('addSubtract', async (global, dispatch, i, j) => {
//     await dispatch.add(i);
//     await dispatch.subtract(j);
// });

addReducer('getUser', async (global, dispatch, username) => {
    const users = (await browser.storage.local.get('USERS'))['USERS'];

    if (users && users.hasOwnProperty(username)) {
        users: Object.assign({}, global.users, {[username]: users[username]});
    } else {
        users: Object.assign({}, global.users, createUser(username));
    }
});

const createUser = (username) => ({[username]: {tags: []}});

// export const addTagToUser = (dispatch, username, userData, tagId) => {
//     if(username && userData && !userData.tags.includes(tagId)) {
//         console.group('%c Add Tag to User', 'font-size: 2em; font-weight: bold; color: pink');
//         console.log(username, userData, tagId);
//         userData = {...userData, tags: [...userData.tags, tagId]};
//         console.log('updated userData: ', userData);
//         console.groupEnd();
//         putUser(dispatch, username, userData);
//     }
// };
//
// export const updateFrequentlyUsed = (dispatch, id: string, frequentlyUsedIDs: string[]) => {
//     if(frequentlyUsedIDs && id) {
//         console.group('%c Update freq used', 'font-size: 2em; font-weight: bold; color: pink');
//         console.log(id, frequentlyUsedIDs);
//         frequentlyUsedIDs = [...frequentlyUsedIDs, id];
//         console.log('updated freq used: ', frequentlyUsedIDs);
//         console.groupEnd();
//         putFrequentlyUsed(dispatch, frequentlyUsedIDs);
//     }
// };

// const ENDPOINTS = {
//     USERS: 'USERS',
//     SETS: 'SETS',
//     OPTIONS: 'OPTIONS',
//     FREQUENTLY_USED: 'FREQUENTLY_USED'
// };
//
// export const getSets = async () => {
//     const sets = (await browser.storage.local.get(ENDPOINTS.SETS))[ENDPOINTS.SETS];
//
//     if(!sets) {
//         const defaultSets = getDefaultSets();
//         await browser.storage.local.set({[ENDPOINTS.SETS]: defaultSets});
//         return defaultSets;
//     } else {
//         return sets;
//     }
// };
//
// export const getUser = async (username: string) => {
//     const users = (await browser.storage.local.get(ENDPOINTS.USERS))[ENDPOINTS.USERS];
//
//     if(users && users.hasOwnProperty(username)) {
//         return users[username];
//     } else {
//         return Promise.reject(`User: ${username} not found.`);
//     }
// };
//
// export const putUser = async (username: string, userData: Object) => {
//     const users = (await browser.storage.local.get(ENDPOINTS.USERS))[ENDPOINTS.USERS];
//     const updatedUsers = Object.assign({}, users, {[username]: userData});
//     await browser.storage.local.set({[ENDPOINTS.USERS]: updatedUsers});
//     return updatedUsers[username];
// };
//
// export const getOptions = async () => {
//     const options = (await browser.storage.local.get(ENDPOINTS.OPTIONS))[ENDPOINTS.OPTIONS];
//
//     if(!options) {
//         await browser.storage.local.set({[ENDPOINTS.OPTIONS]: {}});
//         return {};
//     } else {
//         return options;
//     }
// };
//
// export const getFrequentlyUsed = async () => {
//     const frequentlyUsed = (await browser.storage.local.get(ENDPOINTS.FREQUENTLY_USED))[ENDPOINTS.FREQUENTLY_USED];
//
//     if(!frequentlyUsed) {
//         await browser.storage.local.set({[ENDPOINTS.FREQUENTLY_USED]: []});
//         return [];
//     } else {
//         return frequentlyUsed;
//     }
// };
//
// export const putFrequentlyUsed = async (frequentlyUsedIDs: string[]) => {
//     await browser.storage.local.set({[ENDPOINTS.FREQUENTLY_USED]: frequentlyUsedIDs});
//     return frequentlyUsedIDs;
// };
//
// const createTag = (name, aliases, resource, color?) => {
//     const tag = color != undefined ?
//         {name, aliases, resource, color} :
//         {name, aliases, resource};
//
//     return {[uuidv4()]: tag}
// };
//
// const getDefaultSets = () => {
//     let sets = {};
//
//     for (const set of defaultSets) {
//         const tags = Object.entries(set.tags).map(([name, [aliases, resource, color]]) =>
//             Object.assign({},
//                 createTag(name, aliases, resource, (set.fontSet && color == undefined) ? '' : color)));
//
//
//         sets = {...sets, [uuidv4()]: {...set, tags: tags}}
//     }
//     return sets;
// };

// const tags = useMemo(() => {
//     let allTags = [];
//
//     if (sets) {
//         for (const set of Object.values(sets))
//             if(set['enabled']) {
//                 allTags = [...allTags, ...set['tags']];
//             }
//     }
//     return allTags;
// }, [sets]);
//
// const searchTags = (term: string) => {
//     if (!term || term.length < 1)
//         return [];
//
//     term = term.toLowerCase();
//     return tags.filter(tagObj => Object.values(tagObj).length > 0 &&
//         Object.values(tagObj)[0]['name'].toLowerCase().includes(term)
//         || Object.values(tagObj)[0]['aliases'].find(alias => alias.toLowerCase().includes(term))
//     );
// };
