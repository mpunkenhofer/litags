import React, {useCallback, useMemo} from "react";
import {useApi} from "../hooks/useApi";

const UserContext = React.createContext(null);

const UserProvider = ({children, username}) => {
    const [{data, isLoading, errorMessage}] = useApi(`users/${username}`);

    return (
        <UserContext.Provider value={{user: data, isLoading, errorMessage}}>
            {children}
        </UserContext.Provider>);
};

export {UserProvider, UserContext}
