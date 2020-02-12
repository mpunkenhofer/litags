import {useEffect, useReducer, useState} from "react";
import defaultSets from "../constants/sets";

const browser = require("webextension-polyfill");
const uuidv4 = require('uuid/v4');

const dataReducer = (state, action) => {
    switch (action.type) {
        case 'REQUEST':
            return {
                ...state,
                isLoading: true,
                errorMessage: null
            };
        case 'SUCCESS':
            return {
                ...state,
                isLoading: false,
                errorMessage: null,
                data: action.payload,
            };
        case 'FAILURE':
            return {
                ...state,
                isLoading: false,
                errorMessage: action.errorMessage,
            };
        default:
            throw new Error();
    }
};

export const useApi = (endpoint: string, argument=null) => {
    const [arg, setArg] = useState(argument);
    const [state, dispatch] = useReducer(dataReducer, {
        isLoading: false,
        errorMessage: null,
        data: null,
    });

    const route: string[] = endpoint.split('/');

    useEffect(() => {
        if(!state.isLoading && route.length > 0) {
            dispatch({type: 'REQUEST'});

            const fetch = async () => {
                try {
                    const data = (await browser.storage.local.get(route[0]))[route[0]];

                    console.group(`%cuseApi(endpoint: ${endpoint}, argument: ${JSON.stringify(arg)}`,
                        'font-size: 1.2em; font-weight: bold; color: aqua');
                    console.log('data:', data);
                    console.groupEnd();

                    if (data) {
                        if(arg) {
                            const updatedData = route.length > 1 ?
                                Object.assign({}, data, {[route[1]]: arg}) : arg;
                            console.log('updated data: ', updatedData);
                            await browser.storage.local.set({[route[0]]: updatedData});
                            dispatch({type: 'SUCCESS', payload: updatedData});
                        }
                        else {
                            dispatch({
                                type: 'SUCCESS',
                                payload: (route.length > 1 && data.hasOwnProperty(route[1])) ? data[route[1]] : data
                            });
                        }
                    } else {
                        switch (route[0]) {
                            case 'sets': {
                                const defaultSets = getDefaultSets();
                                console.log('default sets: ', defaultSets);
                                await browser.storage.local.set({['sets']: defaultSets});
                                dispatch({type: 'SUCCESS', payload: defaultSets});
                                break;
                            }
                            case 'users': {
                                if(route.length > 1) {
                                    dispatch({type: 'SUCCESS', payload: createUserData()});
                                } else {
                                    dispatch({type: 'FAILURE', errorMessage: 'Invalid user endpoint uri'});
                                }
                                break;
                            }
                            case 'frequentlyUsed': {
                                await browser.storage.local.set({['frequentlyUsed']: []});
                                dispatch({type: 'SUCCESS', payload: []});
                                break;
                            }
                            default: {
                                await browser.storage.local.set({[route[0]]: {}});
                                console.log(`No data at this endpoint: ${endpoint}`);
                                dispatch({type: 'SUCCESS', payload: null});
                            }
                        }
                    }
                } catch(error) {
                    dispatch({type: 'FAILURE', errorMessage: error})
                }
            };
            fetch().catch(err => console.error(err));
        }
    }, [arg]);

    return [state, setArg];
};

const createUserData = () => ({tags: []});

const createTag = (name, aliases, resource, color?) => {
    const tag = color != undefined ?
        {name, aliases, resource, color} :
        {name, aliases, resource};

    return {[uuidv4()]: tag}
};

const getDefaultSets = () => {
    let sets = {};

    for (const set of defaultSets) {
        const tags = Object.entries(set.tags).map(([name, [aliases, resource, color]]) =>
            Object.assign({},
                createTag(name, aliases, resource, (set.fontSet && color == undefined) ? '' : color)));


        sets = {...sets, [uuidv4()]: {...set, tags: tags}}
    }
    return sets;
};
