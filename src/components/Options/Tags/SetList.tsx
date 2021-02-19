import { SortableContainer, SortableElement, SortableHandle } from "react-sortable-hoc";
import { Set } from "../../../types"
import * as React from "react";
import { NavLink } from "react-router-dom";
import arrayMove from "array-move";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateSets } from "../../../slices/sets";
import { setSets } from "../../../slices/sets";


interface DragHandleProps {
    pos: number;
}

const DragHandle = SortableHandle(({pos: position}: DragHandleProps) => <span className='pl-1 pr-2'>{position}</span>);

interface SortableItemProps {
    id: string;
    name: string;
    pos: number;
}

const SortableItem = SortableElement(({ id, name, pos: position }: SortableItemProps) =>
    <li className='d-block nav-item text-nowrap'>
        <NavLink className='nav-link d-flex align-items-center' to={`/${id}`}>
            <DragHandle pos={position}/>
            <span>{name}</span>
        </NavLink>
    </li>
);

interface SortableListProps {
    pairs: { id: string; name: string }[];
}

const SortableList = SortableContainer(({ pairs }: SortableListProps) => {
    return (
        <ul className='nav flex-row nav-pills px-2'>
            {pairs.map(({ id, name }, index) => (
                <SortableItem key={`set-${id}`} index={index} id={id} name={name} pos={index + 1}/>
            ))}
        </ul>
    );
});

interface SetListProps {
    sets: Set[];
}

export const SetList: React.FunctionComponent<SetListProps> = ({ sets }: SetListProps) => {
    const dispatch = useDispatch();

    const [pairs, setPairs] = useState<{ id: string; name: string }[]>(sets.map(set => ({ id: set.id, name: set.name })));

    useEffect(() => {
        setPairs(sets.map(set => ({ id: set.id, name: set.name })));
    }, [sets]);

    const onSortEnd = useCallback(({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }): void => {
        setPairs(arrayMove(pairs, oldIndex, newIndex));
        dispatch(updateSets(arrayMove(sets, oldIndex, newIndex)));
        dispatch(setSets());
    }, [dispatch, sets, pairs]);

    return (
        <>
            <SortableList pairs={pairs}
                onSortEnd={onSortEnd}
                useDragHandle={true}
                helperClass={'lt-options-drag-helper'}
                axis="x" lockAxis="x" />
        </>
    );
};
