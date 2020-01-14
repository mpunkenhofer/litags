import {combineReducers} from "redux";
import {FETCH_TAGS_FAILURE, FETCH_TAGS_REQUEST, FETCH_TAGS_SUCCESS} from "../constants/action-types";
import {errorMessageReducer, isFetchingReducer} from "./util";

const tags = (state = {}, action) => {
    switch (action.type) {
        case FETCH_TAGS_SUCCESS: {
            return action.response;
        }
        default:
            return state;
    }
};

const isFetching = isFetchingReducer(FETCH_TAGS_REQUEST, FETCH_TAGS_SUCCESS, FETCH_TAGS_FAILURE);
const errorMessage = errorMessageReducer(FETCH_TAGS_REQUEST, FETCH_TAGS_SUCCESS, FETCH_TAGS_FAILURE);

export default combineReducers({tags, isFetching, errorMessage});