import {
    USER_API_FAILURE,
    USER_API_REQUEST,
    USER_API_SUCCESS
} from "../constants/action-types";

const createUser = (username, tags= []) => {
    return {[username]: { tags, encounters: 0, lastSeen: new Date()}}
};

const user = (state = {}, action) => {
    switch (action.type) {
        case USER_API_REQUEST: {
            const user = {
                [action.arg]: {isFetching: true}
            };

            return {...state, ...user};
        }
        case USER_API_SUCCESS: {
            const {[action.arg]: {...props}} = action.response;
            const properties = {...props, isFetching: false};
            const user = {[action.arg]: properties};
            return {...state, ...user};
        }
        case USER_API_FAILURE: {
            const new_user = createUser(action.arg);
            const {[action.arg]: {...props}} = new_user;
            const properties = {...props, isFetching: false};
            const user = {[action.arg]: properties};
            return {...state, ...user};
        }
        default:
            return state;
    }
};

export default user;
