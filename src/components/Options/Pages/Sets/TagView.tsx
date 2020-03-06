import * as React from "react";
import Tag from "../../../Tag";
import {Tag as TagType} from "../../../../api/storageAPI";
import {Container, Col, Row} from "react-bootstrap";
import {ColorPicker} from "../../ColorPicker";
import {Badge} from "../../Badge";
import {i18n} from "../../../../constants/i18n";
import {useDispatch, useSelector} from "react-redux";
import {postSets, removeAlias, updateTagColor, updateTagName, updateTagURI} from "../../../../slices/sets";
import {ChangeEvent, useCallback} from "react";
import {RootState} from "../../../../app/rootReducer";

interface TagViewProps {
    tag: TagType;
}

export const TagView: React.FunctionComponent<TagViewProps> = ({tag}: TagViewProps) => {
    /*TODO:
        - Aliases: Support adding aliases (action already exists: addAlias)
     */
    const dispatch = useDispatch();

    const sTag = useSelector((state: RootState) => state.sets.tagsById[tag.id]);

    const fontTag = tag.color != undefined;

    const onChangeName = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
        if (event && event.target && event.target.value !== undefined) {
            dispatch(updateTagName(tag.id, event.target.value));
            dispatch(postSets());
        }
    }, [dispatch, tag]);

    const onChangeURI = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
        if (event && event.target && event.target.value !== undefined) {
            dispatch(updateTagURI(tag.id, event.target.value));
            dispatch(postSets());
        }
    }, [dispatch, tag]);

    const onChangeColor = useCallback((color: string): void => {
        if (color) {
            dispatch(updateTagColor(tag.id, color));
            dispatch(postSets());
        }
    }, [dispatch, tag]);

    const onRemoveAliasButtonClicked = useCallback((alias: string) => (): void => {
        dispatch(removeAlias(tag.id, alias));
        dispatch(postSets());
    }, [dispatch, tag]);

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
                    <Tag tag={sTag}/>
                </Col>
                <Col>
                    <input type='text' className='form-control' value={sTag.name} placeholder={i18n.tagName}
                           onChange={onChangeName}/>
                </Col>
                {
                    (sTag.aliases && sTag.aliases.length > 0) &&
                    <Col>
                        {
                            sTag.aliases.map((alias, index) => (
                                <Badge key={`alias-${index}-${tag.id}]`} text={alias}
                                       onRemoveButtonClicked={onRemoveAliasButtonClicked(alias)}/>
                            ))
                        }
                    </Col>
                }
                <Col>
                    <input type='text' className='form-control' value={sTag.uri}
                           placeholder={fontTag ? i18n.symbol : i18n.imageURL} onChange={onChangeURI}/>
                </Col>
                {
                    (sTag.color != undefined) &&
                    <Col xs={1} className='align-middle'>
                        <ColorPicker color={sTag.color ? sTag.color : '#000000'} onChangeComplete={onChangeColor}/>
                    </Col>
                }
            </Row>
        </Container>
    );
};