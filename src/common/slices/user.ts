import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunk} from "../store";
import * as storage from "../storage";
import {Tag, User} from "../types";
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
        userRequest(state, {payload}: PayloadAction<{ id: string }>): void {
            if (state.userRecord[payload.id]) {
                state.userRecord[payload.id].loading = true;
                state.userRecord[payload.id].error = null;
            } else {
                state.userRecord[payload.id] =
                    {user: {id: payload.id, tags: []}, loading: true, error: null};
            }
        },
        userSuccess(state, {payload}: PayloadAction<{ id: string; user: User }>): void {
            state.userRecord[payload.id] = {user: payload.user, loading: false, error: null};
        },
        userFailure(state, {payload}:
            PayloadAction<{ id: string; error: string }>): void {
            state.userRecord[payload.id] =
                {user: {id: payload.id, tags: []}, loading: false, error: null};
        },
        deleteRequest(state, {payload}: PayloadAction<{id: string}>): void {
            if (state.userRecord[payload.id]) {
                state.userRecord[payload.id].loading = true;
                state.userRecord[payload.id].error = null;
            }
        },
        deleteSuccess(state, {payload}: PayloadAction<{ id: string }>): void {
            if(state.userRecord[payload.id]) {
                const updatedUserRecord = state.userRecord;
                delete updatedUserRecord[payload.id];
                state.userRecord = updatedUserRecord;
            }
        },
        deleteFailure(state, {payload}:
            PayloadAction<{ id: string; error: string }>): void {
            if (state.userRecord[payload.id]) {
                state.userRecord[payload.id].loading = true;
                state.userRecord[payload.id].error = payload.error;
            }
        },
        allUsersRequest(state): void {
            state.loading = true;
            state.error = null;
        },
        allUsersSuccess(state, {payload}: PayloadAction<User[]>): void {
            for (const user of payload) {
                state.userRecord[user.id] = {user: user, loading: false, error: null};
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

export const getUser = (id: string): AppThunk => (dispatch): void => {
    dispatch(userRequest({id}));
    storage.getUser(id)
        .then(user => dispatch(userSuccess({id, user})))
        .catch(err => dispatch(userFailure({id, error: err.toString()})));
};

export const deleteUser = (id: string): AppThunk => (dispatch): void => {
    dispatch(deleteRequest({id}));
    storage.deleteUser(id)
        .then(() => dispatch(deleteSuccess({id})))
        .catch(err => dispatch(deleteFailure({id, error: err.toString()})));
};

export const getAllUsers = (): AppThunk =>
    (dispatch, getState): void => {
        if (!getState().user.loading) {
            dispatch(allUsersRequest());
            storage.getUsers()
                .then(users => dispatch(allUsersSuccess(users)))
                .catch(err => dispatch(allUsersFailure(err.toString())));
        }
    };

export const setUser = (user: User): AppThunk => (dispatch): void => {
    dispatch(userRequest({id: user.id}));
    storage.setUser(user)
        .then(user => dispatch(userSuccess({id: user.id, user})))
        .catch(err => dispatch(userFailure({id: user.id, error: err.toString()})));
};

export const addTag = (id: string, tag: Tag): AppThunk =>
    (dispatch, getState): void => {
        const userRecord = getState().user.userRecord;
        const user: User | null = userRecord[id] ? userRecord[id].user : null;

        // console.group(`%cAdd Tag! ${username}`, 'font-size: 1.2em; font-weight: bold; color: orange');
        // console.log(user, tag);
        // console.groupEnd();

        // tag comparison
        if (user && !(user.tags.findIndex(t => t.id === tag.id) > -1)) {
            dispatch(updateFrequentlyUsed(tag));
            const updatedUser = {...user, tags: [...user.tags, tag]};
            dispatch(setUser(updatedUser));
        }
    };

export const updateTags = (id: string, tags: Tag[]): AppThunk =>
    (dispatch, getState): void=> {
        const userRecord = getState().user.userRecord;
        const user: User | null = userRecord[id] ? userRecord[id].user : null;

        if (user && !isEqual(user.tags, tags)) {
            const updatedUser = {...user, tags: tags};
            dispatch(setUser(updatedUser));
        }
    };

export const removeTag = (id: string, tag: Tag): AppThunk =>
    (dispatch, getState): void => {
        const userRecord = getState().user.userRecord;
        const user: User | null = userRecord[id] ? userRecord[id].user : null;

        if (user) {
            // tag comparison
            const updatedUser = {...user, tags: user.tags.filter(t => t.id !== tag.id)};
            dispatch(setUser(updatedUser));
        }
    };

export default userSlice.reducer;
