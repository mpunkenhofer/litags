import * as React from "react";
import Tag from "../../Tag";
import { Tag as TagType } from "../../../types";
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
        <div className={'d-flex flex-grow-1 justify-content-between'}>
            <div className={'d-flex flex-column mr-2 mr-md-4'}>
                <strong className='text-muted mb-1 mb-md-2'>{i18n.tag}</strong>
                <div className={'m-auto'}>
                <Tag tag={liveTag} />
                </div>
            </div>
            {
                (tag.font != undefined) &&
                <div className={'d-flex flex-column mr-2 mr-md-4'}>
                    <strong className='text-muted mb-1 mb-md-2'>{i18n.color}</strong>
                    <div className={'m-auto'}>
                        <ColorPicker color={liveTag.color ? liveTag.color : '#000000'} onChangeComplete={onChangeColor} />
                    </div>
            </div>
            }
            <div className={'d-flex flex-fill flex-column mr-2 mr-md-4'}>
                <strong className='text-muted mb-1 mb-md-2'>{i18n.tagName}</strong>
                <input type='text' className='form-control' value={liveTag.name} placeholder={i18n.tagName} onChange={onChangeName} />
            </div>

            {
                (liveTag.aliases && liveTag.aliases.length > 0) &&
                <div className={'d-flex flex-column mr-2 mr-md-4'}>
                    <strong className='text-muted mb-1 mb-md-2'>{i18n.aliases}</strong>
                    <div>
                        {
                            liveTag.aliases.map((alias, index) => (
                                <Badge key={`alias-${index}-${tag.id}]`} text={alias}
                                    onRemoveButtonClicked={onRemoveAliasButtonClicked(alias)} />
                            ))
                        }
                    </div>
                </div>
            }
            {
                (tag.font != undefined) ?
                    <div className={'d-flex flex-fill flex-row'}>
                        <div className={'d-flex flex-grow-1 flex-column'}>
                            <strong className='text-muted mb-1 mb-md-2'>{i18n.symbol}</strong>
                            <input type='text' className='form-control' value={liveTag.uri} placeholder={i18n.symbol} onChange={onChangeURI} />
                        </div>
                    </div> :
                    <div className={'d-flex flex-fill flex-row'}>
                        <div className={'d-flex flex-grow-1 flex-column mr-2 mr-md-4'}>
                            <strong className='text-muted mb-1 mb-md-2'>{i18n.imageURL}</strong>
                            <input type='text' className='form-control' value={liveTag.uri} placeholder={i18n.imageURL} onChange={onChangeURI} />
                        </div>
                        <div className={'mt-auto'}>
                            <ImageUpload onUploadError={onError} onUploadSuccess={setTagURI} />
                        </div>
                    </div>
            }
        </div>
    );
};

TagView.defaultProps = {
    onError: (msg: string): void => console.error(msg),
}