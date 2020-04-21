import * as React from "react";
import TagButton from "../TagButton";
import { getBackgroundColor } from "../../common/colorTools";
import { Set, Tag } from "../../common/types";

interface TagChooserGroupInterface {
    set: Set;
    onTagClicked: (tag: Tag) => () => void;
    className?: string;
}

//TODO: handle icon sizes better
const TagChooserGroup: React.FunctionComponent<TagChooserGroupInterface> = ({ set, onTagClicked, className }: TagChooserGroupInterface) => (
    <section className={`lt-set${(className !== undefined) ? ` ${className}` : ''}`}>
        <header className={'lt-set-header'} style={{ backgroundColor: getBackgroundColor(-.3), borderColor: getBackgroundColor(.15) }}>
            {
                ((set && set.iconUrl)) &&
                <div className={'lt-set-icon'}>
                    {
                        (set && set.iconUrl) &&
                        (
                            set.iconUrl.endsWith('.svg') ?
                                <img src={set.iconUrl} alt={'set icon'}
                                    style={{fill: 'red'}} /> :
                                <img src={set.iconUrl} alt={'set icon'} />
                        )
                    }
                </div>
            }
            <span className={'lt-set-title'}>{set.name}</span>
        </header>
        <div className='lt-set-tags'>
            {
                set.tags.map(tag => (tag && tag.id) && <TagButton key={tag.id} tag={tag} onClick={onTagClicked(tag)} />)
            }
        </div>
    </section>
);

export default TagChooserGroup;
