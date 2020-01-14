export const isFetchingReducer = (request, success, failure) => ( state = false, action ) => {
    switch (action.type) {
        case request:
            return true;
        case success:
        case failure:
            return false;
        default:
            return state;
    }
};

export const errorMessageReducer = (request, success, failure) => ( state = null, action ) => {
    switch (action.type) {
        case failure:
            return action.message;
        case request:
        case success:
            return null;
        default:
            return state;
    }
};