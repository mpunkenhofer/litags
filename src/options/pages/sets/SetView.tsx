import * as React from "react";
import {Set, Tag} from "../../../common/types";
import TagButton from "../../../common/TagButton";
import {useCallback, useState} from "react";
import {TagView} from "./TagView";
import {Container, Col, Row, Button} from "react-bootstrap";
import {i18n} from "../../../constants/i18n";
import {ChangeEvent} from "react";
import {useDispatch} from "react-redux";
import {addTag, updateIconUrl, updateSetName, deleteTag, deleteSet, postSets} from "../../../common/slices/sets";
import {ConfirmModal} from "../../ConfirmModal";
import {useHistory} from "react-router-dom";


interface TagContainerProps {
    tags: Tag[];
    onTagClicked: (tag: Tag) => () => void;
}

const TagContainer: React.FunctionComponent<TagContainerProps> = ({tags, onTagClicked}: TagContainerProps) => {
    if (tags && tags.length > 0) {
        return (
            <div className='p-2 d-flex flex-wrap border rounded-lg justify-content-around bg-light'>
                {
                    tags.map(tag => (tag && tag.id) &&
                        <TagButton key={tag.id} tag={tag} onClick={onTagClicked(tag)}/>)
                }
            </div>
        );
    } else return null;
};

interface SetDisplayProps {
    set: Set;
}


export const SetView: React.FunctionComponent<SetDisplayProps> = ({set}: SetDisplayProps) => {
    /*TODO:
        - Font Sets (link to font files (support for font files must also be implemented in Tag.tsx to correctly
        display them)
        - Enable/Disable Sets
     */
    const dispatch = useDispatch();
    const [showDeleteTagModal, setShowDeleteTagModal] = useState(false);
    const [showDeleteSetModal, setShowDeleteSetModal] = useState(false);
    const [selectedTag, setSelectedTag] = useState<Tag | null>((set && set.tags && set.tags.length > 0) ?
        set.tags[0] : null);

    const history = useHistory();

    const onTagButtonClick = (tag: Tag) => (): void => {
        setSelectedTag(tag);
    };

    const onChangeSetName = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
        if (event && event.target && event.target.value !== undefined) {
            dispatch(updateSetName(set.id, event.target.value));
            dispatch(postSets());
        }
    }, [dispatch, set]);

    const onChangeIconUrl = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
        if (event && event.target && event.target.value !== undefined) {
            dispatch(updateIconUrl(set.id, event.target.value));
            dispatch(postSets());
        }
    }, [dispatch, set]);

    const onDeleteSelectedTagClicked = useCallback((): void => {
        if (selectedTag) {
            dispatch(deleteTag({setId: set.id, tagId: selectedTag.id}));
            dispatch(postSets());
        }
        setSelectedTag(null);
    }, [dispatch, set, selectedTag]);

    const onDeleteSetClicked = useCallback((): void => {
        dispatch(deleteSet(set.id));
        dispatch(postSets());
        history.push('/');
    }, [dispatch, set, history]);

    const onAddTagClicked = useCallback((): void => {
        dispatch(addTag(set.id, i18n.newTag));
        dispatch(postSets());
    }, [dispatch, set]);

    return (
        <>
            <Container fluid={true}>
                <Row className='pb-2 pb-md-4'>
                    <Col xs={6} className='d-flex justify-content-center align-items-center'>
                        <div className='bg-primary text-center'
                             style={{width: '8rem', height: '8rem', borderRadius: '50%'}}>
                            {
                                set.iconUrl && set.iconUrl.length > 0 ?
                                    <img src={set.iconUrl} alt={'Set Icon'}
                                         style={{width: '4rem', height: '4rem', marginTop: '2rem'}}/> :
                                    (
                                        <div style={{marginTop: '3rem'}}>
                                            <strong className='text-white'>{i18n.noIcon}</strong>
                                        </div>
                                    )
                            }
                        </div>
                    </Col>
                    <Col xs={6}>
                        <Row className='pb-2'>
                            <strong className='text-muted pb-2'>{i18n.setName}</strong>
                            <input type='text' className='form-control' value={set.name} placeholder={i18n.setName}
                                   onChange={onChangeSetName}/>
                        </Row>
                        <Row>
                            <strong className='text-muted pb-2'>{i18n.setIconURL}</strong>
                            <input type='text' className='form-control' value={set.iconUrl}
                                   placeholder={i18n.setIconURL}
                                   onChange={onChangeIconUrl}/>
                        </Row>
                    </Col>
                </Row>
                {
                    selectedTag &&
                    <Row className='py-3 my-2'>
                        <TagView tag={selectedTag}/>
                    </Row>
                }
                <Row>
                    <TagContainer tags={set.tags} onTagClicked={onTagButtonClick}/>
                </Row>
                <Row className='py-3'>
                    <div className='d-flex ml-auto'>
                        <Button variant='outline-primary' className='mr-2 mr-md-3' onClick={onAddTagClicked}>
                            {i18n.addTag}
                        </Button>
                        {
                            (selectedTag != null) &&
                            <Button variant='outline-danger' className='mr-2 mr-md-3'
                                    onClick={(): void => setShowDeleteTagModal(true)}>
                                {i18n.deleteSelectedTag}
                            </Button>
                        }
                        <Button variant='outline-danger' className='' onClick={(): void => setShowDeleteSetModal(true)}>
                            {i18n.deleteSet}
                        </Button>
                    </div>
                </Row>
            </Container>
            <ConfirmModal show={showDeleteSetModal} onCancel={(): void => setShowDeleteSetModal(false)}
                          onConfirm={(): void => {
                              setShowDeleteSetModal(false);
                              onDeleteSetClicked();
                          }}
                          variant='danger' title={i18n.deleteSet}
                          body={i18n.deleteSetConfirm.replace('%s', set.name)}
                          confirm={i18n.delete}/>
            <ConfirmModal show={showDeleteTagModal} onCancel={(): void => setShowDeleteTagModal(false)}
                          onConfirm={(): void => {
                              setShowDeleteTagModal(false);
                              onDeleteSelectedTagClicked();
                          }}
                          variant='danger' title={i18n.deleteSelectedTag}
                          body={i18n.deleteTagConfirm.replace('%s',
                              selectedTag ? selectedTag.name : 'null')}
                          confirm={i18n.delete}/>
        </>
    );
};
