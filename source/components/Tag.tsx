import * as React from 'react';

const Tag = ({tag}) => {
    return (
        <div className='lt-tag'>
            {tag.hasOwnProperty('color') ? <span>{tag.resource}</span> : <img src={tag.resource}></img>}
        </div>);
};

export default Tag;
