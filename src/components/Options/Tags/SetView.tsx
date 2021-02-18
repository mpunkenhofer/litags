import * as React from "react";
import { Set, Tag } from "../../../types";
import TagButton from "../../TagButton";
import { useCallback, useState, useEffect } from "react";
import { TagView } from "./TagView";
import { Col, Row, Button } from "react-bootstrap";
import { i18n } from "../../../constants/i18n"
import { ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { addTag, updateIconUrl, updateSetName, deleteTag, deleteSet, setSets } from "../../../slices/sets";
import { ConfirmModal } from "../ConfirmModal";
import { useHistory } from "react-router-dom";
import { generateID } from "../../../common/id";
import { ImageUpload } from "./ImageUpload";

interface TagContainerProps {
    tags: Tag[];
    onTagClicked: (tag: Tag) => () => void;
}

const TagContainer: React.FunctionComponent<TagContainerProps> = ({ tags, onTagClicked }: TagContainerProps) => {
    if (tags && tags.length > 0) {
        return (
            <div className='p-2 d-flex flex-wrap border rounded-lg justify-content-around bg-light'>
                {
                    tags.map(tag => <TagButton key={tag.id} tag={tag} onClick={onTagClicked(tag)} />)
                }
            </div>
        );
    } else return null;
};

interface SetDisplayProps {
    set: Set;
    onError: (msg: string) => void;
}


export const SetView: React.FunctionComponent<SetDisplayProps> = ({ set, onError }: SetDisplayProps) => {
    const dispatch = useDispatch();
    const [showDeleteTagModal, setShowDeleteTagModal] = useState(false);
    const [showDeleteSetModal, setShowDeleteSetModal] = useState(false);
    const [selectedTag, setSelectedTag] = useState<Tag | null>((set && set.tags && set.tags.length > 0) ?
        set.tags[0] : null);
    const [addedTagId, setAddedTagId] = useState<string | null>(null);

    useEffect(() => {
        if (addedTagId !== null) {
            const addedTag = set.tags.find(tag => tag.id === addedTagId);
            if (addedTag) {
                setSelectedTag(addedTag);
            }
            setAddedTagId(null);
        }
    }, [set, addedTagId]);

    const history = useHistory();

    const onTagButtonClick = (tag: Tag) => (): void => {
        setSelectedTag(tag);
    };

    const setIconUrl = useCallback((url: string): void => {
        dispatch(updateIconUrl(set.id, url));
        dispatch(setSets());
    }, [dispatch, set]);

    const onChangeIconUrl = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
        if (event && event.target && event.target.value !== undefined) {
            setIconUrl(event.target.value);
        }
    }, [setIconUrl]);

    const onChangeSetName = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
        if (event && event.target && event.target.value !== undefined) {
            dispatch(updateSetName(set.id, event.target.value));
            dispatch(setSets());
        }
    }, [dispatch, set]);

    const onDeleteSelectedTagClicked = useCallback((): void => {
        if (selectedTag) {
            dispatch(deleteTag({ setId: set.id, tagId: selectedTag.id }));
            dispatch(setSets());
        }
        setSelectedTag(null);
    }, [dispatch, set, selectedTag]);

    const onDeleteSetClicked = useCallback((): void => {
        dispatch(deleteSet(set.id));
        dispatch(setSets());
        history.push('/');
    }, [dispatch, set, history]);

    const onAddTagClicked = useCallback((): void => {
        const tagId = generateID();

        dispatch(addTag(set.id, i18n.newTag, tagId));
        dispatch(setSets());

        setAddedTagId(tagId);
    }, [dispatch, set]);

    return (
        <>
            <Row className='py-2 py-md-4 py-lg-5'>
                <Col xs={6} className='d-flex justify-content-center align-items-center'>
                    <div className='bg-primary text-center'
                        style={{ width: '8rem', height: '8rem', borderRadius: '50%' }}>
                        {
                            set.iconUrl && set.iconUrl.length > 0 ?
                                <img src={set.iconUrl} alt={'Set Icon'}
                                    style={{ width: '4rem', height: '4rem', marginTop: '2rem' }} /> :
                                (
                                    <div style={{ marginTop: '3rem' }}>
                                        <strong className='text-white'>{i18n.noIcon}</strong>
                                    </div>
                                )
                        }
                    </div>
                </Col>
                <Col className={'pr-2'} xs={6}>
                    <div className='d-flex pb-2'>
                        <div>
                            <strong className='text-muted pb-2'>{i18n.setName}</strong>
                            <input type='text' className='form-control' value={set.name} placeholder={i18n.setName}
                                onChange={onChangeSetName} />
                        </div>
                    </div>
                    <div className={'d-flex flex-column flex-xl-row'}>
                        <div className={'flex-grow-1 mr-xl-4'}>
                            <strong className='text-muted pb-2'>{i18n.setIconURL}</strong>
                            <input type='text' className='form-control' value={set.iconUrl} placeholder={i18n.setIconURL}
                                onChange={onChangeIconUrl} />
                        </div>
                        <div className={'mt-2 mt-xl-auto ml-0 ml-xl-auto text-nowrap'}>
                            <ImageUpload onUploadSuccess={setIconUrl} onUploadError={onError} />
                        </div>
                    </div>
                </Col>
            </Row>
            {
                selectedTag &&
                <Row className='px-2 my-2 pt-2 pt-md-4'>
                    <TagView tag={selectedTag} onError={onError} />
                </Row>
            }
            <Row>
                <TagContainer tags={set.tags} onTagClicked={onTagButtonClick} />
            </Row>
            <Row className='py-3'>
                <Button variant='danger' className='' onClick={(): void => setShowDeleteSetModal(true)}>
                    {i18n.deleteSet}
                </Button>
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
                </div>
            </Row>
            <ConfirmModal show={showDeleteSetModal} onCancel={(): void => setShowDeleteSetModal(false)}
                onConfirm={(): void => {
                    setShowDeleteSetModal(false);
                    onDeleteSetClicked();
                }}
                variant='danger' title={i18n.deleteSet}
                body={i18n.deleteSetConfirm.replace('%s', set.name)}
                confirm={i18n.delete} />
            <ConfirmModal show={showDeleteTagModal} onCancel={(): void => setShowDeleteTagModal(false)}
                onConfirm={(): void => {
                    setShowDeleteTagModal(false);
                    onDeleteSelectedTagClicked();
                }}
                variant='danger' title={i18n.deleteSelectedTag}
                body={i18n.deleteTagConfirm.replace('%s',
                    selectedTag ? selectedTag.name : 'null')}
                confirm={i18n.delete} />
        </>
    );
};

SetView.defaultProps = {
    onError: (msg: string): void => console.error(msg),
}