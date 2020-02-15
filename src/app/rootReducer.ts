import { combineReducers } from '@reduxjs/toolkit'
import setsReducer from '../slices/sets'
import userReducer from '../slices/user'
import optionsReducer from '../slices/options'
import frequentlyUsedReducer from '../slices/frequentlyUsed'

const rootReducer = combineReducers({
    sets: setsReducer,
    user: userReducer,
    frequentlyUsed: frequentlyUsedReducer,
    options: optionsReducer
});

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
