import * as types from '../constants/action-types'
import * as api from "../api";
import {getFrequentlyUsedIsFetching, getOptionsIsFetching, getTagIsFetching, getUserIsFetching} from "../selectors";
import {ENDPOINTS} from "../api";

const FetchActions = {
    [ENDPOINTS.USERS]: {
        isFetching: (state, arg) => getUserIsFetching(arg)(state),
        request: (arg) => ({type: types.FETCH_USER_REQUEST, arg}),
        success: (arg, response) => ({type: types.FETCH_USER_SUCCESS, arg, response}),
        failure: (arg, message) => ({type: types.FETCH_USER_FAILURE, arg, message})
    },
    [ENDPOINTS.TAGS]: {
        isFetching: (state, arg) => getTagIsFetching(state),
        request: (arg) => ({type: types.FETCH_TAGS_REQUEST, arg}),
        success: (arg, response) => ({type: types.FETCH_TAGS_SUCCESS, arg, response}),
        failure: (arg, message) => ({type: types.FETCH_TAGS_FAILURE, arg, message})
    },
    [ENDPOINTS.FREQUENTLY_USED]: {
        isFetching: (state, arg) => getFrequentlyUsedIsFetching(state),
        request: (arg) => ({type: types.FETCH_FREQUENTLY_USED_REQUEST, arg}),
        success: (arg, response) => ({type: types.FETCH_FREQUENTLY_USED_SUCCESS, arg, response}),
        failure: (arg, message) => ({type: types.FETCH_FREQUENTLY_USED_FAILURE, arg, message})
    },
    [ENDPOINTS.OPTIONS]: {
        isFetching: (state, arg) => getOptionsIsFetching(state),
        request: (arg) => ({type: types.FETCH_OPTIONS_REQUEST, arg}),
        success: (arg, response) => ({type: types.FETCH_OPTIONS_SUCCESS, arg, response}),
        failure: (arg, message) => ({type: types.FETCH_OPTIONS_FAILURE, arg, message})
    }
};

export const fetch = (endpoint, method, argument) => (dispatch, isFetching) => {
    if(!isFetching) {
        dispatch(FetchActions[endpoint].request(argument));
        api.fetch(endpoint, method, argument).then(
            response => dispatch(FetchActions[endpoint].success(argument, response)),
            error => dispatch(FetchActions[endpoint].failure(argument, error)));
    }
};