import * as React from 'react';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import {useState} from 'react';
import arrayMove from 'array-move';
import {useDispatch, useSelector} from 'react-redux'
import * as selectors from "../selectors";
import {useEffect} from "react";
import * as actions from "../actions";

const SortableItem = SortableElement(({value}) => <li className='li-tag'>{value}</li>);
const SortableList = SortableContainer(({items}) =>
    <ul>
        {items.map((value, index) => (
            <SortableItem key={`item-${value}`} index={index} value={value}/>
        ))}
    </ul>
);

const TagList = ({username}) => {
    const dispatch = useDispatch();
    const user = useSelector(selectors.getUser(username));
    const isFetching = useSelector(selectors.getUserIsFetching(username));
    const errorMessage = useSelector(selectors.getUserErrorMessage(username));

    const [items, setItems] = useState(['A', 'B', 'C']);

    useEffect(() => {
        if (!isFetching) {
            console.log(`%c FETCH USER: ${username}!`, 'font-size: 2em; font-weight: bold; color: blue');
            actions.getUser(dispatch, username);
        }
        // if(!isFetchingFrequentlyUsed) {
        //     console.log(`%c FETCH Frequently Used!`, 'font-size: 1.5em; font-weight: bold; color: blue');
        //     actions.getFrequentlyUsed(dispatch);
        // }
    }, []);

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

export default TagList;
