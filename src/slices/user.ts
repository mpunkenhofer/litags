import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunk} from "../app/store";
import * as api from "../api/storageAPI";
import {Tag, User} from "../api/storageAPI";
import {updateFrequentlyUsed} from "./frequentlyUsed";
import isEqual from "lodash/isequal";

interface UserLoadDetail {
    loading: boolean,
    error: string | null
}

type UserRecord = {
    user: User
} & UserLoadDetail

interface UserState {
    userRecord: Record<string, UserRecord | undefined>
}

const usersInitialState: UserState = {
    userRecord: {},
};

const userSlice = createSlice({
    name: 'user',
    initialState: usersInitialState,
    reducers: {
        userRequest(state, {payload}: PayloadAction<{ username: string }>) {
            if (state.userRecord[payload.username]) {
                state.userRecord[payload.username].loading = true;
                state.userRecord[payload.username].error = null;
            } else {
                state.userRecord[payload.username] =
                    {user: {name: payload.username, tags: []}, loading: true, error: null};
            }
        },
        userSuccess(state, {payload}: PayloadAction<{ username: string, user: User }>) {
            state.userRecord[payload.username] = {user: payload.user, loading: false, error: null};
        },
        userFailure(state, {payload}: PayloadAction<{ username: string, error: string }>) {
            state.userRecord[payload.username] =
                {user: {name: payload.username, tags: []}, loading: false, error: null};
        }
    }
});

export const {
    userRequest,
    userSuccess,
    userFailure,
} = userSlice.actions;

export const getUser = (username: string): AppThunk => dispatch => {
    dispatch(userRequest({username}));
    api.getUser(username)
        .then(user => dispatch(userSuccess({username, user})))
        .catch(err => dispatch(userFailure({username, error: err.toString()})));
};

export const postUser = (user: User): AppThunk => dispatch => {
    dispatch(userRequest({username: user.name}));
    api.postUser(user)
        .then(user => dispatch(userSuccess({username: user.name, user})))
        .catch(err => dispatch(userFailure({username: user.name, error: err.toString()})));
};

export const addTag = (username: string, tag: Tag): AppThunk =>
    (dispatch, getState) => {
        const userRecord = getState().user.userRecord;
        const user: User = userRecord[username] ? userRecord[username].user : null;

        console.group(`%cAdd Tag! ${username}`, 'font-size: 1.2em; font-weight: bold; color: orange');
        console.log(user, tag);
        console.groupEnd();

        if (user && !user.tags.includes(tag.id)) {
            dispatch(updateFrequentlyUsed(tag.id));
            const updatedUser = {...user, tags: [...user.tags, tag.id]};
            dispatch(postUser(updatedUser));
        }
    };

export const updateTags = (username: string, tagIds: string[]): AppThunk =>
    (dispatch, getState) => {
        const userRecord = getState().user.userRecord;
        const user: User = userRecord[username] ? userRecord[username].user : null;

        if (user && tagIds && !isEqual(user.tags, tagIds)) {
            const updatedUser = {...user, tags: tagIds};
            dispatch(postUser(updatedUser));
        }
    };

export const removeTag = (username: string, tagId: string): AppThunk =>
    (dispatch, getState) => {
        const userRecord = getState().user.userRecord;
        const user: User = userRecord[username] ? userRecord[username].user : null;

        if (user && tagId) {
            const updatedUser = {...user, tags: user.tags.filter(id => id !== tagId)};
            dispatch(postUser(updatedUser));
        }
    };

export default userSlice.reducer;
