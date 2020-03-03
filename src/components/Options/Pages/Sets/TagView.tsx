import * as React from "react";
import Tag from "../../../Tag";
import {Tag as TagType} from "../../../../api/storageAPI";
import {Container, Col, Row} from "react-bootstrap";
import {ColorPicker} from "../../ColorPicker";
import {Badge} from "../../Badge";
import {i18n} from "../../../../constants/i18n";

interface TagViewProps {
    tag: TagType;
}

export const TagView: React.FunctionComponent<TagViewProps> = ({tag}: TagViewProps) => {
    const fontTag = tag.color != undefined;

    return (
        <Container fluid={true}>
            <Row className='pb-2'>
                <Col xs={1}>
                    <strong className='text-muted'>{i18n.tag}</strong>
                </Col>
                <Col>
                    <strong className='text-muted'>{i18n.tagName}</strong>
                </Col>
                {
                    (tag.aliases && tag.aliases.length > 0) &&
                    <Col>
                        <strong className='text-muted'>{i18n.aliases}</strong>
                    </Col>
                }
                <Col>
                    <strong className='text-muted'>{fontTag ? i18n.symbol : i18n.imageURL}</strong>
                </Col>
                {
                    (tag.color != undefined) &&
                    <Col xs={1} className='align-middle'>
                        <strong className='text-muted'>{i18n.color}</strong>
                    </Col>
                }
            </Row>
            <Row className='align-items-center'>
                <Col xs={1}>
                    <Tag tag={tag}/>
                </Col>
                <Col>
                    <input type='text' className='form-control' value={tag.name} placeholder={i18n.tagName}/>
                </Col>
                {
                    (tag.aliases && tag.aliases.length > 0) &&
                    <Col>
                        {
                            tag.aliases.map((alias, index) => (
                                <Badge key={`alias-${index}-${tag.id}]`} text={alias}
                                       onRemoveButtonClicked={(): void => console.log('remove clicked')}/>
                            ))
                        }
                    </Col>
                }
                <Col>
                    <input type='text' className='form-control' value={tag.uri}
                           placeholder={fontTag ? i18n.symbol : i18n.imageURL}/>
                </Col>
                {
                    (tag.color != undefined) &&
                    <Col xs={1} className='align-middle'>
                        <ColorPicker color={tag.color}/>
                    </Col>
                }
            </Row>
        </Container>
    );
};