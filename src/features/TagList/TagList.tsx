import * as React from 'react';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import {useDispatch, useSelector} from 'react-redux'
import {useEffect, useState} from "react";
import {getUser, removeTag, updateTags} from "../../slices/user";
import {RootState} from "../../app/rootReducer";
import Tag from "../../components/Tag";
import {Tag as TagType} from "../../api/storageAPI"

interface SortableItemProps {
    tag: TagType
}

const SortableItem = SortableElement(({tag}: SortableItemProps) => <li><Tag tag={tag}/></li>);

interface SortableListProps {
    tags: TagType[],
    removeZoneVisible: boolean,
    setHoveringRemoveZone: (boolean) => void,
}

const SortableList = SortableContainer(({tags,
                                            removeZoneVisible, setHoveringRemoveZone}: SortableListProps) =>
    <>
        <ul>
            {tags.map((tag, index) => (<SortableItem key={`item-${tag.id}`} index={index} tag={tag}/>))}
        </ul>
        {
            removeZoneVisible && <div className={'lt-list-remove-zone'}
                                      onMouseEnter={() => setHoveringRemoveZone(true)}
                                      onMouseLeave={() => setHoveringRemoveZone(false)}/>
        }
    </>
);

interface TagListProps {
    username: string
}

const TagList = ({username}: TagListProps) => {
    const dispatch = useDispatch();

    const [tags, setTags] = useState([]);
    const [removeZoneVisible, setRemoveZoneVisible] = useState(false);
    const [hoveringRemoveZone, setHoveringRemoveZone] = useState(false);

    const {user, error} = useSelector((state: RootState) =>
        state.user.userRecord[username] ? state.user.userRecord[username] : {user: null, loading: false, error: null}
    );
    const {tagsById} = useSelector((state: RootState) => state.sets);

    useEffect(() => {
        console.log(`%cLoading User: ${username}`, 'font-size: 1.5em; font-weight: bold; color: red');
        dispatch(getUser(username));
    }, [username, dispatch]);


    useEffect(() => {
        if (user && user.tags && tagsById) {
            setTags(user.tags.map(tagId => (tagsById[tagId])).filter(tag => (tag !== undefined)));
        }
    }, [user, tagsById]);

    const onSortStart = () => {
        setRemoveZoneVisible(true);
    };

    const onSortEnd = ({oldIndex, newIndex}) => {
        setRemoveZoneVisible(false);
        setHoveringRemoveZone(false);

        if(hoveringRemoveZone) {
            setTags(tags.splice(oldIndex, 1));
            if(user.tags && user.tags.length > oldIndex)
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
                      removeZoneVisible={removeZoneVisible}
                      setHoveringRemoveZone={setHoveringRemoveZone}
                      onSortStart={onSortStart}
                      onSortEnd={onSortEnd}
                      axis="x" lockAxis="x"
                      lockToContainerEdges={true}/>
    );
};

export default TagList;
