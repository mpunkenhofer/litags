import * as React from 'react';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import {useState} from 'react';
import arrayMove from 'array-move';
import {ENDPOINTS, METHODS} from "../api";
import {useApi} from "../hooks/api";

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
    const {data, isFetching, errorMessage} = useApi(ENDPOINTS.USERS, METHODS.GET, username);

    const onSortEnd = ({oldIndex, newIndex}) => {
      setItems(items => arrayMove(items, oldIndex, newIndex));
    };

    if(errorMessage) {
        console.error(errorMessage);
    }

    if(!isFetching && data)
        return <SortableList items={items}
                             nSortEnd={onSortEnd}
                             axis="x" lockAxis="x"
                             lockToContainerEdges={true}/>;
    else {
        return <></>
    }
};

export default TagList;