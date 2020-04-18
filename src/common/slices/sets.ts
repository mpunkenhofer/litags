import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Set, Tag, Font } from "../types"
import * as storage from "../storage"
import { AppThunk } from "../store";
import { v4 } from 'uuid';
import has from "lodash/has";

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
        setsSuccess(state, { payload }: PayloadAction<Set[]>): void {
            state.sets = payload;
            state.loading = false;
            state.error = null;

            for (const set of state.sets) {
                for (const tag of set.tags) {
                    state.tagsById[tag.id] = tag;
                }
            }
        },
        setsFailure(state, { payload }: PayloadAction<string>): void {
            state.loading = false;
            state.error = payload;
        },
        updateTag(state, { payload }: PayloadAction<{ id: string; tag: Tag }>): void {
            for (const set of state.sets) {
                const idx = set.tags.findIndex((tag) => tag.id === payload.id);
                if (idx > -1) {
                    set.tags[idx] = payload.tag;
                    state.tagsById[payload.id] = payload.tag;
                    return;
                }
            }
        },
        updateSet(state, { payload }: PayloadAction<{ id: string; set: Set }>): void {
            const idx = state.sets.findIndex((set) => set.id === payload.id);
            if (idx > -1) {
                state.sets[idx] = payload.set;
            }
        },
        createAndAddSet(state, { payload }:
            PayloadAction<{ name: string; iconUrl: string; tags: Tag[]; font?: Font }>): void {
            const id = v4();
            const set: Set = { id, ...payload };

            state.sets.push(set);
        },
        createAndAddTag(state, { payload }:
            PayloadAction<{ id: string; tag: { name: string; aliases: string[]; uri: string; color?: string; font?: Font } }>): void {
            const tagId = v4();
            const tag: Tag = { id: tagId, ...payload.tag };

            const idx = state.sets.findIndex((set) => set.id === payload.id);

            if (idx > -1) {
                const updatedSet = state.sets[idx];

                updatedSet.tags.push(tag);

                state.sets[idx] = updatedSet;
                state.tagsById[tagId] = tag;
            }
        },
        deleteTag(state, { payload }: PayloadAction<{ setId: string; tagId: string }>): void {
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
        deleteSet(state, { payload }: PayloadAction<string>): void {
            // TODO: remove tags from the set we remove from state.tagsById
            state.sets = state.sets.filter((set: Set) => set.id !== payload);
        },
        updateAliases(state, { payload }:
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
        },
        updateSets(state, { payload }: PayloadAction<Set[]>): void {
            state.sets = payload;
        }
    }
});

export const {
    setsRequest,
    setsSuccess,
    setsFailure,
    updateTag,
    updateSet,
    updateSets,
    updateAliases,
    createAndAddSet,
    createAndAddTag,
    deleteSet,
    deleteTag,
} = setsSlice.actions;


export const getSets = (): AppThunk => (dispatch, getState): void => {
    if (!getState().sets.loading) {
        dispatch(setsRequest());
        storage.getSets()
            .then(sets => dispatch(setsSuccess(sets)))
            .catch(err => dispatch(setsFailure(err.toString())));
    }
};

export const setSets = (): AppThunk => (dispatch, getState): void => {
    const sets = getState().sets.sets;
    //dispatch(setsRequest());
    // api.postSets(sets)
    //     .then(sets => dispatch(setsSuccess(sets)))
    //     .catch(err => dispatch(setsFailure(err.toString())))
    storage.setSets(sets).catch(err => console.error(err));
};

export const updateTagName = (id: string, name: string): AppThunk =>
    (dispatch, getState): void => {
        const tag = getState().sets.tagsById[id];

        if (tag) {
            const updatedTag = { ...tag, name };
            dispatch(updateTag({ id, tag: updatedTag }));
        }
    };

export const updateTagURI = (id: string, uri: string): AppThunk =>
    (dispatch, getState): void => {
        const tag = getState().sets.tagsById[id];

        if (tag) {
            const updatedTag = { ...tag, uri };
            dispatch(updateTag({ id, tag: updatedTag }));
        }
    };

export const updateTagColor = (id: string, color: string): AppThunk =>
    (dispatch, getState): void => {
        const tag = getState().sets.tagsById[id];

        if (tag) {
            const updatedTag = { ...tag, color };
            dispatch(updateTag({ id, tag: updatedTag }));
        }
    };

export const updateSetProperty = (id: string, property: string, value: string): AppThunk =>
    (dispatch, getState): void => {
        const sets = getState().sets.sets;
        const idx = sets.findIndex((set: Set) => set.id === id);
        if (idx > -1 && has(sets[idx], property)) {
            const updatedSet = { ...sets[idx], [property]: value };
            dispatch(updateSet({ id, set: updatedSet }));
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

export const addSet = (name: string, iconUrl?: string, font?: Font, tags?: Tag[]): AppThunk =>
    (dispatch): void => {
        const set = { name, iconUrl: iconUrl || '', font, tags: tags || [] };
        dispatch(createAndAddSet(set));
    };

export const addTag = (setId: string, name: string, aliases?: string[], uri?: string, color?: string): AppThunk =>
    (dispatch): void => {
        const tag = { name, aliases: aliases || [], uri: uri || '', color };
        dispatch(createAndAddTag({ id: setId, tag }));
    };

export const addAlias = (tagId: string, alias: string): AppThunk =>
    (dispatch, getState): void => {
        if (alias && alias.length > 0) {
            const tag = getState().sets.tagsById[tagId];

            if (tag) {
                const oldAliases: string[] = (tag && tag.aliases != undefined) ? tag.aliases : []

                dispatch(updateAliases({ id: tagId, newAliases: [alias, ...oldAliases]}));
            }
        }
    };

export const removeAlias = (tagId: string, alias: string): AppThunk =>
    (dispatch, getState): void => {
        const tag = getState().sets.tagsById[tagId];

        if (tag) {
            const newAliases: string[] = (tag.aliases != undefined) ? tag.aliases.filter(a => a !== alias) : []

            dispatch(updateAliases({
                id: tagId,
                newAliases
            }));
        }
    };

export default setsSlice.reducer;
