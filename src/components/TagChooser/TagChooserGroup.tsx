import * as React from "react";
import TagButton from "../TagButton";
import {getBackgroundColor} from "../../util/colorTools";
import {Set, Tag} from "../../api/storageAPI";

interface TagChooserGroupInterface {
    set: Set,
    onTagClicked: (tag: Tag) => () => void,
    icon?: React.ReactNode;
}

const TagChooserGroup = ({set, onTagClicked, icon}: TagChooserGroupInterface) => (
    <section className='lt-tcg'>
        <header style={{
            backgroundColor: getBackgroundColor(-.3),
            borderColor: getBackgroundColor(.15)
        }}
                className={'lt-tcg-header'}>
            {((set && set.icon_url) || icon) &&
            <div className={'lt-tcg-header-icon'}>
                {((set && set.icon_url) && !icon) && <img src={set.icon_url} alt={'Set Icon'}/>}
                {icon && icon}
            </div>
            }
            <span className={'lt-tcg-header-title'}>{set.name}</span>
        </header>
        <div className='lt-tcg-tags'>
            {
                set.tags.map(tag => (tag && tag.id) && <TagButton key={tag.id} tag={tag} onClick={onTagClicked(tag)}/>)
            }
        </div>
    </section>
);

export default TagChooserGroup;
