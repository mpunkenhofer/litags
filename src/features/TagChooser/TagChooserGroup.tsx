import * as React from "react";
import TagButton from "../../components/TagButton";
import {getBackgroundColor} from "../../util/color-tools";

const TagChooserGroup = ({set, addTag, setVisible}) => {
    return (
        <section className='lt-tcg'>
            <header style={{
                backgroundColor: getBackgroundColor(-.3),
                borderColor: getBackgroundColor(.15)
            }}
                    className='lt-tcg-title'>{set.name}</header>
            <div className='lt-tcg-tags'>
                {
                    set.tags.map(tag => <TagButton key={tag.id} tag={tag} onClick={() => {
                        addTag(tag.id);
                        setVisible(false);
                    }}/>)
                }
            </div>
        </section>
    );
};

export default TagChooserGroup;
