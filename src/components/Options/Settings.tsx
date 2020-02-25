import * as React from "react";
import {useSetDocumentTitle} from "../../hooks/setDocumentTitle";
import {browser} from "webextension-polyfill-ts";

export const Settings = () => {
    useSetDocumentTitle(browser.i18n.getMessage('settings'), 'Litags');

    return (
        <>
            <h1 className={'h2'}>Settings</h1>
            <hr/>
        </>
    );
};
