import * as React from 'react';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import {useContext, useState} from 'react';
import arrayMove from 'array-move';
import {UserContext} from "../contexts/user";
import {SetContext, SetProvider} from "../contexts/sets";

const SortableItem = SortableElement(({value}) => <li className='li-tag'>{value}</li>);
const SortableList = SortableContainer(({items}) =>
    <ul>
        {items.map((value, index) => (
            <SortableItem key={`item-${value}`} index={index} value={value}/>
        ))}
    </ul>
);

const TagListContainer = () => {
    const {user, isFetching, errorMessage} = useContext(UserContext);
    const {getTagByID} = useContext(SetContext);

    const [items, setItems] = useState(['A', 'B', 'C']);

    const onSortEnd = ({oldIndex, newIndex}) => {
        setItems(items => arrayMove(items, oldIndex, newIndex));
        console.log('hello');
    };

    if (errorMessage) {
        console.error(errorMessage);
    }

    if (!isFetching && user) {
        return (
            <SortableList items={items}
                          nSortEnd={onSortEnd}
                          axis="x" lockAxis="x"
                          lockToContainerEdges={true}/>
        );
    } else {
        return <></>
    }
};

const TagList = () => (
    <SetProvider>
        <TagListContainer/>
    </SetProvider>
);

export default TagList;
