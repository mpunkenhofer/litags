import * as React from "react";
import {useSetDocumentTitle} from "../../hooks/setDocumentTitle";
import {browser} from "webextension-polyfill-ts";
import BootstrapTable from 'react-bootstrap-table-next';
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {getAllUsers} from "../../slices/user";

export const Users = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        console.log(`%cLoading All Users`, 'font-size: 1.5em; font-weight: bold; color: red');
        dispatch(getAllUsers());
    }, [dispatch]);

    useSetDocumentTitle(browser.i18n.getMessage('users'), 'Litags');

    return (
        <>
            <h1 className={'h2'}>Users</h1>
            <hr/>
        </>
    );
};
