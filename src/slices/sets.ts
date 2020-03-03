import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Set, Tag} from "../api/storageAPI"
import * as api from "../api/storageAPI"
import {AppThunk} from "../app/store";

export type SetsState = {
    sets: Set[];
    order: string[];
    tagsById: Record<string, Tag>;
    setsById: Record<string, Set>;
    loading: boolean;
    error: string | null;
}

const setsInitialState: SetsState = {
    sets: [],
    order: [],
    tagsById: {},
    setsById: {},
    loading: false,
    error: null
};

const setsSlice = createSlice({
    name: 'sets',
    initialState: setsInitialState,
    reducers: {
        setsRequest(state): void {
            state.loading = true;
            state.error = null;
        },
        setsSuccess(state, {payload}: PayloadAction<Set[]>): void {
            state.sets = payload;
            state.loading = false;
            state.error = null;

            for (const set of state.sets) {
                state.setsById[set.id] = set;
                for (const tag of set.tags) {
                    state.tagsById[tag.id] = tag;
                }
            }
        },
        setsFailure(state, {payload}: PayloadAction<string>): void {
            state.loading = false;
            state.error = payload;
        },
        updateTag(state, {payload}: PayloadAction<{ id: string; tag: Tag }>): void {
            for (const set of state.sets) {
                const idx = set.tags.findIndex((tag) => tag.id === payload.id);
                if (idx > -1) {
                    set.tags[idx] = payload.tag;
                    state.tagsById[payload.id] = payload.tag;
                    return;
                }
            }
        },
        updateSet(state, {payload}: PayloadAction<{id: string; set: Set}>): void {
            const idx = state.sets.findIndex((set) => set.id === payload.id);
            if(idx > -1) {
                state.sets[idx] = payload.set;
                state.setsById[payload.id] = payload.set;
            }
        }
    }
});

export const {
    setsRequest,
    setsSuccess,
    setsFailure,
    updateTag,
    updateSet,
} = setsSlice.actions;


export const getSets = (): AppThunk => (dispatch, getState): void => {
    if (!getState().sets.loading) {
        dispatch(setsRequest());
        api.getSets()
            .then(sets => dispatch(setsSuccess(sets)))
            .catch(err => dispatch(setsFailure(err.toString())));
    }
};

export const postSets = (sets: Set[]): AppThunk => (dispatch): void => {
    dispatch(setsRequest());
    api.postSets(sets)
        .then(sets => dispatch(setsSuccess(sets)))
        .catch(err => dispatch(setsFailure(err.toString())))
};

export const updateTagName = (id: string, name: string): AppThunk =>
    (dispatch, getState): void => {
        const tag = getState().sets.tagsById[id];

        if (tag) {
            const updatedTag = {...tag, name};
            dispatch(updateTag({id, tag: updatedTag}));
        }
    };

export const updateTagURI = (id: string, uri: string): AppThunk =>
    (dispatch, getState): void => {
        const tag = getState().sets.tagsById[id];

        if (tag) {
            const updatedTag = {...tag, uri};
            dispatch(updateTag({id, tag: updatedTag}));
        }
    };

export const updateTagColor = (id: string, color: string): AppThunk =>
    (dispatch, getState): void => {
        const tag = getState().sets.tagsById[id];

        if (tag) {
            const updatedTag = {...tag, color};
            dispatch(updateTag({id, tag: updatedTag}));
        }
    };

export const updateSetName = (id: string, name: string): AppThunk =>
    (dispatch, getState): void => {
        const tag = getState().sets.setsById[id];

        if (tag) {
            const updatedSet = {...tag, name};
            dispatch(updateSet({id, set: updatedSet}));
        }
    };

export const updateIconUrl = (id: string, iconUrl: string): AppThunk =>
    (dispatch, getState): void => {
        const tag = getState().sets.setsById[id];

        if (tag) {
            const updatedSet = {...tag, iconUrl};
            dispatch(updateSet({id, set: updatedSet}));
        }
    };

export const updateFontUrl = (id: string, fontUrl: string): AppThunk =>
    (dispatch, getState): void => {
        const tag = getState().sets.setsById[id];

        if (tag) {
            const updatedSet = {...tag, fontUrl};
            dispatch(updateSet({id, set: updatedSet}));
        }
    };

export default setsSlice.reducer;
