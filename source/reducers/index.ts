import {combineReducers} from "redux";
import tags from "./tags";
import user from "./user";
import options from "./options";

const rootReducer = combineReducers( {
    options,
    tags,
    user,
});

export default rootReducer
