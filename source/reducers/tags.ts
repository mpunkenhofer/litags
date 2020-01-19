import {combineReducers} from "redux";
import {TAGS_API_FAILURE, TAGS_API_REQUEST, TAGS_API_SUCCESS} from "../constants/action-types";
import {errorMessageReducer, isFetchingReducer} from "./util";

const tags = (state = {}, action) => {
    switch (action.type) {
        case TAGS_API_SUCCESS: {
            return action.response;
        }
        default:
            return state;
    }
};

const isFetching = isFetchingReducer(TAGS_API_REQUEST, TAGS_API_SUCCESS, TAGS_API_FAILURE);
const errorMessage = errorMessageReducer(TAGS_API_REQUEST, TAGS_API_SUCCESS, TAGS_API_FAILURE);

export default combineReducers({tags, isFetching, errorMessage});
