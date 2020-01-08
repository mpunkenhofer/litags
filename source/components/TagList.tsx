import * as React from 'react';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import { useState } from 'react';
import arrayMove from 'array-move';

const SortableItem = SortableElement(({value}) => <li className='li-tag'>{value}</li>);
const SortableList = SortableContainer(({items}) =>
    <ul>
        {items.map((value, index) => (
            <SortableItem key={`item-${value}`} index={index} value={value}/>
        ))}
    </ul>
);

const TagList = (props) => {
    const [items, setItems] = useState(['A', 'B', 'C']);

    const onSortEnd = ({oldIndex, newIndex}) => {
      setItems(items => arrayMove(items, oldIndex, newIndex));
    };

    return (<SortableList items={items}
                          onSortEnd={onSortEnd}
                          axis="x" lockAxis="x"
                          lockToContainerEdges={true}/>);
};

export default TagList;