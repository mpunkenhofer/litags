import {configureStore, Action, getDefaultMiddleware} from '@reduxjs/toolkit'
import { ThunkAction } from 'redux-thunk'
import logger from 'redux-logger'
import rootReducer, { RootState } from './rootReducer'

const store = configureStore({
    reducer: rootReducer,
    middleware: process.env.NODE_ENV !== 'production' ?
        [...getDefaultMiddleware(), logger] : [...getDefaultMiddleware()],
});

export type AppDispatch = typeof store.dispatch

export type AppThunk = ThunkAction<void, RootState, null, Action<string>>

export default store
