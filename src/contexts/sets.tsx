import React, {useCallback, useMemo} from "react";
import {useApi} from "../hooks/useApi";

const SetContext = React.createContext(null);

const SetProvider = ({children}) => {
    const [{data, isLoading, errorMessage}] = useApi('sets');

    // const tags = useMemo(() => {
    //     let allTags = [];
    //
    //     for (const set of Object.values(data)) {
    //         if (set['enabled']) {
    //             allTags = [...allTags, ...set['tags']];
    //         }
    //     }
    //     return allTags;
    // }, [data]);
    //
    // const frequentlyUsed = useMemo((amount: number = 8) => {
    //     return [];
    //     // return tags
    //     //     .filter(tag => tag.frequency != 0)
    //     //     .sort((a, b) => (b.frequency - a.frequency))
    //     //     .splice(0, amount);
    // }, [tags]);
    //
    // const searchTags = useCallback((term: string) => {
    //     if (!term || term.length < 1)
    //         return [];
    //
    //     term = term.toLowerCase();
    //     return tags.filter(tagObj => Object.values(tagObj).length > 0 &&
    //         Object.values(tagObj)[0]['name'].toLowerCase().includes(term)
    //         || Object.values(tagObj)[0]['aliases'].find(alias => alias.toLowerCase().includes(term))
    //     );
    // }, [data]);
    //
    // const getTagByID = (id: string) => {
    //     return null;
    // };

    return (
        <SetContext.Provider value={{sets: data, isLoading, errorMessage, frequentlyUsed: [], searchTags: () => {}, getTagByID: () => {}}}>
            {children}
        </SetContext.Provider>);
};

export {SetProvider, SetContext}
