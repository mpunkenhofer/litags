import * as api from "../api";

export const SETS_API_REQUEST = 'SETS_API_REQUEST';
export const SETS_API_SUCCESS = 'SETS_API_SUCCESS';
export const SETS_API_FAILURE = 'SETS_API_FAILURE';

export const USER_API_REQUEST = 'USER_API_REQUEST';
export const USER_API_SUCCESS = 'USER_API_SUCCESS';
export const USER_API_FAILURE = 'USER_API_FAILURE';

export const OPTIONS_API_REQUEST = 'OPTIONS_API_REQUEST';
export const OPTIONS_API_SUCCESS = 'OPTIONS_API_SUCCESS';
export const OPTIONS_API_FAILURE = 'OPTIONS_API_FAILURE';

export const FREQUENTLY_USED_API_REQUEST = 'FREQUENTLY_USED_API_REQUEST';
export const FREQUENTLY_USED_API_SUCCESS = 'FREQUENTLY_USED_API_SUCCESS';
export const FREQUENTLY_USED_API_FAILURE = 'FREQUENTLY_USED_API_FAILURE';


export const getSets = (dispatch) => {
    dispatch(({type: SETS_API_REQUEST}));
    api.getSets().then(
        response => dispatch(({type: SETS_API_SUCCESS, response})),
        error => dispatch(({type: SETS_API_FAILURE, error})));
};

export const getUser = (dispatch, username) => {
    dispatch(({type: USER_API_REQUEST, username}));
    api.getUser(username).then(
        response => dispatch(({type: USER_API_SUCCESS, username, response})),
        error => dispatch(({type: USER_API_FAILURE, username, error})));
};

export const putUser = (dispatch, username, userData) => {
    dispatch(({type: USER_API_REQUEST, username}));
    api.putUser(username, userData).then(
        response => dispatch(({type: USER_API_SUCCESS, username, response})),
        error => dispatch(({type: USER_API_FAILURE, username, error})));
};

export const getOptions = (dispatch) => {
    dispatch(({type: OPTIONS_API_REQUEST}));
    api.getOptions().then(
        response => dispatch(({type: OPTIONS_API_SUCCESS, response})),
        error => dispatch(({type: OPTIONS_API_FAILURE, error})));
};

export const getFrequentlyUsed = (dispatch) => {
    dispatch(({type: FREQUENTLY_USED_API_REQUEST}));
    api.getFrequentlyUsed().then(
        response => dispatch(({type: FREQUENTLY_USED_API_SUCCESS, response})),
        error => dispatch(({type: FREQUENTLY_USED_API_FAILURE, error})));
};

export const putFrequentlyUsed = (dispatch, frequentlyUsedIDs: string[]) => {
    dispatch(({type: FREQUENTLY_USED_API_REQUEST}));
    api.putFrequentlyUsed(frequentlyUsedIDs).then(
        response => dispatch(({type: FREQUENTLY_USED_API_SUCCESS, response})),
        error => dispatch(({type: FREQUENTLY_USED_API_FAILURE, error})));
};


export const addTagToUser = (dispatch, username, userData, tagId) => {
    if(username && userData && !userData.tags.includes(tagId)) {
        console.group('%c Add Tag to User', 'font-size: 2em; font-weight: bold; color: pink');
        console.log(username, userData, tagId);
        userData = {...userData, tags: [...userData.tags, tagId]};
        console.log('updated userData: ', userData);
        console.groupEnd();
        putUser(dispatch, username, userData);
    }
};

export const updateFrequentlyUsed = (dispatch, id: string, frequentlyUsedIDs: string[]) => {
    if(frequentlyUsedIDs && id) {
        console.group('%c Update freq used', 'font-size: 2em; font-weight: bold; color: pink');
        console.log(id, frequentlyUsedIDs);
        frequentlyUsedIDs = [...frequentlyUsedIDs, id];
        console.log('updated freq used: ', frequentlyUsedIDs);
        console.groupEnd();
        putFrequentlyUsed(dispatch, frequentlyUsedIDs);
    }
};
