import * as React from "react";
import TagButton from "../TagButton";
import {getBackgroundColor} from "../../util/color-tools";

const TagChooserGroup = ({set, onTagButtonClick}) => (
    <section className='lt-tcg'>
        <header style={{
            backgroundColor: getBackgroundColor(-.3),
            borderColor: getBackgroundColor(.15)
        }}
                className='lt-tcg-title'>{set.name}</header>
        <div className='lt-tcg-tags'>
            {
                set.tags.map(tagWithID =>
                    Object.entries(tagWithID).map(([id, tag]) =>
                        <TagButton key={id} id={id} tag={tag} onClick={onTagButtonClick}/>))
            }
        </div>
    </section>
);

export default TagChooserGroup;
