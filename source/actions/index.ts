import * as api from "../api";
import * as actionTypes from "../constants/action-types";

export const getSets = (dispatch) => {
    dispatch(({type: actionTypes.SETS_API_REQUEST}));
    api.getSets().then(
        response => dispatch(({type: actionTypes.SETS_API_SUCCESS, response})),
        error => dispatch(({type: actionTypes.SETS_API_FAILURE, error})));
};

export const getUser = (dispatch, username) => {
    dispatch(({type: actionTypes.USER_API_REQUEST, username}));
    api.getUser(username).then(
        response => dispatch(({type: actionTypes.USER_API_SUCCESS, username, response})),
        error => dispatch(({type: actionTypes.USER_API_FAILURE, username, error})));
};

export const putUser = (dispatch, username, userData) => {
    dispatch(({type: actionTypes.USER_API_REQUEST, username}));
    api.putUser(username, userData).then(
        response => dispatch(({type: actionTypes.USER_API_SUCCESS, username, response})),
        error => dispatch(({type: actionTypes.USER_API_FAILURE, username, error})));
};

export const getOptions = (dispatch) => {
    dispatch(({type: actionTypes.OPTIONS_API_REQUEST}));
    api.getOptions().then(
        response => dispatch(({type: actionTypes.OPTIONS_API_SUCCESS, response})),
        error => dispatch(({type: actionTypes.OPTIONS_API_FAILURE, error})));
};

export const getFrequentlyUsed = (dispatch) => {
    dispatch(({type: actionTypes.FREQUENTLY_USED_API_REQUEST}));
    api.getFrequentlyUsed().then(
        response => dispatch(({type: actionTypes.FREQUENTLY_USED_API_SUCCESS, response})),
        error => dispatch(({type: actionTypes.FREQUENTLY_USED_API_FAILURE, error})));
};

export const putFrequentlyUsed = (dispatch, frequentlyUsedIDs: string[]) => {
    dispatch(({type: actionTypes.FREQUENTLY_USED_API_REQUEST}));
    api.putFrequentlyUsed(frequentlyUsedIDs).then(
        response => dispatch(({type: actionTypes.FREQUENTLY_USED_API_SUCCESS, response})),
        error => dispatch(({type: actionTypes.FREQUENTLY_USED_API_FAILURE, error})));
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
