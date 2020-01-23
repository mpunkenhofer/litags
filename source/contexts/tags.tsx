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

    const getFrequentlyUsed = (amount: number = 8) => {
        return tags
            .filter(tag => tag.frequency != 0)
            .sort((a, b) => (b.frequency - a.frequency))
            .splice(0, amount);
    };

    const search = (term: string) => {
        if (!term || term.length < 1)
            return [];

        term = term.toLowerCase();
        return tags.filter(tag =>
            tag.name.toLowerCase().includes(term)
            || tag.aliases.find(alias => alias.toLowerCase().includes(term))
        );
    };

    useEffect(() => {
        if(!isFetching) {
            console.log('%c FETCH TAGS!', 'font-size: 2em; font-weight: bold; color: red');
            actions.fetch(dispatch, ENDPOINTS.TAGS, METHODS.GET);
        }
    }, []);

    return (
        <TagContext.Provider value={{tags, isFetching, errorMessage, getFrequentlyUsed, search}}>
            {children}
        </TagContext.Provider>);
};

export {TagProvider, TagContext}
