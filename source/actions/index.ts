import * as api from "../api";
import {ENDPOINTS} from "../api";
import * as actionTypes from "../constants/action-types";

export const fetch = (dispatch, endpoint, method, key = null, argument = null) => {
    switch (endpoint) {
        case ENDPOINTS.USERS: {
            dispatch(({type: actionTypes.USER_API_REQUEST, name: key}));
            api.fetch(endpoint, method, key, argument).then(
                response => dispatch(({type: actionTypes.USER_API_SUCCESS, name: key, response})),
                error => dispatch(({type: actionTypes.USER_API_FAILURE, name: key, error})));
            return;
        }
        case ENDPOINTS.SETS: {
            dispatch(({type: actionTypes.SETS_API_REQUEST, arg: argument}));
            api.fetch(endpoint, method, key, argument).then(
                response => dispatch(({type: actionTypes.SETS_API_SUCCESS, arg: argument, response})),
                error => dispatch(({type: actionTypes.SETS_API_FAILURE, arg: argument, error})));
            return;
        }
        case ENDPOINTS.OPTIONS: {
            dispatch(({type: actionTypes.OPTIONS_API_REQUEST, arg: argument}));
            api.fetch(endpoint, method, key, argument).then(
                response => dispatch(({type: actionTypes.OPTIONS_API_SUCCESS, arg: argument, response})),
                error => dispatch(({type: actionTypes.OPTIONS_API_FAILURE, arg: argument, error})));
            return;
        }
        default:
            throw Error(`Unknown endpoint: ${endpoint}`);
    }
};

export const addTagToUser = (dispatch, username, userData, tagId) => {
    if(username && userData && !userData.tags.includes(tagId)) {
        console.group('%c Add Tag to User', 'font-size: 2em; font-weight: bold; color: pink');
        console.log(username, userData, tagId);
        userData = {...userData, tags: [...userData.tags, tagId]};
        console.log('updated userData: ', userData);
        console.groupEnd();
        fetch(dispatch, ENDPOINTS.USERS, 'POST', username, userData);
    }
};
