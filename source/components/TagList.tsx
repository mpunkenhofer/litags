import * as React from 'react';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import {useState} from 'react';
import arrayMove from 'array-move';
import { useDispatch, useSelector } from 'react-redux'
import {useEffect} from "react";
import * as actions from "../actions";
import {
    getUser,
    getUserIsFetching,
    getUserErrorMessage
} from "../selectors";
import {ENDPOINTS, METHODS} from "../api";

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

    const dispatch = useDispatch();
    const user = useSelector(getUser(username));
    const isFetching = useSelector(getUserIsFetching(username));
    const errorMessage = useSelector(getUserErrorMessage(username));

    useEffect(() => {
        actions.fetch(ENDPOINTS.USERS, METHODS.GET, username)(dispatch, isFetching);
    }, []);

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