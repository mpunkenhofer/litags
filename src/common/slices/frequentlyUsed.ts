import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunk} from "../store";
import * as storage from "../storage";
import {FrequentlyUsed} from "../types";

type FrequentlyUsedState = {
    frequentlyUsed: FrequentlyUsed;
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
        frequentlyUsedSuccess(state, {payload}: PayloadAction<FrequentlyUsed>): void {
            state.frequentlyUsed = payload;
            state.loading = false;
            state.error = null;
        },
        frequentlyUsedError(state, {payload}: PayloadAction<string>): void {
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
    if(!getState().frequentlyUsed.loading) {
        dispatch(frequentlyUsedRequest());
        storage.getFrequentlyUsed()
            .then(freqUsed => dispatch(frequentlyUsedSuccess(freqUsed)))
            .catch(err => dispatch(frequentlyUsedError(err.toString())));
    }
};

export const setFrequentlyUsed = (frequentlyUsed: FrequentlyUsed): AppThunk =>
    (dispatch): void => {
    dispatch(frequentlyUsedRequest());
    storage.setFrequentlyUsed(frequentlyUsed)
        .then(freqUsed => dispatch(frequentlyUsedSuccess(freqUsed)))
        .catch(err => dispatch(frequentlyUsedError(err.toString())));
};

export const updateFrequentlyUsed = (tagId: string): AppThunk =>
    (dispatch, getState): void => {
    const freqUsed = getState().frequentlyUsed.frequentlyUsed;
    let frequentlyUsed = freqUsed ? [...freqUsed] : [];

    const index = frequentlyUsed.findIndex(freqUsedPair => freqUsedPair[0] === tagId);

    if(index >= 0) {
        const [id, frequency] = frequentlyUsed[index];
        frequentlyUsed[index] = [id, frequency + 1];
    } else {
        frequentlyUsed = [...frequentlyUsed, [tagId, 1]];
    }

    frequentlyUsed.sort((a, b): number => (b[1] - a[1]));

    dispatch(setFrequentlyUsed(frequentlyUsed));
};

export default frequentlyUsedSlice.reducer;
