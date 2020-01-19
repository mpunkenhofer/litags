import * as React from 'react';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import {useContext, useState} from 'react';
// @ts-ignore
import arrayMove from 'array-move';
import {UserContext} from "../contexts/user";

const SortableItem = SortableElement(({value}) => <li className='li-tag'>{value}</li>);
const SortableList = SortableContainer(({items}) =>
    <ul>
        {items.map((value, index) => (
            <SortableItem key={`item-${value}`} index={index} value={value}/>
        ))}
    </ul>
);

const TagList = () => {
    const [items, setItems] = useState(['A', 'B', 'C']);
    const {user, isFetching, errorMessage} = useContext(UserContext);

    const onSortEnd = ({oldIndex, newIndex}) => {
      setItems(items => arrayMove(items, oldIndex, newIndex));
    };

    if(errorMessage) {
        console.error(errorMessage);
    }

    if(!isFetching && user)
        return <SortableList items={items}
                             nSortEnd={onSortEnd}
                             axis="x" lockAxis="x"
                             lockToContainerEdges={true}/>;
    else {
        return <></>
    }
};

export default TagList;
