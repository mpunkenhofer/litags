export const getTagIsFetching = (state) => state.tags.isFetching;
export const getOptionsIsFetching = (state) => state.options.isFetching;
export const getFrequentlyUsedIsFetching = (state) => state.frequently_used.isFetching;
export const getUserIsFetching = (username) => (state) => {
    return (username != undefined && state.user.hasOwnProperty(username)) ? state.user[username].isFetching : false;
};

export const getTagErrorMessage= (state) => state.tags.errorMessage;
export const getOptionsErrorMessage = (state) => state.options.errorMessage;
export const getFrequentlyUsedErrorMessage = (state) => state.frequently_used.errorMessage;
export const getUserErrorMessage = (username) => (state) => {
    return (username != undefined && state.user.hasOwnProperty(username)) ? state.user[username].errorMessage : null;
};

export const getUser = (username) => (state) => {
    return (username != undefined && state.hasOwnProperty(username)) ? state[username] : null;
};