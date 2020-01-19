export const getTagsIsFetching = (state) => state.tags.isFetching;
export const getOptionsIsFetching = (state) => state.options.isFetching;
export const getUserIsFetching = (username) => (state) => {
    return (username != undefined && state.user.hasOwnProperty(username)) ? state.user[username].isFetching : false;
};

export const getTagsErrorMessage = (state) => state.tags.errorMessage;
export const getOptionsErrorMessage = (state) => state.options.errorMessage;
export const getUserErrorMessage = (username) => (state) => {
    return (username != undefined && state.user.hasOwnProperty(username)) ? state.user[username].errorMessage : null;
};

export const getUser = (username) => (state) => {
    return (username != undefined && state.user.hasOwnProperty(username)) ? state.user[username] : null;
};
export const getTags = (state) => state.tags.tags;
export const getOptions = (state) => state.options.options;
