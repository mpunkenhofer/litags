import * as selectors from "../selectors";
import { useDispatch, useSelector } from 'react-redux'
import {useEffect, useState} from "react";
import * as actions from "../actions";
import {ENDPOINTS} from "../api";

const SelectorsByEndpoint = {
    [ENDPOINTS.USERS]: {
        data: (arg) => selectors.getUser(arg),
        isFetching: (arg) => selectors.getUserIsFetching(arg),
        errorMessage: (arg) => selectors.getUserErrorMessage(arg)
    },
    [ENDPOINTS.TAGS]: {
        data: (arg) => selectors.getTags,
        isFetching: (arg) => selectors.getTagIsFetching,
        errorMessage: (arg) => selectors.getTagErrorMessage
    },
    [ENDPOINTS.FREQUENTLY_USED]: {
        data: (arg) => selectors.getFrequentlyUsed,
        isFetching: (arg) => selectors.getFrequentlyUsedIsFetching,
        errorMessage: (arg) => selectors.getFrequentlyUsedErrorMessage
    },
    [ENDPOINTS.OPTIONS]: {
        data: (arg) => selectors.getOptions,
        isFetching: (arg) => selectors.getOptionsIsFetching,
        errorMessage: (arg) => selectors.getOptionsErrorMessage
    }
};

export const useApi = (endpoint, method, argument=null) => {
    const [arg, setArg] = useState(argument);
    const dispatch = useDispatch();
    const data = useSelector(SelectorsByEndpoint[endpoint].data(arg));
    const isFetching = useSelector(SelectorsByEndpoint[endpoint].isFetching(arg));
    const errorMessage = useSelector(SelectorsByEndpoint[endpoint].errorMessage(arg));

    useEffect(() => {
        console.log(`useApi-effect: endpoint: ${endpoint}, method: ${method}, argument: ${argument}`);
        actions.fetch(endpoint, method, arg)(dispatch, isFetching);
    }, [arg]);

    return [{data, isFetching, errorMessage}, setArg]
};

