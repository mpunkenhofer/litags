import React, {useCallback, useEffect, useMemo} from "react";
import * as selectors from "../selectors";
import * as actions from "../actions";
import {ENDPOINTS, METHODS} from "../api";
import {useDispatch, useSelector} from 'react-redux'

const SetContext = React.createContext(null);

const SetProvider = ({children}) => {
    const dispatch = useDispatch();
    const sets = useSelector(selectors.getSets);
    const isFetching = useSelector(selectors.getSetsIsFetching);
    const errorMessage = useSelector(selectors.getSetsErrorMessage);
    const search = useCallback((t) => searchTags(t), [sets]);

    const tags = useMemo(() => {
        let allTags = [];

        if (sets) {
            for (const set of Object.values(sets))
                if (set['enabled']) {
                    allTags = [...allTags, ...set['tags']];
                }
        }
        return allTags;
    }, [sets]);

    const frequentlyUsed = useMemo((amount: number = 8) => {
        return [];
        // return tags
        //     .filter(tag => tag.frequency != 0)
        //     .sort((a, b) => (b.frequency - a.frequency))
        //     .splice(0, amount);
    }, [tags]);

    const searchTags = (term: string) => {
        if (!term || term.length < 1)
            return [];

        term = term.toLowerCase();
        return tags.filter(tagObj => Object.values(tagObj).length > 0 &&
            Object.values(tagObj)[0]['name'].toLowerCase().includes(term)
            || Object.values(tagObj)[0]['aliases'].find(alias => alias.toLowerCase().includes(term))
        );
    };

    const getTagByID = (id: string) => {
        return null;
    };

    useEffect(() => {
        if (!isFetching) {
            console.log('%c FETCH TAGS!', 'font-size: 2em; font-weight: bold; color: red');
            actions.fetch(dispatch, ENDPOINTS.SETS, METHODS.GET);
        }
    }, []);

    return (
        <SetContext.Provider value={{sets, isFetching, errorMessage, frequentlyUsed, search, getTagByID}}>
            {children}
        </SetContext.Provider>);
};

export {SetProvider, SetContext}
