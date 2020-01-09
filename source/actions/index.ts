import * as types from '../constants/action-types'

export const addTag = tag => ({type: types.ADD_TAG, tag});
export const deleteTag = id => ({type: types.DELETE_TAG, id});
export const updateTag = (id, tag) => ({type: types.UPDATE_TAG, id, tag});
export const fetchTagsRequest = () => ({type: types.FETCH_TAGS_REQUEST});
export const fetchTagsSuccess = () => ({type: types.FETCH_TAGS_SUCCESS});
export const fetchTagsFailure = () => ({type: types.FETCH_TAGS_FAILURE});

export const addUser = username => ({type: types.ADD_USER, username});
export const deleteUser = username => ({type: types.DELETE_USER, username});
export const updateUser = (username, user) => ({type: types.UPDATE_USER, username, user});
export const fetchUsersRequest = () => ({type: types.FETCH_USER_REQUEST});
export const fetchUsersSuccess = () => ({type: types.FETCH_USER_SUCCESS});
export const fetchUsersFailure = () => ({type: types.FETCH_USER_FAILURE});

export const fetchOptionsRequest = () => ({type: types.FETCH_OPTIONS_REQUEST});
export const fetchOptionsSuccess = () => ({type: types.FETCH_OPTIONS_SUCCESS});
export const fetchOptionsFailure = () => ({type: types.FETCH_OPTIONS_FAILURE});
