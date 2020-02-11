export const getSetsIsFetching = (state) => state.sets.isFetching;
export const getOptionsIsFetching = (state) => state.options.isFetching;
export const getUserIsFetching = (username) => (state) => {
    return (username != undefined && state.user.hasOwnProperty(username)) ? state.user[username].isFetching : false;
};
export const getFrequentlyUsedIsFetching = (state) => state.frequentlyUsed.isFetching;

export const getSetsErrorMessage = (state) => state.sets.errorMessage;
export const getOptionsErrorMessage = (state) => state.options.errorMessage;
export const getUserErrorMessage = (username) => (state) => {
    return (username != undefined && state.user.hasOwnProperty(username)) ? state.user[username].errorMessage : null;
};
export const getFrequentlyUsedErrorMessage = (state) => state.frequentlyUsed.errorMessage;

export const getUser = (username) => (state) => {
    return (username != undefined && state.user.hasOwnProperty(username)) ? state.user[username] : null;
};
export const getSets = (state) => state.sets.sets;
export const getOptions = (state) => state.options.options;
export const getFrequentlyUsed = (state) => state.frequentlyUsed.frequentlyUsed;

export const getTagByID = (id) => (state) => {
  for(const set of state.sets.sets) {
      if(set.hasOwnProperty(id))
          return set[id];
  }

  return null;
};
