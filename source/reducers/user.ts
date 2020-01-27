import {
    USER_API_FAILURE,
    USER_API_REQUEST,
    USER_API_SUCCESS
} from "../constants/action-types";

const user = (state = {}, action) => {
    switch (action.type) {
        case USER_API_REQUEST: {
            const user = {
                [action.name]: {isFetching: true}
            };

            return {...state, ...user};
        }
        case USER_API_SUCCESS: {
            if(!action.response)
                return state;

            return {...state, ...{[action.name]: {...action.response, isFetching: false}}};
        }
        case USER_API_FAILURE: {
            return {...state, ...{[action.name]: { tags: [], isFetching: false}}};
        }
        default:
            return state;
    }
};

export default user;
