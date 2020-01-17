import * as types from '../constants/action-types'
import * as api from "../api";
import {ENDPOINTS} from "../api";

const FetchActions = {
    [ENDPOINTS.USERS]: {
        request: (arg) => ({type: types.FETCH_USER_REQUEST, arg}),
        success: (arg, response) => ({type: types.FETCH_USER_SUCCESS, arg, response}),
        failure: (arg, error) => ({type: types.FETCH_USER_FAILURE, arg, error})
    },
    [ENDPOINTS.TAGS]: {
        request: (arg) => ({type: types.FETCH_TAGS_REQUEST, arg}),
        success: (arg, response) => ({type: types.FETCH_TAGS_SUCCESS, arg, response}),
        failure: (arg, error) => ({type: types.FETCH_TAGS_FAILURE, arg, error})
    },
    [ENDPOINTS.FREQUENTLY_USED]: {
        request: (arg) => ({type: types.FETCH_FREQUENTLY_USED_REQUEST, arg}),
        success: (arg, response) => ({type: types.FETCH_FREQUENTLY_USED_SUCCESS, arg, response}),
        failure: (arg, error) => ({type: types.FETCH_FREQUENTLY_USED_FAILURE, arg, error})
    },
    [ENDPOINTS.OPTIONS]: {
        request: (arg) => ({type: types.FETCH_OPTIONS_REQUEST, arg}),
        success: (arg, response) => ({type: types.FETCH_OPTIONS_SUCCESS, arg, response}),
        failure: (arg, error) => ({type: types.FETCH_OPTIONS_FAILURE, arg, error})
    }
};

export const fetch = (endpoint, method, argument = null) => (dispatch, isFetching) => {
    console.log(`fetch(endpoint: ${endpoint}, method: ${method}, argument: ${argument})`);

    if (!(Object.keys(FetchActions).includes(endpoint)))
        throw Error(`Unknown endpoint: ${endpoint}`);

    if (!isFetching) {
        dispatch(FetchActions[endpoint].request(argument));
        api.fetch(endpoint, method, argument).then(
            response => dispatch(FetchActions[endpoint].success(argument, response)),
            error => dispatch(FetchActions[endpoint].failure(argument, error)));
    }
};