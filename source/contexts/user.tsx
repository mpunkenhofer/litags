import React, {useEffect} from "react";
import * as selectors from "../selectors";
import * as actions from "../actions";
import {useDispatch, useSelector} from 'react-redux'

const UserContext = React.createContext(null);

const UserProvider = ({username, children}) => {
    const dispatch = useDispatch();
    const user = useSelector(selectors.getUser(username));
    const isFetching = useSelector(selectors.getUserIsFetching(username));
    const errorMessage = useSelector(selectors.getUserErrorMessage(username));
    const frequentlyUsed = useSelector(selectors.getFrequentlyUsed);
    const isFetchingFrequentlyUsed = useSelector(selectors.getFrequentlyUsedIsFetching);

    const addTag = (tagID) => {
        actions.addTagToUser(dispatch, username, user, tagID);
        actions.updateFrequentlyUsed(dispatch, tagID, frequentlyUsed)
    };

    useEffect(() => {
        if (!isFetching) {
            console.log(`%c FETCH USER: ${username}!`, 'font-size: 2em; font-weight: bold; color: blue');
            actions.getUser(dispatch, username);
        }
        if(!isFetchingFrequentlyUsed) {
            console.log(`%c FETCH Frequently Used!`, 'font-size: 1.5em; font-weight: bold; color: blue');
            actions.getFrequentlyUsed(dispatch);
        }
    }, []);

    return (
        <UserContext.Provider value={{name: username, user, isFetching, errorMessage, addTag}}>
            {children}
        </UserContext.Provider>
    );
};

export {UserProvider, UserContext}
