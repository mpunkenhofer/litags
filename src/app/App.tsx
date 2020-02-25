import * as React from "react";
import * as ReactDOM from 'react-dom';
import TagList from "../components/TagList/TagList";
import TagChooser from "../components/TagChooser/TagChooser";
import {useEffect, useState} from "react";

interface Mount {
    username: string,
    mount: HTMLElement,
    keyboardShortcutsEnabled?: boolean
}

interface AppProps {
    mounts: Mount[]
}

const Container = ({username, mount, keyboardShortcutsEnabled}: Mount) => {
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

    return (
        <>
            {ReactDOM.createPortal(<TagList username={username}/>, listElement)}
            {ReactDOM.createPortal(<TagChooser username={username}
                                               keyboardShortcutsEnabled={keyboardShortcutsEnabled}/>, buttonElement)}
        </>
    );
};

export const App = ({mounts}: AppProps) => {
    return (
        <>
            {mounts.map(data => (<Container username={data.username} mount={data.mount}/>))}
        </>
    );
};
