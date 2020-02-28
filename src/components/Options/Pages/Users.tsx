import * as React from "react";
import {useSetDocumentTitle} from "../../../hooks/setDocumentTitle";
import {useDispatch, useSelector} from "react-redux";
import {FormEvent, useCallback, useEffect, useState} from "react";
import {getAllUsers, deleteUser} from "../../../slices/user";
import {RootState} from "../../../app/rootReducer";
import TagList from "../../TagList/TagList";
import {getSets} from "../../../slices/sets";
import {User} from "../../../api/storageAPI";
import {i18n} from "../../../constants/i18n";
import {Container, Row, Col, Button, Modal, Spinner} from "react-bootstrap";

interface UserListElementProps {
    name: string
    onDeleteButtonClicked: (name: string) => () => void
}

interface UserListHeaderProps {
    count: number
    onInput: (e: FormEvent<HTMLInputElement>) => void
}

const UserListHeader = ({count, onInput}: UserListHeaderProps) => (
    <div className='border-bottom pb-1 pb-md-3'>
        <span className='text-muted'>
            {`${i18n.usersFound}: ${count}`}
        </span>
        <input type='search' className='form-control mt-2' autoCapitalize='off' autoComplete='off'
               spellCheck='false' placeholder={i18n.searchUsersPlaceHolder} onInput={onInput}/>
    </div>
);

const UserListElement = ({name, onDeleteButtonClicked}: UserListElementProps) => {
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    const showModal = () => setModalVisible(true);
    const hideModal = () => setModalVisible(false);
    return (
        <>
            <Container fluid={true}>
                <Row className='lt-user-row align-items-center border-bottom'>
                    <Col xs={3}>
                        <a href={`https://lichess.org/@/${name}`} target={'_blank'} rel={'noopener'}>{name}</a>
                    </Col>
                    <Col xs={7} className='lt-list align-items-baseline'>
                        <TagList username={name}/>
                    </Col>
                    <Col>
                        <Button variant='outline-danger' className='lt-delete-btn' onClick={showModal}>
                            {i18n.delete}
                        </Button>
                    </Col>
                </Row>
            </Container>
            <Modal show={modalVisible} onHide={hideModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{i18n.deleteUser}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {i18n.deleteUserConfirm.replace('%s', name)}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={hideModal}>
                        {i18n.cancel}
                    </Button>
                    <Button variant="danger" onClick={onDeleteButtonClicked(name)}>
                        {i18n.delete}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

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

    useEffect(() => {
        console.log(`%cLoading All Users`, 'font-size: 1.5em; font-weight: bold; color: red');
        dispatch(getAllUsers());
        dispatch(getSets());
    }, [dispatch]);

    useSetDocumentTitle(i18n.users, 'Litags');

    if (error) {
        console.error(error);
    } else if (loading) {
        return (
            <>
                <h1 className={'h2'}>
                    {i18n.users}
                </h1>
                <div className='d-flex justify-content-center py-2 py-md-4'>
                    <Spinner animation="border" variant="primary"/>
                </div>
            </>);
    } else if (userRecord) {
        return (
            <>
                <h1 className={'h2'}>{i18n.users}</h1>
                <UserList users={Object.values(userRecord).map(record => record.user)}/>
            </>
        );
    }

    return (<><h1 className={'h2'}>{i18n.users}</h1></>);
};
