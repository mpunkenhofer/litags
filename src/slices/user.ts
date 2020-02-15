import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunk} from "../app/store";
import * as api from "../api/storageAPI";
import {User} from "../api/storageAPI";

interface UserLoadDetail {
    loading: boolean,
    error: string | null
}

type UserRecord = {
    user: User
} & UserLoadDetail

interface UserState {
    user: Record<string, UserRecord | undefined>
}

const usersInitialState: UserState = {
    user: {},
};

const userSlice = createSlice({
    name: 'user',
    initialState: usersInitialState,
    reducers: {
        getUserRequest(state, {payload}: PayloadAction<{username: string}>) {
            state.user[payload.username] = {user: {name: payload.username, tags: []}, loading: true, error: null};
        },
        getUsersSuccess(state, {payload}: PayloadAction<{username: string, user: User}>) {
            state.user[payload.username] = {user: payload.user, loading: false, error: null};
        },
        getUsersFailure(state, {payload}: PayloadAction<{username: string, error: string}>) {
            state.user[payload.username] =
                {user: {name: payload.username, tags: []}, loading: false, error: payload.error};
        }
    }
});

export const {
    getUserRequest,
    getUsersSuccess,
    getUsersFailure,
} = userSlice.actions;

export const getUser = (username: string): AppThunk => dispatch => {
    dispatch(getUserRequest({username}));
    api.getUser(username)
        .then(user => dispatch(getUsersSuccess({username, user})))
        .catch(err => dispatch(getUsersFailure({username, error: err.toString()})));
};

export default userSlice.reducer;

// export const addTagToUser = (username, tagId) => {
//     return (dispatch, getState) => {
//         const userData = selectors.getUser(username)(getState());
//         if (username && userData && !userData['tags'].includes(tagId)) {
//             dispatch(updateFrequentlyUsed(tagId));
//             console.group('%c Add Tag to User', 'font-size: 2em; font-weight: bold; color: pink');
//             console.log(username, userData, tagId);
//             const updatedUserData = {...userData, tags: [...userData['tags'], tagId]};
//             console.log('updated userData: ', updatedUserData);
//             console.groupEnd();
//             dispatch(putUser(username, userData));
//         }
//     }
// };
//
// const updateFrequentlyUsed = (id: string) => {
//     return (dispatch, getState) => {
//         const frequentlyUsedIDs = selectors.getFrequentlyUsed(getState());
//         if (frequentlyUsedIDs && id) {
//             console.group('%c Update freq used', 'font-size: 2em; font-weight: bold; color: pink');
//             console.log(id, frequentlyUsedIDs);
//             const updatedFrequentlyUsedIDs = [...frequentlyUsedIDs, id];
//             console.log('updated freq used: ', updatedFrequentlyUsedIDs);
//             console.groupEnd();
//             dispatch(putFrequentlyUsed(updatedFrequentlyUsedIDs));
//         }
//     }
// };
