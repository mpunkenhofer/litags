import * as React from "react";
import {useSetDocumentTitle} from "../../hooks/setDocumentTitle";
import {browser} from "webextension-polyfill-ts";

export const Backup = () => {
    useSetDocumentTitle(browser.i18n.getMessage('backup'), 'Litags');

    return (
        <div><h1>Backup</h1></div>
    );
};
