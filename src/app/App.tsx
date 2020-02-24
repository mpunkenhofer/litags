import * as React from "react";
import * as ReactDOM from 'react-dom';
import TagList from "../components/TagList/TagList";
import TagChooser from "../components/TagChooser/TagChooser";

interface AppData {
    username: string;
    anchor: HTMLElement
}

interface AppProps {
    anchors: AppData[]
}

export const App = ({anchors}: AppProps) => {
    return (
        <>
            {anchors.map(data => {
                ReactDOM.createPortal(<TagList username={data.username}/>, data.anchor);
                ReactDOM.createPortal(<TagChooser username={data.username}/>, data.anchor);
            })}
        </>
    );
};
