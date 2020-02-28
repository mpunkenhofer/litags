import * as React from "react";
import {useSetDocumentTitle} from "../../../hooks/setDocumentTitle";
import {i18n} from "../../../constants/i18n";

export const Settings = () => {
    useSetDocumentTitle(i18n.settings, 'Litags');

    return (
        <>
            <h1 className={'h2'}>Settings</h1>
            <hr/>
        </>
    );
};
