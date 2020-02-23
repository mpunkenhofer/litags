import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {useEffect} from "react";
import {Provider, useDispatch} from "react-redux";
import {getOptions} from "./slices/options";
import store from "./app/store";
import {Navbar} from "./components/Options/Navbar";
import {MainSection} from "./components/Options/MainSection";

const Options = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getOptions());
    });

    return (
        <>
            <Navbar/>
            <MainSection/>
        </>
    );
};

ReactDOM.render(
    <Provider store={store}>
        <Options/>
    </Provider>,
    document.getElementById('root') as HTMLElement);
