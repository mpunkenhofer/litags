import * as React from "react";
import {Set, Tag} from "../../../../api/storageAPI";
import TagButton from "../../../TagButton";
import {useState} from "react";
import {TagView} from "./TagView";
import {Container, Col, Row} from "react-bootstrap";
import {i18n} from "../../../../constants/i18n";

interface SetDisplayProps {
    set: Set;
}

export const SetView: React.FunctionComponent<SetDisplayProps> = ({set}: SetDisplayProps) => {
    const [selectedTag, setSelectedTag] = useState<Tag | null>(null);


    const onTagButtonClick = (tag: Tag) => (): void => {
        setSelectedTag(tag);
    };

    return (
        <Container fluid={true}>
            <Row className='pb-3 pb-md-5'>
                <Col xs={6} className='d-flex justify-content-center'>
                    <div className='bg-primary text-center'
                         style={{width: '8rem', height: '8rem', borderRadius: '50%'}}>
                        <img src={set.iconUrl} alt={'Set Icon'}
                             style={{width: '4rem', height: '4rem', marginTop: '2rem'}}/>
                    </div>
                </Col>
                <Col xs={6}>
                    <Row>
                        <strong className='text-muted'>{i18n.setName}</strong>
                        <input type='text' className='form-control' value={set.name} placeholder={i18n.setName}/>
                    </Row>
                    <Row>
                        <strong className='text-muted'>{i18n.setIconURL}</strong>
                        <input type='text' className='form-control' value={set.iconUrl} placeholder={i18n.setIconURL}/>
                    </Row>
                </Col>
            </Row>
            {
                selectedTag &&
                <Row className='border-top py-2 py-md-4 m-2'>
                    <TagView tag={selectedTag}/>
                </Row>
            }
            <Row className='p-2 d-flex flex-wrap border rounded-lg justify-content-around bg-light'>

                {
                    set.tags.map(tag => (tag && tag.id) &&
                        <TagButton key={tag.id} tag={tag} onClick={onTagButtonClick(tag)}/>)
                }
            </Row>
        </Container>
    );
};
