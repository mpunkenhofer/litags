import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import store from "./app/store";
import {Navbar} from "./components/Options/Navbar";
import {Main} from "./components/Options/Main";
import {enableStorageApiLogger} from "./api/storageAPI";

console.log('LiTags is open source! https://github.com/mpunkenhofer/litags');

if (process.env.NODE_ENV === "development") {
    enableStorageApiLogger();
}

const Options: React.FunctionComponent = () => (
    <>
        <Navbar/>
        <Main/>
    </>
);

ReactDOM.render(
    <Provider store={store}>
        <Options/>
    </Provider>,
    document.getElementById('root') as HTMLElement
);
