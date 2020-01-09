import * as types from '../constants/action-types'

export const addTag = tag => ({type: types.ADD_TAG, tag});
export const deleteTag = id => ({type: types.DELETE_TAG, id});
export const updateTag = (id, tag) => ({type: types.UPDATE_TAG, id, tag});
export const fetchTagsRequest = () => ({type: types.FETCH_TAGS_REQUEST});
export const fetchTagsSuccess = (response) => ({type: types.FETCH_TAGS_SUCCESS, response});
export const fetchTagsFailure = (message) => ({type: types.FETCH_TAGS_FAILURE, message});

export const addUser = username => ({type: types.ADD_USER, username});
export const deleteUser = username => ({type: types.DELETE_USER, username});
export const updateUser = (username, user) => ({type: types.UPDATE_USER, username, user});
export const fetchUserRequest = (username) => ({type: types.FETCH_USER_REQUEST, username});
export const fetchUserSuccess = (response) => ({type: types.FETCH_USER_SUCCESS, response});
export const fetchUserFailure = (message) => ({type: types.FETCH_USER_FAILURE, message});

export const fetchOptionsRequest = () => ({type: types.FETCH_OPTIONS_REQUEST});
export const fetchOptionsSuccess = (response) => ({type: types.FETCH_OPTIONS_SUCCESS, response});
export const fetchOptionsFailure = (message) => ({type: types.FETCH_OPTIONS_FAILURE, message});

export const updateFrequentlyUsed = (tags) => ({type: types.UPDATE_FREQUENTLY_USED, tags});
export const fetchFrequentlyUsedRequest = () => ({type: types.FETCH_FREQUENTLY_USED_REQUEST});
export const fetchFrequentlyUsedSuccess = (response) => ({type: types.FETCH_FREQUENTLY_USED_SUCCESS, response});
export const fetchFrequentlyUsedFailure = (message) => ({type: types.FETCH_FREQUENTLY_USED_FAILURE, message});

// export const fetch = (type, arg?) => (dispatch, getState) => {
//     if (getIsFetching(getState(), type, arg)) {
//         return Promise.resolve();
//     }
//
//     switch (type) {
//
//     }
// };