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
import { ImageUpload } from "./ImageUpload";

interface TagViewProps {
    tag: TagType;
    onError: (msg: string) => void;
}

export const TagView: React.FunctionComponent<TagViewProps> = ({ tag, onError }: TagViewProps) => {
    const dispatch = useDispatch();

    const { sets } = useSelector((state: RootState) => state.sets);

    const liveTag = useMemo(() => {
        const t = tagSelector(sets, tag.id);
        return (t !== null) ? t : tag;
    }, [tag, sets]);

    const setTagURI = useCallback((uri: string): void => {
        dispatch(updateTagURI(tag.id, uri));
        dispatch(setSets());
    }, [dispatch, tag]);

    const onChangeURI = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
        if (event && event.target && event.target.value !== undefined) {
            setTagURI(event.target.value);
        }
    }, [setTagURI]);

    const onChangeName = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
        if (event && event.target && event.target.value !== undefined) {
            dispatch(updateTagName(tag.id, event.target.value));
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
        <div className={'d-flex flex-row pb-2'}>
            <div>
                <strong className='text-muted'>{i18n.tag}</strong>
                <Tag tag={liveTag} />
            </div>
            <div>
                <strong className='text-muted'>{i18n.tagName}</strong>
                <input type='text' className='form-control' value={liveTag.name} placeholder={i18n.tagName} onChange={onChangeName} />
            </div>

            {
                (liveTag.aliases && liveTag.aliases.length > 0) &&
                <div>
                    <strong className='text-muted'>{i18n.aliases}</strong>
                    {
                        liveTag.aliases.map((alias, index) => (
                            <Badge key={`alias-${index}-${tag.id}]`} text={alias}
                                onRemoveButtonClicked={onRemoveAliasButtonClicked(alias)} />
                        ))
                    }
                </div>
            }
            {
                (tag.font != undefined) ?
                <>
                    <div>
                        <strong className='text-muted'>{i18n.symbol}</strong>
                        <input type='text' className='form-control' value={liveTag.uri} placeholder={i18n.symbol} onChange={onChangeURI} />
                    </div>
                    <div>
                        <strong className='text-muted'>{i18n.color}</strong>
                        <ColorPicker color={liveTag.color ? liveTag.color : '#000000'} onChangeComplete={onChangeColor} />
                    </div>
                </> :
                <>
                    <div>
                        <strong className='text-muted'>{i18n.imageURL}</strong>
                        <input type='text' className='form-control' value={liveTag.uri} placeholder={i18n.imageURL} onChange={onChangeURI} />
                    </div>
                    <div>
                        <ImageUpload onUploadError={onError} onUploadSuccess={setTagURI}/>
                    </div>
                </>
            }
        </div>
    );
};

TagView.defaultProps = {
    onError: (msg: string): void => console.error(msg),
}