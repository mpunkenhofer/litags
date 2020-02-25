import * as React from "react";
import * as ReactDOM from 'react-dom';
import TagList from "../components/TagList/TagList";
import TagChooser from "../components/TagChooser/TagChooser";
import {useEffect, useState} from "react";
import {getUser} from "../slices/user";
import {useDispatch} from "react-redux";
import {getSets} from "../slices/sets";
import {getFrequentlyUsed} from "../slices/frequentlyUsed";

interface Mount {
    username: string,
    mount: HTMLElement,
    keyboardShortcutsEnabled?: boolean
}

interface AppProps {
    mounts: Mount[]
}

const Container = ({username, mount, keyboardShortcutsEnabled}: Mount) => {
    const dispatch = useDispatch();

    const [listElement] = useState(document.createElement('div'));
    const [buttonElement] = useState(document.createElement('div'));

    listElement.classList.add('lt-list');
    buttonElement.classList.add('lt-button');

    useEffect(() => {
        mount.appendChild(listElement);
        mount.appendChild(buttonElement);

        return () => {
            mount.removeChild(listElement);
            mount.removeChild(buttonElement);
        }
    }, []);

    useEffect(() => {
        console.log(`%cLoading User: ${username}`, 'font-size: 1.5em; font-weight: bold; color: red');
        dispatch(getUser(username));
    }, [username, dispatch]);

    return (
        <>
            {ReactDOM.createPortal(<TagList username={username}/>, listElement)}
            {ReactDOM.createPortal(<TagChooser username={username}
                                               keyboardShortcutsEnabled={keyboardShortcutsEnabled}/>, buttonElement)}
        </>
    );
};

export const App = ({mounts}: AppProps) => {
    const dispatch = useDispatch();

    useEffect(() => {
        console.log(`%cLoading Sets and Freq Used`, 'font-size: 1.5em; font-weight: bold; color: red');
        dispatch(getSets());
        dispatch(getFrequentlyUsed());
    }, [dispatch]);

    return (
        <>
            {mounts.map(data => (<Container key={data.username} username={data.username} mount={data.mount}/>))}
        </>
    );
};
