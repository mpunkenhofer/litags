import * as React from 'react';
import Tag from "./Tag";

const TagButton = ({tag, onClick}) => (
    <button title={tag.name} className='lt-t-button' onClick={() => onClick(tag)}>
        <Tag tag={tag}/>
    </button>
);


export default TagButton;
