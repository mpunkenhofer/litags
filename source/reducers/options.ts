import {combineReducers} from "redux";
import {
    OPTIONS_API_FAILURE,
    OPTIONS_API_REQUEST,
    OPTIONS_API_SUCCESS,
} from "../actions";
import {errorMessageReducer, isFetchingReducer} from "./util";

const options = (state = {}, action) => {
    return state;
};

const isFetching = isFetchingReducer(OPTIONS_API_REQUEST, OPTIONS_API_SUCCESS, OPTIONS_API_FAILURE);
const errorMessage = errorMessageReducer(OPTIONS_API_REQUEST, OPTIONS_API_SUCCESS, OPTIONS_API_FAILURE);

export default combineReducers({options, isFetching, errorMessage});
