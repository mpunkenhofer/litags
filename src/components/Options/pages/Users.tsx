import * as React from "react";
import {useSetDocumentTitle} from "../../../hooks/setDocumentTitle";
import {browser} from "webextension-polyfill-ts";
import {useDispatch, useSelector} from "react-redux";
import {FormEvent, useCallback, useEffect, useState} from "react";
import {getAllUsers, deleteUser} from "../../../slices/user";
import {RootState} from "../../../app/rootReducer";
import TagList from "../../TagList/TagList";
import {getSets} from "../../../slices/sets";
import {User} from "../../../api/storageAPI";
import {Spinner} from "./utils/Spinner";

interface UserListElementProps {
    name: string
    onDeleteButtonClicked: (name: string) => () => void
}

const UserListElement = ({name, onDeleteButtonClicked}: UserListElementProps) => (
    <div className={'container-fluid'}>
        <div className='lt-user-row row align-items-center border-bottom'>
            <div className={'col-3'}>
                <a href={`https://lichess.org/@/${name}`} target={'_blank'} rel={'noopener'}>{name}</a>
            </div>
            <div className={'col-7 lt-list'}>
                <TagList username={name}/>
            </div>
            <div className='col-auto'>
                <button type='button' className='lt-delete-btn btn btn-outline-danger'
                        onClick={onDeleteButtonClicked(name)}>
                    Delete
                </button>
            </div>
        </div>
    </div>
);

interface UserListHeaderProps {
    count: number
    onInput: (e: FormEvent<HTMLInputElement>) => void
}

const UserListHeader = ({count, onInput}: UserListHeaderProps) => (
    <div className='border-bottom pb-1 pb-md-3'>
        <span className='text-muted'>
            {`${browser.i18n.getMessage('usersFound')}: ${count}`}
        </span>
        <input type='text' className='form-control mt-1 mt-md-2'
               placeholder={browser.i18n.getMessage('searchUserPlaceholder')} onInput={onInput}/>
    </div>
);

interface UserListProps {
    users: User[]
}

const UserList = ({users}: UserListProps) => {
    const dispatch = useDispatch();
    const [searchResults, setSearchResults] = useState<User[]>([]);
    const searchUser = useCallback(term => {
        term = term.toLowerCase();
        return users.filter(user => user.name.toLowerCase().includes(term));
    }, [users]);

    const onInput = (e) => setSearchResults(searchUser((e.target as HTMLInputElement).value));
    const onDeleteButtonClicked = (name: string) => () => {
        dispatch(deleteUser(name));
    };

    const displayUsers = (searchResults && searchResults.length > 0) ? searchResults : users;

    return (
        <>
            <UserListHeader count={displayUsers.length} onInput={onInput}/>
            {
                displayUsers.map(user => <UserListElement key={`ul-${user.name}`} name={user.name}
                                                          onDeleteButtonClicked={onDeleteButtonClicked}/>)
            }
        </>
    );
};

export const Users = () => {
    const dispatch = useDispatch();
    const {userRecord, loading, error} = useSelector((state: RootState) => state.user);
    const users_i18n = browser.i18n.getMessage('users');

    useEffect(() => {
        console.log(`%cLoading All Users`, 'font-size: 1.5em; font-weight: bold; color: red');
        dispatch(getAllUsers());
        dispatch(getSets());
    }, [dispatch]);

    useSetDocumentTitle(users_i18n, 'Litags');

    if (error) {
        console.error(error);
    } else if (loading) {
        return (<><h1 className={'h2'}>{users_i18n}</h1><Spinner/></>);
    } else if (userRecord) {
        return (
            <>
                <h1 className={'h2'}>{users_i18n}</h1>
                <UserList users={Object.values(userRecord).map(record => record.user)}/>
            </>
        );
    }

    return (<><h1 className={'h2'}>{users_i18n}</h1>
        <hr/>
    </>);
};
