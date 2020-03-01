import {configureStore, Action, getDefaultMiddleware} from '@reduxjs/toolkit'
import { ThunkAction } from 'redux-thunk'
import logger from 'redux-logger'
import rootReducer, { RootState } from './rootReducer'

const store = configureStore({
    reducer: rootReducer,
    middleware: (process.env.NODE_ENV !== 'production') ?
        [...getDefaultMiddleware<RootState>(), logger] as const : [...getDefaultMiddleware<RootState>()] as const, //eslint-disable-line @typescript-eslint/no-unnecessary-type-assertion
});

export type AppDispatch = typeof store.dispatch

export type AppThunk = ThunkAction<void, RootState, null, Action<string>>

export default store
