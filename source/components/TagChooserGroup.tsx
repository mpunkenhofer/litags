import * as React from 'react';
import {TagButton} from "./TagButton";

export default function TagChooserGroup({title, tags}) {
    return (
        <div className='lt-tcg'>
            <span className='lt-tcg-title'>{title}</span>
            <div className='lt-tcg-tags'>
                {Object.length && Object.entries(tags).map(([key, value]) => <TagButton key={key} tag={value}/>)}
            </div>
        </div>
    );
}
