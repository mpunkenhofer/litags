import {combineReducers} from "redux";
import tags from "./tags";
import user from "./user";
import options from "./options";
import frequently_used from "./frequently-used";

const rootReducer = combineReducers( {
    options,
    tags,
    frequently_used,
    user,
});

export default rootReducer