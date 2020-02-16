import * as React from "react";
import TagButton from "../../components/TagButton";
import {getBackgroundColor} from "../../util/colorTools";
import {Set, Tag} from "../../api/storageAPI";

interface TagChooserGroupInterface {
    set: Set,
    onTagClicked: (tag: Tag) => () => void
}

const TagChooserGroup = ({set, onTagClicked}: TagChooserGroupInterface) => (
    <section className='lt-tcg'>
        <header style={{
            backgroundColor: getBackgroundColor(-.3),
            borderColor: getBackgroundColor(.15)
        }}
                className='lt-tcg-title'>{set.name}</header>
        <div className='lt-tcg-tags'>
            {
                set.tags.map(tag => <TagButton key={tag.id} tag={tag} onClick={onTagClicked(tag)}/>)
            }
        </div>
    </section>
);

export default TagChooserGroup;
