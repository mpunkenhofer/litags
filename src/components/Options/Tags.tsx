import * as React from "react";
import {useSetDocumentTitle} from "../../hooks/setDocumentTitle";
import {browser} from "webextension-polyfill-ts";

export const Tags = () => {
    useSetDocumentTitle(browser.i18n.getMessage('tags'), 'Litags');

    return (
        <h1>Tags</h1>
    );
};
