import * as React from "react";
import {Set} from "../../../../api/storageAPI";
import TagButton from "../../../TagButton";

interface SetDisplayProps {
    set: Set;
}

export const SetDisplay: React.FunctionComponent<SetDisplayProps> = ({set}: SetDisplayProps) => {
    const onClick = (): void => {
        console.log('click');
    };

    return (
        <>
            <h1>{set.name}</h1>
            <img src={set.iconUrl} alt={'Set Icon'}/>
            <div className='p-2 d-flex flex-wrap border rounded-lg justify-content-around bg-light'>
                {
                    set.tags.map(tag => (tag && tag.id) && <TagButton key={tag.id} tag={tag} onClick={onClick}/>)
                }
            </div>
        </>
    );
};
