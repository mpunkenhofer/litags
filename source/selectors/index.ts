export const getSetsIsFetching = (state) => state.sets.isFetching;
export const getOptionsIsFetching = (state) => state.options.isFetching;
export const getUserIsFetching = (username) => (state) => {
    return (username != undefined && state.user.hasOwnProperty(username)) ? state.user[username].isFetching : false;
};

export const getSetsErrorMessage = (state) => state.sets.errorMessage;
export const getOptionsErrorMessage = (state) => state.options.errorMessage;
export const getUserErrorMessage = (username) => (state) => {
    return (username != undefined && state.user.hasOwnProperty(username)) ? state.user[username].errorMessage : null;
};

export const getUser = (username) => (state) => {
    return (username != undefined && state.user.hasOwnProperty(username)) ? state.user[username] : null;
};
export const getSets = (state) => state.sets.sets;
export const getOptions = (state) => state.options.options;
