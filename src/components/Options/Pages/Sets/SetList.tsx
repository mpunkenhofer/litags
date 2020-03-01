import {SortableContainer, SortableElement, SortableHandle} from "react-sortable-hoc";
import {Set} from "../../../../api/storageAPI"
import * as React from "react";
import {NavLink} from "react-router-dom";

interface SortableItemProps {
    name: string;
}

const DragHandle = SortableHandle(() =>
    <img src={'/assets/grip-lines-solid.svg'} alt={'Drag Handle Icon'}
         className='lt-options-drag-handle d-none d-lg-block mr-1 mr-md-2'/>);

const SortableItem = SortableElement(({name}: SortableItemProps) =>
    <li className='nav-item'>
        <NavLink className='nav-link d-flex align-items-center' to={`/${name}`}>
            <DragHandle/>
            <span>{name}</span>
        </NavLink>
    </li>
);

interface SortableListProps {
    names: string[];
}

const SortableList = SortableContainer(({names}: SortableListProps) => {
    return (
        <ul className='nav flex-row flex-lg-column nav-pills py-2'>
            {names.map((name, index) => (
                <SortableItem key={`item-${name}`} index={index} name={name}/>
            ))}
        </ul>
    );
});

interface SetListProps {
    sets: Set[];
}

export const SetList: React.FunctionComponent<SetListProps> = ({sets}: SetListProps) => {
    return (
        <SortableList names={sets.map(set => set.name)}
                      useDragHandle={true}
                      helperClass={'lt-options-drag-helper'}/>
    );
};
