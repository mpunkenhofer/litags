import * as React from "react";
import TagButton from "../TagButton";
import { Set, Tag } from "../../types";
import { getTheme } from "../../common/theme";

interface TagChooserGroupInterface {
    set: Set;
    onTagClicked: (tag: Tag) => () => void;
    className?: string;
    icon?: React.ReactNode;
}

const TagChooserGroup: React.FunctionComponent<TagChooserGroupInterface> = ({ set, onTagClicked, className, icon }: TagChooserGroupInterface) => (
    <section className={`lt-set${(className !== undefined) ? ` ${className}` : ''}`}>
        <header className={'lt-set-header'} style={{ backgroundColor: getTheme().secondaryBackgroundColor, borderColor: getTheme().borderColor }}>
            {
                <div className={'lt-set-icon'}>
                    {
                        (icon !== undefined) ? icon : set.iconUrl && <img src={set.iconUrl} alt={'set icon'} />
                    }
                </div>
            }
            <strong className={'lt-set-title'}>{set.name}</strong>
        </header>
        <div className='lt-set-tags' style={{ borderColor: getTheme().borderColor }}>
            {
                set.tags.map(tag => (tag && tag.id) && <TagButton key={tag.id} tag={tag} onClick={onTagClicked(tag)} />)
            }
        </div>
    </section>
);

export default TagChooserGroup;
