import {combineReducers} from "redux";
import {
    FETCH_FREQUENTLY_USED_FAILURE,
    FETCH_FREQUENTLY_USED_REQUEST,
    FETCH_FREQUENTLY_USED_SUCCESS,
} from "../constants/action-types";
import {errorMessageReducer, isFetchingReducer} from "./util";

const frequentlyUsed = (state = [], action) => {
    return state;
};

const isFetching = isFetchingReducer(FETCH_FREQUENTLY_USED_REQUEST, FETCH_FREQUENTLY_USED_SUCCESS, FETCH_FREQUENTLY_USED_FAILURE);
const errorMessage = errorMessageReducer(FETCH_FREQUENTLY_USED_REQUEST, FETCH_FREQUENTLY_USED_SUCCESS, FETCH_FREQUENTLY_USED_FAILURE);

export default combineReducers({frequentlyUsed, isFetching, errorMessage});
