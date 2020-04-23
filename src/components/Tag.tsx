import * as React from 'react';
import { Tag } from "../types";
import { i18n } from "../constants/i18n";
import { browser } from "webextension-polyfill-ts";

interface TagProps {
    tag: Tag;
}

const Tag: React.FunctionComponent<TagProps> = ({ tag }: TagProps) => (
    !tag.uri ?
        <img className={'lt-tag'} src={browser.runtime.getURL('assets/images/tag-solid.svg')} alt={i18n.defaultTag} /> :
        (
            (tag.font !== undefined) ?
                (
                    (tag.color && tag.color.length > 0) ?
                        <span className={'lt-tag'} style={{ fontFamily: tag.font.fontFamily, color: tag.color }}>{tag.uri}</span> :
                        <span className={'lt-tag'} style={{ fontFamily: tag.font.fontFamily }}>{tag.uri}</span>
                )
                : <img className={'lt-tag'} src={tag.uri} alt={tag.name} />
        )
);

export default Tag;
