import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunk} from "../app/store";
import * as api from "../api/storageAPI";
import {FrequentlyUsed} from "../api/storageAPI";

interface FrequentlyUsedState {
    frequentlyUsed: FrequentlyUsed
    loading: boolean,
    error: string | null
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
        frequentlyUsedRequest(state) {
            state.loading = true;
            state.error = null;
        },
        frequentlyUsedSuccess(state, {payload}: PayloadAction<FrequentlyUsed>) {
            state.frequentlyUsed = payload;
            state.loading = false;
            state.error = null;
        },
        frequentlyUsedError(state, {payload}: PayloadAction<string>) {
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

export const getFrequentlyUsed = (): AppThunk => (dispatch, getState) => {
    if(!getState().frequentlyUsed.loading) {
        dispatch(frequentlyUsedRequest());
        api.getFrequentlyUsed()
            .then(freqUsed => dispatch(frequentlyUsedSuccess(freqUsed)))
            .catch(err => dispatch(frequentlyUsedError(err.toString())));
    }
};

export const postFrequentlyUsed = (frequentlyUsed: FrequentlyUsed): AppThunk => dispatch => {
    dispatch(frequentlyUsedRequest());
    api.postFrequentlyUsed(frequentlyUsed)
        .then(freqUsed => dispatch(frequentlyUsedSuccess(freqUsed)))
        .catch(err => dispatch(frequentlyUsedError(err.toString())));
};

export const updateFrequentlyUsed = (tagId: string): AppThunk => (
    dispatch, getState) => {
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

    dispatch(postFrequentlyUsed(frequentlyUsed));
};

export default frequentlyUsedSlice.reducer;
