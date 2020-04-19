import * as React from "react";
import { useSetDocumentTitle } from "../../../common/hooks/setDocumentTitle";
import { i18n } from "../../../constants/i18n";
import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../common/rootReducer";
import { getFrequentlyUsed, removeFrequentlyUsed } from "../../../common/slices/frequentlyUsed";
import { Tag as TagType, FrequentlyUsed as FrequentlyUsedType } from "../../../common/types";
import TagButton from "../../../common/TagButton";
import { Spinner, Container, Row, Button } from "react-bootstrap";
import Tag from "../../../common/Tag";

interface FrequentlyUsedContainerProps {
    frequentlyUsed: FrequentlyUsedType[];
    onTagClicked: (tag: TagType) => () => void;
}

const FrequentlyUsedContainer: React.FunctionComponent<FrequentlyUsedContainerProps> = ({ frequentlyUsed, onTagClicked }: FrequentlyUsedContainerProps) => {
    if (frequentlyUsed && frequentlyUsed.length > 0) {
        return (
            <div className='p-2 d-flex flex-wrap border rounded-lg justify-content-around bg-light'>
                {
                    frequentlyUsed.map(freqUsed => <TagButton key={freqUsed.tag.id} tag={freqUsed.tag} onClick={onTagClicked(freqUsed.tag)} />)
                }
            </div>
        );
    } else return null;
};

export const FrequentlyUsed: React.FunctionComponent = () => {
    const dispatch = useDispatch();
    const { frequentlyUsed, loading } = useSelector((state: RootState) => state.frequentlyUsed);
    const [selectedTag, setSelectedTag] = useState<TagType | null>(null);

    useEffect(() => {
        dispatch(getFrequentlyUsed());
    }, [dispatch]);

    useSetDocumentTitle(i18n.frequentlyUsed, 'LiTags');

    const onTagButtonClick = (tag: TagType) => (): void => {
        setSelectedTag(tag);
    };

    const onDeleteSelectedTagClicked = useCallback((): void => {
        if (selectedTag) {
            dispatch(removeFrequentlyUsed(selectedTag));
        }
        setSelectedTag(null);
    }, [dispatch, selectedTag]);

    if (loading) {
        return (
            <>
                <h1 className={'h2 pb-2 pb-mb-4'}>{i18n.frequentlyUsed}</h1>
                <div className='d-flex justify-content-center py-2 py-md-4'>
                    <Spinner animation="border" variant="primary" />
                </div>
            </>
        );
    } else if (frequentlyUsed) {
        return (
            <>
                <h1 className={'h2 pb-2 pb-mb-4'}>{i18n.frequentlyUsed}</h1>
                <Container fluid={true}>
                    <Row className='pb-2'>
                        <p className={'text-muted'}>{i18n.frequentlyUsedTags}: {frequentlyUsed.length}</p>
                    </Row>
                    <Row className='pb-2'>
                        <FrequentlyUsedContainer frequentlyUsed={frequentlyUsed} onTagClicked={onTagButtonClick} />
                    </Row>
                    {
                        selectedTag &&
                        <Row className='py-2'>
                            <div className='d-flex flex-row'>
                                <div className='mx-2 mr-2 mr-md-4'>
                                    <Tag tag={selectedTag} />
                                </div>
                                <div>
                                    <Button variant='outline-danger' className='' onClick={(): void => onDeleteSelectedTagClicked()}>
                                        {i18n.removeSelectedTag}
                                    </Button>
                                </div>
                            </div>
                        </Row>
                    }
                </Container>
            </>
        );
    } else {
        return <p className={'text-muted'}>{i18n.frequentlyUsedTags}: 0</p>;
    }
};