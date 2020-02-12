import * as React from 'react';
import Tag from "./Tag";

const TagButton = ({id, tag, onClick}) => (
    <button title={tag.name} className='lt-t-button' onClick={onClick(id)}>
        <Tag tag={tag}/>
    </button>
);


export default TagButton;
