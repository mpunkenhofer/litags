import * as React from "react";
import {useSetDocumentTitle} from "../../hooks/setDocumentTitle";
import {browser} from "webextension-polyfill-ts";

export const Home = () => {
    useSetDocumentTitle(browser.i18n.getMessage('home'), 'Litags');

    return (
       <h1>Home</h1>
    );
};
