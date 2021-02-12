import { SortableContainer, SortableElement, SortableHandle } from "react-sortable-hoc";
import { Set } from "../../../types"
import * as React from "react";
import { NavLink } from "react-router-dom";
import arrayMove from "array-move";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateSets } from "../../../slices/sets";
import { setSets } from "../../../slices/sets";

interface SortableItemProps {
    id: string;
    name: string;
}

const DragHandle = SortableHandle(() =>
    <img src={'/assets/images/bars-solid.svg'} alt={'Drag Handle Icon'}
        className='lt-btn-icon mr-1 mr-md-2' />);

const SortableItem = SortableElement(({ id, name }: SortableItemProps) =>
    <li className='d-block nav-item text-nowrap'>
        <NavLink className='nav-link d-flex align-items-center' to={`/${id}`}>
            <DragHandle />
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
                <SortableItem key={`set-${id}`} index={index} id={id} name={name} />
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
