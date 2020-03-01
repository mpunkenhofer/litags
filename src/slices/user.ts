import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunk} from "../app/store";
import * as api from "../api/storageAPI";
import {Tag, User} from "../api/storageAPI";
import {updateFrequentlyUsed} from "./frequentlyUsed";
import isEqual from "lodash/isequal";

export type UserRecord = {
    user: User;
    loading: boolean;
    error: string | null;
}

export type UserState = {
    userRecord: Record<string, UserRecord>;
    loading: boolean;
    error: string | null;
}

const usersInitialState: UserState = {
    userRecord: {},
    loading: false,
    error: null
};

const userSlice = createSlice({
    name: 'user',
    initialState: usersInitialState,
    reducers: {
        userRequest(state, {payload}: PayloadAction<{ username: string }>): void {
            if (state.userRecord[payload.username]) {
                state.userRecord[payload.username].loading = true;
                state.userRecord[payload.username].error = null;
            } else {
                state.userRecord[payload.username] =
                    {user: {name: payload.username, tags: []}, loading: true, error: null};
            }
        },
        userSuccess(state, {payload}: PayloadAction<{ username: string; user: User }>): void {
            state.userRecord[payload.username] = {user: payload.user, loading: false, error: null};
        },
        userFailure(state, {payload}:
            PayloadAction<{ username: string; error: string }>): void {
            state.userRecord[payload.username] =
                {user: {name: payload.username, tags: []}, loading: false, error: null};
        },
        deleteRequest(state, {payload}: PayloadAction<{username: string}>): void {
            if (state.userRecord[payload.username]) {
                state.userRecord[payload.username].loading = true;
                state.userRecord[payload.username].error = null;
            }
        },
        deleteSuccess(state, {payload}: PayloadAction<{ username: string }>): void {
            if(state.userRecord[payload.username]) {
                const updatedUserRecord = state.userRecord;
                delete updatedUserRecord[payload.username];
                state.userRecord = updatedUserRecord;
            }
        },
        deleteFailure(state, {payload}:
            PayloadAction<{ username: string; error: string }>): void {
            if (state.userRecord[payload.username]) {
                state.userRecord[payload.username].loading = true;
                state.userRecord[payload.username].error = payload.error;
            }
        },
        allUsersRequest(state): void {
            state.loading = true;
            state.error = null;
        },
        allUsersSuccess(state, {payload}: PayloadAction<User[]>): void {
            for (const user of payload) {
                state.userRecord[user.name] = {user: user, loading: false, error: null};
            }

            state.loading = false;
            state.error = null;
        },
        allUsersFailure(state, {payload}: PayloadAction<string>): void {
            state.loading = false;
            state.error = payload;
        }
    }
});

export const {
    userRequest,
    userSuccess,
    userFailure,
    deleteRequest,
    deleteSuccess,
    deleteFailure,
    allUsersRequest,
    allUsersSuccess,
    allUsersFailure,
} = userSlice.actions;

export const getUser = (username: string): AppThunk => (dispatch): void => {
    dispatch(userRequest({username}));
    api.getUser(username)
        .then(user => dispatch(userSuccess({username, user})))
        .catch(err => dispatch(userFailure({username, error: err.toString()})));
};

export const deleteUser = (username: string): AppThunk => (dispatch): void => {
    dispatch(deleteRequest({username}));
    api.deleteUser(username)
        .then(() => dispatch(deleteSuccess({username})))
        .catch(err => dispatch(deleteFailure({username, error: err.toString()})));
};

export const getAllUsers = (): AppThunk =>
    (dispatch, getState): void => {
        if (!getState().user.loading) {
            dispatch(allUsersRequest());
            api.getUsers()
                .then(users => dispatch(allUsersSuccess(users)))
                .catch(err => dispatch(allUsersFailure(err.toString())));
        }
    };

export const postUser = (user: User): AppThunk => (dispatch): void => {
    dispatch(userRequest({username: user.name}));
    api.postUser(user)
        .then(user => dispatch(userSuccess({username: user.name, user})))
        .catch(err => dispatch(userFailure({username: user.name, error: err.toString()})));
};

export const addTag = (username: string, tag: Tag): AppThunk =>
    (dispatch, getState): void => {
        const userRecord = getState().user.userRecord;
        const user: User | null = userRecord[username] ? userRecord[username].user : null;

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
    (dispatch, getState): void=> {
        const userRecord = getState().user.userRecord;
        const user: User | null = userRecord[username] ? userRecord[username].user : null;

        if (user && tagIds && !isEqual(user.tags, tagIds)) {
            const updatedUser = {...user, tags: tagIds};
            dispatch(postUser(updatedUser));
        }
    };

export const removeTag = (username: string, tagId: string): AppThunk =>
    (dispatch, getState): void => {
        const userRecord = getState().user.userRecord;
        const user: User | null = userRecord[username] ? userRecord[username].user : null;

        if (user && tagId) {
            const updatedUser = {...user, tags: user.tags.filter(id => id !== tagId)};
            dispatch(postUser(updatedUser));
        }
    };

export default userSlice.reducer;
