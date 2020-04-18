import * as React from "react";
import * as ReactDOM from 'react-dom';
import TagList from "../common/TagList";
import TagChooser from "./TagChooser";
import {useEffect, useState} from "react";
import {getUser} from "../common/slices/user";
import {useDispatch} from "react-redux";
import {getSets} from "../common/slices/sets";
import {getFrequentlyUsed} from "../common/slices/frequentlyUsed";
import {getOptions} from "../common/slices/options";

type Mount = {
    username: string | null;
    mount: HTMLElement | null;
    keyboardShortcutsEnabled?: boolean;
}

interface ContainerProps {
    username: string;
    mount: HTMLElement;
    keyboardShortcutsEnabled?: boolean;
}

const Container: React.FunctionComponent<ContainerProps> =
    ({username, mount, keyboardShortcutsEnabled}:
         ContainerProps) => {
        const dispatch = useDispatch();

        const [listElement] = useState(document.createElement('div'));
        const [buttonElement] = useState(document.createElement('div'));

        listElement.classList.add('lt-list');
        buttonElement.classList.add('lt-button');

        useEffect(() => {
            mount.appendChild(listElement);
            mount.appendChild(buttonElement);

            return (): void => {
                mount.removeChild(listElement);
                mount.removeChild(buttonElement);
            }
        }, [buttonElement, listElement, mount]);

        useEffect(() => {
            // console.log(`%cLoading User: ${username}`, 'font-size: 1.5em; font-weight: bold; color: red');
            dispatch(getUser(username));
        }, [username, dispatch]);

        return (
            <>
                {ReactDOM.createPortal(<TagList id={username}/>, listElement)}
                {ReactDOM.createPortal(<TagChooser id={username}
                                                   keyboardShortcutsEnabled={keyboardShortcutsEnabled}/>,
                    buttonElement)}
            </>
        );
    };

interface AppProps {
    mounts: Mount[];
}

export const App: React.FunctionComponent<AppProps> = ({mounts}: AppProps) => {
    const dispatch = useDispatch();

    useEffect(() => {
        // console.log(`%cLoading Sets and Freq Used`, 'font-size: 1.5em; font-weight: bold; color: red');
        dispatch(getSets());
        dispatch(getFrequentlyUsed());
        dispatch(getOptions());
    }, [dispatch]);

    return (
        <>
            {mounts.map(data => ((data && data.username && data.mount) &&
                <Container key={data.username} username={data.username} mount={data.mount}
                           keyboardShortcutsEnabled={data.keyboardShortcutsEnabled}/>))}
        </>
    );
};
