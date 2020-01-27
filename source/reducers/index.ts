import {combineReducers} from "redux";
import user from "./user";
import sets from "./sets";
import options from "./options";

const rootReducer = combineReducers( {
    options,
    sets,
    user,
});

export default rootReducer
