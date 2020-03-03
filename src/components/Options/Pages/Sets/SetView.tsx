import * as React from "react";
import {Set, Tag} from "../../../../api/storageAPI";
import TagButton from "../../../TagButton";
import {useState} from "react";
import {TagView} from "./TagView";
import {Container, Col, Row} from "react-bootstrap";
import {i18n} from "../../../../constants/i18n";
import {ChangeEvent} from "react";
import {useDispatch} from "react-redux";
import {updateIconUrl, updateSetName} from "../../../../slices/sets";


interface TagContainerProps {
    tags: Tag[];
    onTagClicked: (tag: Tag) => () => void;
}

const TagContainer: React.FunctionComponent<TagContainerProps> = ({tags, onTagClicked}: TagContainerProps) => (
    <div className='p-2 d-flex flex-wrap border rounded-lg justify-content-around bg-light'>
        {
            tags.map(tag => (tag && tag.id) &&
                <TagButton key={tag.id} tag={tag} onClick={onTagClicked(tag)}/>)
        }
    </div>
);

interface SetDisplayProps {
    set: Set;
}


export const SetView: React.FunctionComponent<SetDisplayProps> = ({set}: SetDisplayProps) => {
    const dispatch = useDispatch();

    const [selectedTag, setSelectedTag] = useState<Tag | null>((set && set.tags && set.tags.length > 0) ?
        set.tags[0] : null);


    const onTagButtonClick = (tag: Tag) => (): void => {
        setSelectedTag(tag);
    };

    const onChangeSetName = (event: ChangeEvent<HTMLInputElement>): void => {
        if(event && event.target && event.target.value !== undefined) {
            dispatch(updateSetName(set.id, event.target.value));
        }
    };

    const onChangeIconUrl = (event: ChangeEvent<HTMLInputElement>): void => {
        if(event && event.target && event.target.value !== undefined) {
            dispatch(updateIconUrl(set.id, event.target.value));
        }
    };

    return (
        <Container fluid={true}>
            <Row className='pb-2 pb-md-4'>
                <Col xs={6} className='d-flex justify-content-center align-items-center'>
                    <div className='bg-primary text-center'
                         style={{width: '8rem', height: '8rem', borderRadius: '50%'}}>
                        <img src={set.iconUrl} alt={'Set Icon'}
                             style={{width: '4rem', height: '4rem', marginTop: '2rem'}}/>
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
                        <input type='text' className='form-control' value={set.iconUrl} placeholder={i18n.setIconURL}
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
        </Container>
    );
};
