import * as React from 'react';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import {useState} from 'react';
import arrayMove from 'array-move';
import {useApi} from '../hooks';
import {ENDPOINTS} from "../api";

const SortableItem = SortableElement(({value}) => <li className='li-tag'>{value}</li>);
const SortableList = SortableContainer(({items}) =>
    <ul>
        {items.map((value, index) => (
            <SortableItem key={`item-${value}`} index={index} value={value}/>
        ))}
    </ul>
);

const TagList = ({username}) => {
    const [items, setItems] = useState(['A', 'B', 'C']);
    const t = useApi(ENDPOINTS.USERS, username);

    const onSortEnd = ({oldIndex, newIndex}) => {
      setItems(items => arrayMove(items, oldIndex, newIndex));
    };

    // if(isFetching) {
    //     return <div>Loading...</div>
    // }
    //
    // if(errorMessage) {
    //     return <div>{errorMessage}</div>;
    // }

    return <SortableList items={items}
                         nSortEnd={onSortEnd}
                         axis="x" lockAxis="x"
                         lockToContainerEdges={true}/>;
};

export default TagList;