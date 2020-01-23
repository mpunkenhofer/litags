import TagButton from "../TagButton";
import * as React from "react";

const TagChooserGroup = ({title, tags, addTag}) => (
    <div key={title} className='lt-tcg'>
        <span className='lt-tcg-title'>{title}</span>
        <div className='lt-tcg-tags'>
            {Object.length && Object.entries(tags).map(([key, tag]) =>
                <TagButton key={key} tag={tag} onClick={addTag}/>)}
        </div>
    </div>
);

export default TagChooserGroup;
