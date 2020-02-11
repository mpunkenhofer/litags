import React, {useEffect} from "react";
import * as selectors from "../selectors";
import * as actions from "../actions";
import {useDispatch, useSelector} from 'react-redux'

const OptionsContext = React.createContext(null);

const OptionsProvider = ({children}) => {
    const dispatch = useDispatch();
    const options = useSelector(selectors.getOptions);
    const isFetching = useSelector(selectors.getOptionsIsFetching);
    const errorMessage = useSelector(selectors.getOptionsErrorMessage);

    useEffect(() => {
        if (!isFetching) {
            console.log('%c FETCH OPTIONS!', 'font-size: 2em; font-weight: bold; color: green');
            actions.getOptions(dispatch);
        }
    }, []);

    return (
        <OptionsContext.Provider value={{options, isFetching, errorMessage}}>
            {children}
        </OptionsContext.Provider>
    );
};

export {OptionsProvider, OptionsContext}
