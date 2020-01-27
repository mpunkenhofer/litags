import TagButton from "../TagButton";
import * as React from "react";
import {useContext} from "react";
import {ColorContext} from "../../contexts/color";
import {VisibilityContext} from "../../contexts/visibity";

const TagChooserGroup = ({set, addTag}) => {
    const {shade} = useContext(ColorContext);
    const {setVisible} = useContext(VisibilityContext);

    return (
        <section className='lt-tcg'>
            <header style={{backgroundColor: shade(-.22), borderColor: shade(.15)}}
                    className='lt-tcg-title'>{set.name}</header>
            <div className='lt-tcg-tags'>
                {
                    set.tags.map(tagWithID =>
                        Object.entries(tagWithID).map(([id, tag]) =>
                            <TagButton key={id} tag={tag} onClick={() => {
                                addTag(id);
                                setVisible(false);
                            }}/>))
                }
            </div>
        </section>
    );
};

export default TagChooserGroup;
