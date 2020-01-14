import {getUserErrorMessage, getUserIsFetching} from "../selectors";
import { useDispatch, useSelector } from 'react-redux'
import {useEffect, useState} from "react";
import * as actions from "../actions";
import * as api from "../api";

export const useApi = (type, arg=null) => {
    const [argument, setArg] = useState(arg);
    const [data, setData] = useState({});
    const dispatch = useDispatch();
    const isFetching = useSelector(getUserIsFetching(arg));
    const errorMessage = useSelector(getUserErrorMessage(arg));

    useEffect(() => {
        if(!isFetching) {
            dispatch(actions.fetchUserRequest(argument));
            api.fetchUser(argument).then(
                response => dispatch(actions.fetchUserSuccess(argument, response)),
                error => dispatch(actions.fetchUserFailure(argument, error)));
            console.log('fetching...');
        } else {
            console.log('already fetching...');
        }
    }, [argument]);

    return [{data, isFetching, errorMessage}, setArg]
};

