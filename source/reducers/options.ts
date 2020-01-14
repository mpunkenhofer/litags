import {combineReducers} from "redux";
import {
    FETCH_OPTIONS_FAILURE,
    FETCH_OPTIONS_REQUEST,
    FETCH_OPTIONS_SUCCESS,
} from "../constants/action-types";
import {errorMessageReducer, isFetchingReducer} from "./util";

const options = (state = {}, action) => {
    return state;
};

const isFetching = isFetchingReducer(FETCH_OPTIONS_REQUEST, FETCH_OPTIONS_SUCCESS, FETCH_OPTIONS_FAILURE);
const errorMessage = errorMessageReducer(FETCH_OPTIONS_REQUEST, FETCH_OPTIONS_SUCCESS, FETCH_OPTIONS_FAILURE);

export default combineReducers({options, isFetching, errorMessage});