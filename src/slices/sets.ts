import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Set, Tag} from "../api/storageAPI"
import * as api from "../api/storageAPI"
import {AppThunk} from "../app/store";
import {v4} from 'uuid';
import {filter} from 'lodash';

export type SetsState = {
    sets: Set[];
    order: string[];
    tagsById: Record<string, Tag>;
    loading: boolean;
    error: string | null;
}

const setsInitialState: SetsState = {
    sets: [],
    order: [],
    tagsById: {},
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
        updateSet(state, {payload}: PayloadAction<{ id: string; set: Set }>): void {
            const idx = state.sets.findIndex((set) => set.id === payload.id);
            if (idx > -1) {
                state.sets[idx] = payload.set;
            }
        },
        createAndAddSet(state, {payload}:
            PayloadAction<{ name: string; iconUrl: string; fontUrl: string; tags: Tag[] }>): void {
            const id = v4();
            const set: Set = {id, ...payload};

            state.sets.push(set);
        },
        createAndAddTag(state, {payload}:
            PayloadAction<{ id: string; tag: { name: string; aliases: string[]; uri: string; color?: string } }>): void {
            const tagId = v4();
            const tag: Tag = {id: tagId, ...payload.tag};

            const idx = state.sets.findIndex((set) => set.id === payload.id);

            if (idx > -1) {
                const updatedSet = state.sets[idx];

                updatedSet.tags.push(tag);

                state.sets[idx] = updatedSet;
                state.tagsById[tagId] = tag;
            }
        },
        deleteTag(state, {payload}: PayloadAction<{ setId: string; tagId: string }>): void {
            const idx = state.sets.findIndex((set) => set.id === payload.setId);

            if (idx > -1) {
                state.sets[idx] = {
                    ...state.sets[idx],
                    tags: state.sets[idx].tags.filter(tag => tag.id !== payload.tagId)
                };

                const updatedTagsById = state.tagsById;
                delete updatedTagsById[payload.tagId];
                state.tagsById = updatedTagsById;
            }
        },
        deleteSet(state, {payload}: PayloadAction<string>): void {
            // TODO: remove tags from the set we remove from state.tagsById
            state.sets = state.sets.filter((set: Set) => set.id !== payload);
        },
        updateAliases(state, {payload}:
            PayloadAction<{ id: string; newAliases: string[] }>): void {
            const updatedTag = state.tagsById[payload.id];
            updatedTag.aliases = payload.newAliases;
            state.tagsById[payload.id] = updatedTag;

            for (let i = 0; i < state.sets.length; i++) {
                const tagIdx = state.sets[i].tags.findIndex(tag => tag.id === payload.id);
                if (tagIdx > -1) {
                    state.sets[i].tags[tagIdx] = updatedTag;
                    return;
                }
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
    updateAliases,
    createAndAddSet,
    createAndAddTag,
    deleteSet,
    deleteTag,
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

export const updateSetProperty = (id: string, property: string, value: string): AppThunk =>
    (dispatch, getState): void => {
        const sets = getState().sets.sets;
        const idx = sets.findIndex((set: Set) => set.id === id);
        if (idx > -1) {
            const updatedSet = {...sets[idx], [property]: value};
            dispatch(updateSet({id, set: updatedSet}));
        }
    };

export const updateSetName = (id: string, name: string): AppThunk =>
    (dispatch): void => {
        dispatch(updateSetProperty(id, 'name', name));
    };

export const updateIconUrl = (id: string, iconUrl: string): AppThunk =>
    (dispatch): void => {
        dispatch(updateSetProperty(id, 'iconUrl', iconUrl));
    };

export const updateFontUrl = (id: string, fontUrl: string): AppThunk =>
    (dispatch): void => {
        dispatch(updateSetProperty(id, 'fontUrl', fontUrl));
    };

export const addSet = (name: string, iconUrl?: string, fontUrl?: string, tags?: Tag[]): AppThunk =>
    (dispatch): void => {
        const set = {name, iconUrl: iconUrl || '', fontUrl: fontUrl || '', tags: tags || []};
        dispatch(createAndAddSet(set));
    };

export const addTag = (setId: string, name: string, aliases?: string[], uri?: string, color?: string): AppThunk =>
    (dispatch): void => {
        const tag = {name, aliases: aliases || [], uri: uri || '', color};
        dispatch(createAndAddTag({id: setId, tag}));
    };

export const addAlias = (tagId: string, alias: string): AppThunk =>
    (dispatch, getState): void => {
        dispatch(updateAliases({id: tagId, newAliases: [alias, ...getState().sets.tagsById[tagId].aliases]}));
    };

export const removeAlias = (tagId: string, alias: string): AppThunk =>
    (dispatch, getState): void => {
        dispatch(updateAliases({
            id: tagId,
            newAliases: getState().sets.tagsById[tagId].aliases.filter(a => a !== alias)
        }));
    };

export default setsSlice.reducer;
