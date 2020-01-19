import React, {useEffect} from "react";
import * as selectors from "../selectors";
import * as actions from "../actions";
import {ENDPOINTS, METHODS} from "../api";
import {useDispatch, useSelector} from 'react-redux'

const UserContext = React.createContext(null);

const UserProvider = ({username, children}) => {
    const dispatch = useDispatch();
    const user = useSelector(selectors.getUser(username));
    const isFetching = useSelector(selectors.getUserIsFetching(username));
    const errorMessage = useSelector(selectors.getUserErrorMessage(username));

    const addTag = (tag) => {
        actions.addTagToUser(dispatch, {[username]: user}, tag);
    };

    useEffect(() => {
        if (!isFetching) {
            console.log(`%c FETCH USER: ${username}!`, 'font-size: 2em; font-weight: bold; color: blue');
            actions.fetch(dispatch, ENDPOINTS.USERS, METHODS.GET, username);
        }
    }, []);

    return (
        <UserContext.Provider value={{name: username, user, isFetching, errorMessage, addTag}}>
            {children}
        </UserContext.Provider>
    );
};

export {UserProvider, UserContext}
