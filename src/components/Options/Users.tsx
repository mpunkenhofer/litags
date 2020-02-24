import * as React from "react";
import {useSetDocumentTitle} from "../../hooks/setDocumentTitle";
import {browser} from "webextension-polyfill-ts";

export const Users = () => {
    useSetDocumentTitle(browser.i18n.getMessage('users'), 'Litags');

    return (
        <h1>Users</h1>
    );
};
