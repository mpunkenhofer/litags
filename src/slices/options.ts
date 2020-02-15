import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Options} from "../api/storageAPI";
import * as api from "../api/storageAPI";
import {AppThunk} from "../app/store";

interface OptionsState {
    options: Options
    loading: boolean,
    error: string | null
}

const OptionsInitialState: OptionsState = {
    options: {enabled: true},
    loading: false,
    error: null
};

const optionsSlice = createSlice({
    name: 'options',
    initialState: OptionsInitialState,
    reducers: {
        getOptionRequest(state) {
            state.loading = true;
            state.error = null;
        },
        getOptionsSuccess(state, {payload}: PayloadAction<Options>) {
            state.options = payload;
            state.loading = false;
            state.error = null;
        },
        getOptionsFailure(state, {payload}: PayloadAction<string>) {
            state.loading = false;
            state.error = payload;
        }
    }
});

export const {
    getOptionRequest,
    getOptionsSuccess,
    getOptionsFailure,
} = optionsSlice.actions;

export const getOptions = (): AppThunk => dispatch => {
    dispatch(getOptionRequest());
    api.getOptions()
        .then(options => dispatch(getOptionsSuccess(options)))
        .catch(err => dispatch(getOptionsFailure(err.toString())));
};

export default optionsSlice.reducer;
