import * as React from "react";
import {useSetDocumentTitle} from "../../../hooks/setDocumentTitle";
import {i18n} from "../../../constants/i18n";

export const Home = () => {
    useSetDocumentTitle(i18n.home, 'Litags');

    return (
        <>
            <h1 className={'h2'}>Home</h1>
            <hr/>
        </>
    );
};
