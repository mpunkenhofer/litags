import * as actions from "./index";
import * as api from "../api";
import {getUserIsFetching} from "../selectors";

export const fetch = (username?) => (state, dispatch) => {
    if(!getUserIsFetching(state)) {
        dispatch(actions.fetchUserRequest(username));
        api.fetchUser(username).then(
            response => dispatch(actions.fetchUserSuccess(username, response)),
            error => dispatch(actions.fetchUserFailure(username, error)));
        console.log('fetching...');
    } else {
        console.log('already fetching...');
    }
};