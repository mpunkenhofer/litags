import * as React from "react";
import {useSetDocumentTitle} from "../../../hooks/setDocumentTitle";
import {useDispatch, useSelector} from "react-redux";
import {FormEvent, useCallback, useEffect, useState} from "react";
import {getAllUsers, deleteUser} from "../../../slices/user";
import {RootState} from "../../../common/rootReducer";
import TagList from "../../TagList/TagList";
import {getSets} from "../../../slices/sets";
import {User} from "../../../types";
import {i18n} from "../../../constants/i18n";
import {Container, Row, Col, Button, Spinner} from "react-bootstrap";
import {ConfirmModal} from "../ConfirmModal";

interface UserListHeaderProps {
    count: number;
    onInput: (e: FormEvent<HTMLInputElement>) => void;
}

const UserListHeader: React.FunctionComponent<UserListHeaderProps> =
    ({count, onInput}: UserListHeaderProps) => {
    return (
        <>
            <Row className='pb-2 pb-md-4'>
                <span className='text-muted'>
                    {`${i18n.usersFound}: ${count}`}
                </span>
                <input type='search' className='form-control mt-2' autoCapitalize='off' autoComplete='off'
                    spellCheck='false' placeholder={i18n.searchUsersPlaceHolder} onInput={onInput}/>
            </Row>
            {
                (count > 0) &&
                <Row className='p-2 align-items-center border-top border-bottom'>
                    <Col xs={3}>
                        <strong>{i18n.name}</strong>
                    </Col>
                    <Col xs={7} className='lt-list align-items-baseline'>
                        <strong>{i18n.tags}</strong>
                    </Col>
                </Row>
            }
        </>
    );
}

interface UserListElementProps {
    name: string;
    onDeleteButtonClicked: (name: string) => () => void;
}

const UserListElement: React.FunctionComponent<UserListElementProps> =
    ({name, onDeleteButtonClicked}: UserListElementProps) => {
    const [showModal, setShowModal] = useState<boolean>(false);

    return (
        <>
            <Row className='lt-user-row align-items-center border-top p-1'>
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
        dispatch(getAllUsers()); // get refreshed user list after delete to trigger redraw
    }, [dispatch]);

    const displayUsers = (searchResults && searchResults.length > 0) ? searchResults : users;

    return (
        <div className='m-2 m-md-4'>
            <UserListHeader count={displayUsers.length} onInput={onInput}/>
            {
                displayUsers.map(user => <UserListElement key={`ul-${user.id}`} name={user.id}
                                                          onDeleteButtonClicked={onDeleteButtonClicked}/>)
            }
        </div>
    );
};

const UserSettingTitle: React.FunctionComponent = () => {
    return (
        <>
            <h1 className={'h2'}>{i18n.users}</h1>
            <p className={'py-2'}>{i18n.usersSettingDescription}</p>
        </>
    );
}

export const Users: React.FunctionComponent = () => {
    const dispatch = useDispatch();
    const {userRecord, loading, error} = useSelector((state: RootState) => state.user);

    useEffect(() => {
        dispatch(getAllUsers());
        dispatch(getSets());
    }, [dispatch]);

    useSetDocumentTitle(i18n.users, 'Litags');

    if (error) {
        console.error(error);
    } else if (loading) {
        return (
            <Container fluid={true}>
                <UserSettingTitle />
                <div className='d-flex justify-content-center py-2 py-md-4'>
                    <Spinner animation="border" variant="primary"/>
                </div>
            </Container>);
    } else if (userRecord) {
        return (
            <>
                <UserSettingTitle />
                <Container fluid={true} className={'bg-light border'}>
                    <UserList users={Object.values(userRecord).map(record => record.user)}/>
                </Container>
            </>
        );
    }

    return (<UserSettingTitle />);
};
