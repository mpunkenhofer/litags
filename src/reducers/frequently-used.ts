import {combineReducers} from "redux";
import {
    FREQUENTLY_USED_API_FAILURE,
    FREQUENTLY_USED_API_REQUEST,
    FREQUENTLY_USED_API_SUCCESS,
} from "../actions";
import {errorMessageReducer, isFetchingReducer} from "./util";

const frequentlyUsed = (state = [], action) => {
    switch (action.type) {
        case FREQUENTLY_USED_API_SUCCESS: {
            if (!action.response)
                return state;
            return action.response;
        }
        default:
            return state;
    }
};

const isFetching = isFetchingReducer(FREQUENTLY_USED_API_REQUEST, FREQUENTLY_USED_API_SUCCESS, FREQUENTLY_USED_API_FAILURE);
const errorMessage = errorMessageReducer(FREQUENTLY_USED_API_REQUEST, FREQUENTLY_USED_API_SUCCESS, FREQUENTLY_USED_API_FAILURE);

export default combineReducers({frequentlyUsed, isFetching, errorMessage});
