import {combineReducers} from "redux";
import user from "./user";
import sets from "./sets";
import options from "./options";
import frequentlyUsed from "./frequently-used"

const rootReducer = combineReducers( {
    options,
    sets,
    user,
    frequentlyUsed
});

export default rootReducer
