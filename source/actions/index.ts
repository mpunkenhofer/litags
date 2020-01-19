import * as api from "../api";
import {ENDPOINTS, METHODS} from "../api";
import * as actionTypes from "../constants/action-types";

export const fetch = (dispatch, endpoint, method, argument = null) => {
    switch (endpoint) {
        case ENDPOINTS.USERS: {
            dispatch(({type: actionTypes.USER_API_REQUEST, arg: argument}));
            api.fetch(endpoint, method, argument).then(
                response => dispatch(({type: actionTypes.USER_API_SUCCESS, arg: argument, response})),
                error => dispatch(({type: actionTypes.USER_API_FAILURE, arg: argument, error})));
            return;
        }
        case ENDPOINTS.TAGS: {
            dispatch(({type: actionTypes.TAGS_API_REQUEST, arg: argument}));
            api.fetch(endpoint, method, argument).then(
                response => dispatch(({type: actionTypes.TAGS_API_SUCCESS, arg: argument, response})),
                error => dispatch(({type: actionTypes.TAGS_API_FAILURE, arg: argument, error})));
            return;
        }
        case ENDPOINTS.OPTIONS: {
            dispatch(({type: actionTypes.OPTIONS_API_REQUEST, arg: argument}));
            api.fetch(endpoint, method, argument).then(
                response => dispatch(({type: actionTypes.OPTIONS_API_SUCCESS, arg: argument, response})),
                error => dispatch(({type: actionTypes.OPTIONS_API_FAILURE, arg: argument, error})));
            return;
        }
        default:
            throw Error(`Unknown endpoint: ${endpoint}`);
    }
};

export const addTagToUser = (dispatch, user, tag) => {
    console.group('%c Add Tag to User', 'font-size: 2em; font-weight: bold; color: pink');
    console.log(user, tag);
    console.groupEnd();
    //dispatch(({type: actionTypes.ADD_TAG, user, tag}));
    //fetch(dispatch, ENDPOINTS.USERS, METHODS.POST, user);
};
