import * as React from "react";
import Tag from "../../Tag";
import { Tag as TagType } from "../../../types";
import { Container, Col, Row } from "react-bootstrap";
import { ColorPicker } from "../ColorPicker";
import { Badge } from "../Badge";
import { i18n } from "../../../constants/i18n";
import { useDispatch, useSelector } from "react-redux";
import { setSets, removeAlias, updateTagColor, updateTagName, updateTagURI, tagSelector } from "../../../slices/sets";
import { ChangeEvent, useCallback, useMemo } from "react";
import { RootState } from "../../../common/rootReducer";

interface TagViewProps {
    tag: TagType;
}

export const TagView: React.FunctionComponent<TagViewProps> = ({ tag }: TagViewProps) => {
    const dispatch = useDispatch();

    const {sets} = useSelector((state: RootState) => state.sets);

    const liveTag = useMemo(() => {
        const t = tagSelector(sets, tag.id);
        return (t !== null) ? t : tag;
    }, [tag, sets]);

    const onChangeName = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
        if (event && event.target && event.target.value !== undefined) {
            dispatch(updateTagName(tag.id, event.target.value));
            dispatch(setSets());
        }
    }, [dispatch, tag]);

    const onChangeURI = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
        if (event && event.target && event.target.value !== undefined) {
            dispatch(updateTagURI(tag.id, event.target.value));
            dispatch(setSets());
        }
    }, [dispatch, tag]);

    const onChangeColor = useCallback((color: string): void => {
        if (color) {
            dispatch(updateTagColor(tag.id, color));
            dispatch(setSets());
        }
    }, [dispatch, tag]);

    const onRemoveAliasButtonClicked = useCallback((alias: string) => (): void => {
        dispatch(removeAlias(tag.id, alias));
        dispatch(setSets());
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
                    (liveTag.aliases && liveTag.aliases.length > 0) &&
                    <Col>
                        <strong className='text-muted'>{i18n.aliases}</strong>
                    </Col>
                }
                <Col>
                    <strong className='text-muted'>{(tag.font !== undefined) ? i18n.symbol : i18n.imageURL}</strong>
                </Col>
                {
                    (tag.font != undefined) &&
                    <Col xs={1} className='align-middle'>
                        <strong className='text-muted'>{i18n.color}</strong>
                    </Col>
                }
            </Row>
            <Row className='align-items-center'>
                <Col xs={1}>
                    <Tag tag={liveTag} />
                </Col>
                <Col>
                    <input type='text' className='form-control' value={liveTag.name} placeholder={i18n.tagName}
                        onChange={onChangeName} />
                </Col>
                {
                    ((liveTag.aliases !== undefined) && liveTag.aliases.length > 0) &&
                    <Col>
                        {
                            liveTag.aliases.map((alias, index) => (
                                <Badge key={`alias-${index}-${tag.id}]`} text={alias}
                                    onRemoveButtonClicked={onRemoveAliasButtonClicked(alias)} />
                            ))
                        }
                    </Col>
                }
                <Col>
                    <input type='text' className='form-control' value={liveTag.uri}
                        placeholder={(tag.font !== undefined) ? i18n.symbol : i18n.imageURL} onChange={onChangeURI} />
                </Col>
                {
                    (tag.font !== undefined) &&
                    <Col xs={1} className='align-middle'>
                        <ColorPicker color={liveTag.color ? liveTag.color : '#000000'} onChangeComplete={onChangeColor} />
                    </Col>
                }
            </Row>
        </Container>
    );
};