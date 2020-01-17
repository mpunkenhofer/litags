import {useEffect} from "react";
import * as actions from "../actions";
import {ENDPOINTS} from "../api";
import {useDispatch, useSelector, useStore} from 'react-redux'
import * as selectors from "../selectors";

const SelectorsByEndpoint = {
    [ENDPOINTS.USERS]: {
        data: (arg) => selectors.getUser(arg),
        isFetching: (arg) => selectors.getUserIsFetching(arg),
        errorMessage: (arg) => selectors.getUserErrorMessage(arg),
    },
    [ENDPOINTS.TAGS]: {
        data: (arg) => selectors.getTags,
        isFetching: (arg) => selectors.getTagsIsFetching,
        errorMessage: (arg) => selectors.getTagsErrorMessage,
    },
    [ENDPOINTS.FREQUENTLY_USED]: {
        data: (arg) => selectors.getFrequentlyUsed,
        isFetching: (arg) => selectors.getFrequentlyUsedIsFetching,
        errorMessage: (arg) => selectors.getFrequentlyUsedErrorMessage,
    },
    [ENDPOINTS.OPTIONS]: {
        data: (arg) => selectors.getOptions,
        isFetching: (arg) => selectors.getOptionsIsFetching,
        errorMessage: (arg) => selectors.getOptionsErrorMessage,
    }
};

export const useApi = (endpoint, method, argument?) => {
    if (!(Object.keys(SelectorsByEndpoint).includes(endpoint)))
        throw Error(`Unknown endpoint: ${endpoint}`);

    const dispatch = useDispatch();
    const data = useSelector(SelectorsByEndpoint[endpoint].data(argument));
    const isFetching = useSelector(SelectorsByEndpoint[endpoint].isFetching(argument));
    const errorMessage = useSelector(SelectorsByEndpoint[endpoint].errorMessage(argument));

    // console.group(`useApi(endpoint: ${endpoint}, method: ${method}, argument: ${argument})`);
    // console.log('data', data);
    // console.log('isFetching', isFetching);
    // console.log('errorMessage', errorMessage);
    // console.log('state', useStore().getState());
    // console.groupEnd();

    useEffect(() => {
        actions.fetch(endpoint, method, argument)(dispatch, isFetching);
    }, []);

    return {data, isFetching, errorMessage};
};