import * as React from "react";
import {useSetDocumentTitle} from "../../common/hooks/setDocumentTitle";
import {useDispatch, useSelector} from "react-redux";
import {FormEvent, useCallback, useEffect, useState} from "react";
import {getAllUsers, deleteUser} from "../../common/slices/user";
import {RootState} from "../../common/rootReducer";
import TagList from "../../common/TagList";
import {getSets} from "../../common/slices/sets";
import {User} from "../../common/types";
import {i18n} from "../../constants/i18n";
import {Container, Row, Col, Button, Spinner} from "react-bootstrap";
import {ConfirmModal} from "../ConfirmModal";

interface UserListHeaderProps {
    count: number;
    onInput: (e: FormEvent<HTMLInputElement>) => void;
}

const UserListHeader: React.FunctionComponent<UserListHeaderProps> =
    ({count, onInput}: UserListHeaderProps) => (
    <div className='border-bottom pb-1 pb-md-3'>
        <span className='text-muted'>
            {`${i18n.usersFound}: ${count}`}
        </span>
        <input type='search' className='form-control mt-2' autoCapitalize='off' autoComplete='off'
               spellCheck='false' placeholder={i18n.searchUsersPlaceHolder} onInput={onInput}/>
    </div>
);

interface UserListElementProps {
    name: string;
    onDeleteButtonClicked: (name: string) => () => void;
}

const UserListElement: React.FunctionComponent<UserListElementProps> =
    ({name, onDeleteButtonClicked}: UserListElementProps) => {
    const [showModal, setShowModal] = useState<boolean>(false);

    return (
        <>
            <Container fluid={true}>
                <Row className='lt-user-row align-items-center border-bottom'>
                    <Col xs={3}>
                        <a href={`https://lichess.org/@/${name}`} target={'_blank'} rel={'noopener noreferrer'}>
                            {name}
                        </a>
                    </Col>
                    <Col xs={7} className='lt-list align-items-baseline'>
                        <TagList id={name}/>
                    </Col>
                    <Col>
                        <Button variant='outline-danger' className='lt-delete-btn'
                                onClick={(): void => setShowModal(true)}>
                            {i18n.delete}
                        </Button>
                    </Col>
                </Row>
            </Container>
            <ConfirmModal show={showModal} onCancel={(): void => setShowModal(false)}
                          onConfirm={(): void => {
                              setShowModal(false);
                              onDeleteButtonClicked(name)();
                          }}
                          variant={'danger'} title={i18n.deleteUser} confirm={i18n.delete}
                          body={i18n.deleteUserConfirm.replace('%s', name)} />
        </>
    );
};

interface UserListProps {
    users: User[];
}

const UserList: React.FunctionComponent<UserListProps> = ({users}: UserListProps) => {
    const dispatch = useDispatch();
    const [searchResults, setSearchResults] = useState<User[]>([]);

    const searchUser = useCallback(term => {
        term = term.toLowerCase();
        return users.filter(user => user.id.toLowerCase().includes(term));
    }, [users]);

    const onInput = (e: FormEvent<HTMLInputElement>): void =>
        setSearchResults(searchUser((e.target as HTMLInputElement).value));

    const onDeleteButtonClicked = useCallback((name: string) => (): void => {
        dispatch(deleteUser(name));
    }, [dispatch]);

    const displayUsers = (searchResults && searchResults.length > 0) ? searchResults : users;

    return (
        <>
            <UserListHeader count={displayUsers.length} onInput={onInput}/>
            {
                displayUsers.map(user => <UserListElement key={`ul-${user.id}`} name={user.id}
                                                          onDeleteButtonClicked={onDeleteButtonClicked}/>)
            }
        </>
    );
};

export const Users: React.FunctionComponent = () => {
    const dispatch = useDispatch();
    const {userRecord, loading, error} = useSelector((state: RootState) => state.user);

    useEffect(() => {
        //console.log(`%cLoading All Users`, 'font-size: 1.5em; font-weight: bold; color: red');
        dispatch(getAllUsers());
        dispatch(getSets());
    }, [dispatch]);

    useSetDocumentTitle(i18n.users, 'Litags');

    if (error) {
        console.error(error);
    } else if (loading) {
        return (
            <>
                <h1 className={'h2 pb-2 pb-md-4'}>
                    {i18n.users}
                </h1>
                <div className='d-flex justify-content-center py-2 py-md-4'>
                    <Spinner animation="border" variant="primary"/>
                </div>
            </>);
    } else if (userRecord) {
        return (
            <>
                <h1 className={'h2 pb-2 pb-md-4'}>{i18n.users}</h1>
                <UserList users={Object.values(userRecord).map(record => record.user)}/>
            </>
        );
    }

    return (<><h1 className={'h2'}>{i18n.users}</h1></>);
};
