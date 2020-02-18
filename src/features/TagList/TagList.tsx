import * as React from 'react';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import {useDispatch, useSelector} from 'react-redux'
import {useEffect} from "react";
import {getUser, updateTags} from "../../slices/user";
import {RootState} from "../../app/rootReducer";
import Tag from "../../components/Tag";
import {Tag as TagType} from "../../api/storageAPI"
import isEmpty from 'lodash/isempty';

interface SortableItemProps {
    tag: TagType
}

const SortableItem = SortableElement(({tag}: SortableItemProps) => <li><Tag tag={tag}/></li>);

interface SortableListProps {
    tags: TagType[]

}
const SortableList = SortableContainer(({tags}: SortableListProps) =>
    <ul>
        {tags.map((tag, index) => (<SortableItem key={`item-${tag.id}`} index={index} tag={tag}/>))}
    </ul>
);

interface TagListProps {
    username: string
}

const TagList = ({username}: TagListProps) => {
    const dispatch = useDispatch();
    const {user, loading, error} = useSelector((state: RootState) =>
        state.user.userRecord[username] ? state.user.userRecord[username] : {user: null, loading: false, error: null}
    );
    const {tagsById} = useSelector((state: RootState) => state.sets);

    useEffect(() => {
        console.log(`%cLoading User: ${username}`, 'font-size: 1.5em; font-weight: bold; color: red');
        dispatch(getUser(username));
    }, [username, dispatch]);

    const onSortEnd = ({oldIndex, newIndex}) => {
        if(user.tags)
            dispatch(updateTags(username, arrayMove([...user.tags], oldIndex, newIndex)));
    };

    if (error) {
        console.error(error);
        return null;
    } else if (!loading && user && user.tags.length > 0 && !isEmpty(tagsById)) {
        return (
                <SortableList tags={user.tags.map(tagId => tagsById[tagId] ? tagsById[tagId] : null)}
                              onSortEnd={onSortEnd}
                              axis="x" lockAxis="x"
                              lockToContainerEdges={true}/>
        );
    } else {
        return null;
    }
};

export default TagList;
