import * as React from 'react';
import { Tag } from "../common/types";
import { i18n } from "../constants/i18n";
import { browser } from "webextension-polyfill-ts";

interface TagProps {
    tag: Tag;
}

const Tag: React.FunctionComponent<TagProps> = ({ tag }: TagProps) => (
    <div className='lt-tag'>
        {
            //TODO don't hardcode width, height here maybe
            (!tag.uri) ? <img src={browser.runtime.getURL('assets/images/tag-solid.svg')} alt={i18n.defaultTag}
                style={{ width: '1.6rem', height: '1.6rem' }} /> : (
                    (tag.font !== undefined) ?
                        ((tag.color && tag.color.length > 0) ?
                            <span style={{ color: tag.color }}>{tag.uri}</span> :
                            <span>{tag.uri}</span>)
                        : <img src={tag.uri} alt={tag.name} />)
        }
    </div>
);

export default Tag;
