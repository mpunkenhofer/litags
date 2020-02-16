import * as React from 'react';
import {Tag} from "../api/storageAPI";

interface TagProps {
    tag: Tag
}

const Tag = ({tag}: TagProps) => (
    <div className='lt-tag'>
        {(tag.color.length > 0)? <span>{tag.uri}</span> : <img src={tag.uri}></img>}
    </div>
);

export default Tag;
