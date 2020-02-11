import React, {useDispatch} from 'reactn';
import TagButton from "../TagButton";
import {shadeRGBAColor} from "../../util/shade-color";
import {getBackgroundColor} from "../../util/background-color";

const TagChooserGroup = ({set, setVisible}) => {
    return (
        <section className='lt-tcg'>
            <header style={{backgroundColor:  shadeRGBAColor(getBackgroundColor(), -.22),
                borderColor: shadeRGBAColor(getBackgroundColor(),.15)}}
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
