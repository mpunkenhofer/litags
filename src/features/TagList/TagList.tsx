import * as React from 'react';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import {useState} from 'react';
import arrayMove from 'array-move';
import {useDispatch, useSelector} from 'react-redux'
import {useEffect} from "react";
import {getUser} from "../../slices/user";
import {RootState} from "../../app/rootReducer";

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
    const userRecords = /*{user: null, loading: false, error: null};*/useSelector((state: RootState) => state.user.user);
    const [items, setItems] = useState(['A', 'B', 'C']);

    console.log('>>>>>>>>> USER:', userRecords[username]);

    useEffect(() => {
        dispatch(getUser(username));
    }, [username, dispatch]);

    const onSortEnd = ({oldIndex, newIndex}) => {
        setItems(items => arrayMove(items, oldIndex, newIndex));
        console.log('hello');
    };

    if (userRecords[username] && userRecords[username].error) {
        console.error(userRecords[username].error);
        return <></>;
    } else if (userRecords[username] && !userRecords[username].loading && userRecords[username].user) {
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
