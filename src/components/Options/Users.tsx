import * as React from "react";
import {useSetDocumentTitle} from "../../hooks/setDocumentTitle";
import {browser} from "webextension-polyfill-ts";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getAllUsers} from "../../slices/user";
import {RootState} from "../../app/rootReducer";
import TagList from "../TagList/TagList";
import {getSets} from "../../slices/sets";
import {User} from "../../api/storageAPI";


interface UserElementProps {
    name: string
}

const UserElement = ({name}: UserElementProps) => (
    <div className={'container-fluid'}>
        <div className={'row'}>
            <span className={'col-3'}>{name}</span>
            <div className={'col-7 lt-list'}>
                <TagList username={name}/>
            </div>
            <div className={'col-2'}>
                <button>Hi</button>
            </div>
        </div>
        <hr/>
    </div>
);

export const Users = () => {
    const dispatch = useDispatch();
    const {userRecord, loading, error} = useSelector((state: RootState) => state.user);

    useEffect(() => {
        console.log(`%cLoading All Users`, 'font-size: 1.5em; font-weight: bold; color: red');
        dispatch(getAllUsers());
        dispatch(getSets());
    }, [dispatch]);

    useSetDocumentTitle(browser.i18n.getMessage('users'), 'Litags');

    if (loading) {
        return (
            <>
                <h1 className={'h2'}>Users - Loading</h1>
                <hr/>
            </>
        );
    } else if (userRecord) {
        return (
            <>
                <h1 className={'h2'}>Users - Table</h1>
                <hr/>
                {Object.values(userRecord).map(record => <UserElement key={`lt-${record.user.name}`}
                                                                      name={record.user.name}/>)}
            </>
        );
    } else {
        return (
            <>
                <h1 className={'h2'}>Users - Not loading and no data</h1>
                <hr/>
            </>
        );
    }
};
