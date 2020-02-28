import * as React from "react";
import {useSetDocumentTitle} from "../../../hooks/setDocumentTitle";
import {i18n} from "../../../constants/i18n";

export const Tags = () => {
    useSetDocumentTitle(i18n.tags, 'Litags');

    return (
        <>
            <h1 className={'h2'}>Tags</h1>
            <hr/>
        </>
    );
};
