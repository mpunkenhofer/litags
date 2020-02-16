import * as React from 'react';
import Tag from "./Tag";
import {Tag as TagType} from "../api/storageAPI";

interface TagButtonProps {
    tag: TagType,
    onClick: () => void
}

const TagButton = ({tag, onClick}: TagButtonProps) => (
    <button title={tag.name} className='lt-t-button' onClick={onClick}>
        <Tag tag={tag}/>
    </button>
);


export default TagButton;
