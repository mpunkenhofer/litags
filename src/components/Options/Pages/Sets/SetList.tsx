import {SortableContainer, SortableElement, SortableHandle} from "react-sortable-hoc";
import {Set} from "../../../../api/storageAPI"
import * as React from "react";
import {NavLink} from "react-router-dom";
import arrayMove from "array-move";
import {useCallback, useEffect, useState} from "react";
import {i18n} from "../../../../constants/i18n";
import {useDispatch} from "react-redux";
import {addSet} from "../../../../slices/sets";

interface SortableItemProps {
    id: string;
    name: string;
}

const DragHandle = SortableHandle(() =>
    <img src={'/assets/grip-lines-solid.svg'} alt={'Drag Handle Icon'}
         className='lt-options-drag-handle d-none d-xl-block mr-1 mr-md-2'/>);

const SortableItem = SortableElement(({id, name}: SortableItemProps) =>
    <li className='nav-item'>
        <NavLink className='nav-link d-flex align-items-center' to={`/${id}`}>
            <DragHandle/>
            <span>{name}</span>
        </NavLink>
    </li>
);

interface SortableListProps {
    pairs: { id: string; name: string }[];
}

const SortableList = SortableContainer(({pairs}: SortableListProps) => {
    return (
        <ul className='nav flex-row flex-xl-column nav-pills py-2'>
            {pairs.map(({id, name}, index) => (
                <SortableItem key={`item-${id}`} index={index} id={id} name={name}/>
            ))}
        </ul>
    );
});

interface SetListProps {
    sets: Set[];
}

export const SetList: React.FunctionComponent<SetListProps> = ({sets}: SetListProps) => {
    const dispatch = useDispatch();

    const [pairs, setPairs] = useState<{ id: string; name: string }[]>(sets.map(set => ({id: set.id, name: set.name})));

    useEffect(() => {
        setPairs(sets.map(set => ({id: set.id, name: set.name})));
    }, [sets]);

    const onSortEnd = ({oldIndex, newIndex}: { oldIndex: number; newIndex: number }): void => {
        setPairs(arrayMove(pairs, oldIndex, newIndex));
    };

    const onAddSetClicked = useCallback((): void => {
        dispatch(addSet(i18n.newSet));
    }, [dispatch]);

    return (
        <>
            <div className='d-none d-xl-flex mb-2'>
                <strong className='text-muted'>{i18n.sets}</strong>
                <button title={i18n.addSet} className='ml-auto lt-plus-icon text-muted lt-addSet-icon'
                        onClick={onAddSetClicked}/>
            </div>
            <SortableList pairs={pairs}
                          useDragHandle={true}
                          onSortEnd={onSortEnd}
                          helperClass={'lt-options-drag-helper'}/>
        </>
    );
};
