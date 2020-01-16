import * as React from 'react';

export const Tag = ({tag}) => {
    return <div className='lt-tag'>
        {tag.hasOwnProperty('color') ? <span>{tag.resource}</span> : <img src={tag.resource}></img>}</div>;
};
