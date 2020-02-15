import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Set, Tag} from "../api/storageAPI"
import * as api from "../api/storageAPI"
import {AppThunk} from "../app/store";

interface SetsState {
    sets: Set[],
    tagsById: Record<string, Tag | undefined>,
    setsById: Record<string, Set | undefined>,
    loading: boolean,
    error: string | null
}

const setsInitialState: SetsState = {
    sets: [],
    tagsById: {},
    setsById: {},
    loading: false,
    error: null
};

const setsSlice = createSlice({
    name: 'sets',
    initialState: setsInitialState,
    reducers: {
        getSetsRequest(state) {
            state.loading = true;
            state.error = null;
        },
        getSetsSuccess(state, {payload}: PayloadAction<Set[]>) {
            state.sets = payload;
            state.loading = false;
            state.error = null;

            for(const set of state.sets) {
                state.setsById[set.id] = set;
                for(const tag of set.tags) {
                    state.tagsById[tag.id] = tag;
                }
            }
        },
        getSetsFailure(state, {payload}: PayloadAction<string>) {
            state.loading = false;
            state.error = payload;
        }
    }
});

export const {
    getSetsRequest,
    getSetsSuccess,
    getSetsFailure,
} = setsSlice.actions;

export const getSets = (): AppThunk => dispatch => {
    dispatch(getSetsRequest());
    api.getSets()
        .then(sets => dispatch(getSetsSuccess(sets)))
        .catch(err => dispatch(getSetsFailure(err.toString())));
};

export default setsSlice.reducer;
