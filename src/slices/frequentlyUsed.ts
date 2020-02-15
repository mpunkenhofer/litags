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
        getFrequentlyUsedRequest(state) {
            state.loading = true;
            state.error = null;
        },
        getFrequentlyUsedSuccess(state, {payload}: PayloadAction<FrequentlyUsed>) {
            state.frequentlyUsed = payload;
            state.loading = false;
            state.error = null;
        },
        getFrequentlyUsedError(state, {payload}: PayloadAction<string>) {
            state.loading = false;
            state.error = payload;
        }
    }
});

export const {
    getFrequentlyUsedRequest,
    getFrequentlyUsedSuccess,
    getFrequentlyUsedError,
} = frequentlyUsedSlice.actions;

export const getFrequentlyUsed = (): AppThunk => dispatch => {
    dispatch(getFrequentlyUsedRequest());
    api.getFrequentlyUsed()
        .then(freqUsed => dispatch(getFrequentlyUsedSuccess(freqUsed)))
        .catch(err => dispatch(getFrequentlyUsedError(err.toString())));
};

export default frequentlyUsedSlice.reducer;
