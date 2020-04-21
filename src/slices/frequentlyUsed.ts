import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../common/store";
import * as storage from "../common/storage";
import { FrequentlyUsed, Tag } from "../common/types";

type FrequentlyUsedState = {
    frequentlyUsed: FrequentlyUsed[];
    loading: boolean;
    error: string | null;
}

const frequentlyUsedInitialState: FrequentlyUsedState = {
    frequentlyUsed: [],
    loading: false,
    error: null
};

const frequentlyUsedSlice = createSlice({
    name: 'frequentlyUsed',
    initialState: frequentlyUsedInitialState,
    reducers: {
        frequentlyUsedRequest(state): void {
            state.loading = true;
            state.error = null;
        },
        frequentlyUsedSuccess(state, { payload }: PayloadAction<FrequentlyUsed[]>): void {
            state.frequentlyUsed = payload;
            state.loading = false;
            state.error = null;
        },
        frequentlyUsedError(state, { payload }: PayloadAction<string>): void {
            state.loading = false;
            state.error = payload;
        }
    }
});

export const {
    frequentlyUsedRequest,
    frequentlyUsedSuccess,
    frequentlyUsedError,
} = frequentlyUsedSlice.actions;

export const getFrequentlyUsed = (): AppThunk => (dispatch, getState): void => {
    if (!getState().frequentlyUsed.loading) {
        dispatch(frequentlyUsedRequest());
        storage.getFrequentlyUsed()
            .then(freqUsed => dispatch(frequentlyUsedSuccess(freqUsed)))
            .catch(err => dispatch(frequentlyUsedError(err.toString())));
    }
};

export const setFrequentlyUsed = (frequentlyUsed: FrequentlyUsed[]): AppThunk =>
    (dispatch): void => {
        dispatch(frequentlyUsedRequest());
        storage.setFrequentlyUsed(frequentlyUsed)
            .then(freqUsed => dispatch(frequentlyUsedSuccess(freqUsed)))
            .catch(err => dispatch(frequentlyUsedError(err.toString())));
    };

export const removeFrequentlyUsed = (tag: Tag): AppThunk =>
    (dispatch, getState): void => {
        const updatedFreqUsed = getState().frequentlyUsed.frequentlyUsed.filter(ft => ft.tag.id !== tag.id);
        dispatch(setFrequentlyUsed(updatedFreqUsed));
    };

export const updateFrequentlyUsed = (tag: Tag): AppThunk =>
    (dispatch, getState): void => {
        let frequentlyUsed = [...getState().frequentlyUsed.frequentlyUsed];

        const index = frequentlyUsed.findIndex(freqUsedPair => freqUsedPair.tag.id === tag.id);

        if (index >= 0) {
            frequentlyUsed[index] = { tag: frequentlyUsed[index].tag, count: frequentlyUsed[index].count + 1 };
        } else {
            frequentlyUsed = [...frequentlyUsed, { tag, count: 1 }];
        }

        frequentlyUsed.sort((a, b): number => (b.count - a.count));

        dispatch(setFrequentlyUsed(frequentlyUsed));
    };

export default frequentlyUsedSlice.reducer;
