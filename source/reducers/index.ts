import {combineReducers} from "redux";
import tags from "./tags";
import users from "./users";
import options from "./options";

const rootReducer = combineReducers( {
    options,
    tags,
    users,
});

export default rootReducer