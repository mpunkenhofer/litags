import * as React from 'react';

const Tag = ({tag}) => (
    <div className='lt-tag'>
        {(tag.hasOwnProperty('color') && tag.color.length > 2)? <span>{tag.uri}</span> : <img src={tag.uri}></img>}
    </div>
);

export default Tag;
