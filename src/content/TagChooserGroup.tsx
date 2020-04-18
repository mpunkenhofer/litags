import * as React from "react";
import TagButton from "../common/TagButton";
import { getBackgroundColor } from "../common/colorTools";
import { Set, Tag } from "../common/types";

interface TagChooserGroupInterface {
    set: Set;
    onTagClicked: (tag: Tag) => () => void;
}

//TODO: handle icon sizes better
const TagChooserGroup: React.FunctionComponent<TagChooserGroupInterface> = ({ set, onTagClicked }: TagChooserGroupInterface) => (
    <section className='lt-tcg'>
        <header style={{
            backgroundColor: getBackgroundColor(-.3),
            borderColor: getBackgroundColor(.15)
        }}
            className={'lt-tcg-header'}>
            {((set && set.iconUrl)) &&
                <div className={'lt-tcg-header-icon'}>
                    {(set && set.iconUrl) && <img src={set.iconUrl} alt={'Set Icon'}
                        style={{ width: '2rem', height: '2rem' }} />}
                </div>
            }
            <span className={'lt-tcg-header-title'}>{set.name}</span>
        </header>
        <div className='lt-tcg-tags'>
            {
                set.tags.map(tag => (tag && tag.id) && <TagButton key={tag.id} tag={tag} onClick={onTagClicked(tag)} />)
            }
        </div>
    </section>
);

export default TagChooserGroup;
