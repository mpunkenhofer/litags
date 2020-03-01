import * as React from 'react';
import {Tag} from "../api/storageAPI";

interface TagProps {
    tag: Tag;
}

const Tag: React.FunctionComponent<TagProps> = ({tag}: TagProps) => (
    <div className='lt-tag'>
        {(tag.color !== undefined) ? <span>{tag.uri}</span> : <img src={tag.uri} alt={tag.name}/>}
    </div>
);

export default Tag;
