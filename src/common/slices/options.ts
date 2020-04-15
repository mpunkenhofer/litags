import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Options} from "../types";
import * as storage from "../storage";
import {AppThunk} from "../store";

type OptionsState = {
    options: Options;
    loading: boolean;
    error: string | null;
}

const OptionsInitialState: OptionsState = {
    options: {
        import: {
            users: true,
            sets: true,
            frequentlyUsedTags: true,
            settings: true
        },
        export: {
            users: true,
            sets: true,
            frequentlyUsedTags: true,
            settings: true
        },
        tagListLimit: 10,
        frequentlyUsedLimit: 20,
    },
    loading: false,
    error: null
};

const optionsSlice = createSlice({
    name: 'options',
    initialState: OptionsInitialState,
    reducers: {
        optionRequest(state): void {
            state.loading = true;
            state.error = null;
        },
        optionsSuccess(state, {payload}: PayloadAction<Options>): void {
            state.options = payload;
            state.loading = false;
            state.error = null;
        },
        optionsFailure(state, {payload}: PayloadAction<string>): void {
            state.loading = false;
            state.error = payload;
        },
        setImportUsers(state, {payload}: PayloadAction<boolean>): void {
            state.options.import.users = payload;
        },
        setExportUsers(state, {payload}: PayloadAction<boolean>): void {
            state.options.export.users = payload;
        },
        setImportSets(state, {payload}: PayloadAction<boolean>): void {
            state.options.import.sets = payload;
        },
        setExportSets(state, {payload}: PayloadAction<boolean>): void {
            state.options.export.sets = payload;
        },
        setImportFrequentlyUsed(state, {payload}: PayloadAction<boolean>): void {
            state.options.import.frequentlyUsedTags = payload;
        },
        setExportFrequentlyUsed(state, {payload}: PayloadAction<boolean>): void {
            state.options.export.frequentlyUsedTags = payload;
        },
        setImportSettings(state, {payload}: PayloadAction<boolean>): void {
            state.options.import.settings = payload;
        },
        setExportSettings(state, {payload}: PayloadAction<boolean>): void {
            state.options.export.settings = payload;
        },
        setTagListLimit(state, {payload}: PayloadAction<number>): void {
            state.options.tagListLimit = (payload < 0) ? 0 : ((payload > 10) ? 10 : payload);
        },
        setFrequentlyUsedLimit(state, {payload}: PayloadAction<number>): void {
            state.options.frequentlyUsedLimit = (payload < 0) ? 0 : ((payload > 20) ? 20 : payload);
        }
    }
});

export const {
    optionRequest,
    optionsSuccess,
    optionsFailure,
    setImportUsers,
    setImportSets,
    setImportFrequentlyUsed,
    setImportSettings,
    setExportUsers,
    setExportSets,
    setExportFrequentlyUsed,
    setExportSettings,
    setTagListLimit,
    setFrequentlyUsedLimit,
} = optionsSlice.actions;

export const getOptions = (): AppThunk => (dispatch, getState): void => {
    if (!getState().options.loading) {
        dispatch(optionRequest());
        storage.getOptions()
            .then(options => dispatch(optionsSuccess(options)))
            .catch(err => dispatch(optionsFailure(err.toString())));
    }
};

export const postOptions = (): AppThunk => (dispatch, getState): void => {
    const options = getState().options.options;

    dispatch(optionRequest());
    storage.postOptions(options)
        .then(options => dispatch(optionsSuccess(options)))
        .catch(err => dispatch(optionsFailure(err.toString())));
};


export default optionsSlice.reducer;
