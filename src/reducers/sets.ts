import {combineReducers} from "redux";
import {
    SETS_API_FAILURE,
    SETS_API_REQUEST,
    SETS_API_SUCCESS
} from "../actions";
import {errorMessageReducer, isFetchingReducer} from "./util";

const sets = (state = [], action) => {
    switch (action.type) {
        case SETS_API_SUCCESS: {
            if(!action.response)
                return state;

            return action.response;
        }
        default:
            return state;
    }
};

const isFetching = isFetchingReducer(SETS_API_REQUEST, SETS_API_SUCCESS, SETS_API_FAILURE);
const errorMessage = errorMessageReducer(SETS_API_REQUEST, SETS_API_SUCCESS, SETS_API_FAILURE);

export default combineReducers({sets, isFetching, errorMessage});
