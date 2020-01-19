import React, {useEffect} from "react";
import * as selectors from "../selectors";
import * as actions from "../actions";
import {ENDPOINTS, METHODS} from "../api";
import {useDispatch, useSelector} from 'react-redux'

const TagContext = React.createContext(null);

const TagProvider = ({children}) => {
    const dispatch = useDispatch();
    const tags = useSelector(selectors.getTags);
    const isFetching = useSelector(selectors.getTagsIsFetching);
    const errorMessage = useSelector(selectors.getTagsErrorMessage);

    useEffect(() => {
        if(!isFetching) {
            console.log('%c FETCH TAGS!', 'font-size: 2em; font-weight: bold; color: red');
            actions.fetch(dispatch, ENDPOINTS.TAGS, METHODS.GET);
        }
    }, []);

    return (
        <TagContext.Provider value={{tags, isFetching, errorMessage}}>
            {children}
        </TagContext.Provider>);
};

export {TagProvider, TagContext}
