import * as React from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from "react";
import { removeTag, updateTags } from "../../slices/user";
import { RootState } from "../../common/rootReducer";
import Tag from "../Tag";
import { Tag as TagType } from "../../types"
import { ICONS } from '../../constants';

interface SortableItemProps {
    tag: TagType;
}

const SortableItem = SortableElement(({ tag }: SortableItemProps) => <li><Tag tag={tag} /></li>);

interface SortableListProps {
    tags: TagType[];
    limit: number;
    removeZoneVisible: boolean;
    setHoveringRemoveZone: (arg: boolean) => void;
}

const SortableList = SortableContainer(({ tags, limit,
    removeZoneVisible, setHoveringRemoveZone }: SortableListProps) =>
    <>
        <ul>
            {tags.slice(0, limit).map((tag, index) => (<SortableItem key={`item-${tag.id}`} index={index} tag={tag} />))}
        </ul>
        {
            removeZoneVisible && <div className={'lt-list-remove-zone lt-lichess-icon'} data-icon={ICONS.remove}
                onMouseEnter={(): void => setHoveringRemoveZone(true)}
                onMouseLeave={(): void => setHoveringRemoveZone(false)}/>
        }
    </>
);

interface TagListProps {
    id: string;
}

const TagList: React.FunctionComponent<TagListProps> = ({ id: username }: TagListProps) => {
    const dispatch = useDispatch();

    const [tags, setTags] = useState<TagType[]>([]);
    const [removeZoneVisible, setRemoveZoneVisible] = useState(false);
    const [hoveringRemoveZone, setHoveringRemoveZone] = useState(false);

    const { user, error } = useSelector((state: RootState) =>
        state.user.userRecord[username] || { user: null, loading: false, error: null });

    const { options } = useSelector((state: RootState) => state.options);

    useEffect(() => {
        if (user) {
            setTags([...user.tags]);
        }
    }, [user]);

    const onSortStart = (): void => {
        setRemoveZoneVisible(true);
    };

    const onSortEnd = ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }): void => {
        setRemoveZoneVisible(false);
        setHoveringRemoveZone(false);

        if (hoveringRemoveZone) {
            setTags(tags.splice(oldIndex, 1));
            if (user.tags && user.tags.length > oldIndex)
                dispatch(removeTag(username, user.tags[oldIndex]));
        } else {
            setTags(arrayMove(tags, oldIndex, newIndex));
            if (user.tags)
                dispatch(updateTags(username, arrayMove([...user.tags], oldIndex, newIndex)));
        }
    };

    if (error) {
        console.error(error);
        return null;
    }

    if (tags.length < 1) {
        return null;
    }

    return (
        <SortableList tags={tags}
            limit={options.tagListLimit}
            helperClass={'lt-list-helper'}
            removeZoneVisible={removeZoneVisible}
            setHoveringRemoveZone={setHoveringRemoveZone}
            onSortStart={onSortStart}
            onSortEnd={onSortEnd}
            axis="x" lockAxis="x"
                      /*lockToContainerEdges={true}*/ />
    );
};

export default TagList;
