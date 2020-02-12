import React, {useCallback, useMemo} from "react";
import {useApi} from "../hooks/useApi";

const UserContext = React.createContext(null);

const UserProvider = ({children, username}) => {
    const [{data, isLoading, errorMessage}, setArg] = useApi(`users/${username}`);

    const addTag = useCallback(id => {
        console.log('TODO', id);
        console.log(data);
        const updatedData = {...data, tags: [...data.tags, id]};
        console.log(updatedData);
        setArg(updatedData);
    }, [data]);

    return (
        <UserContext.Provider value={{user: data, isLoading, errorMessage, addTag}}>
            {children}
        </UserContext.Provider>);
};

export {UserProvider, UserContext}
