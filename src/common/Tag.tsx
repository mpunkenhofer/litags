import * as React from 'react';
import {Tag} from "../common/types";
import {i18n} from "../constants/i18n";
import {LINKS} from "../constants/links";

interface TagProps {
    tag: Tag;
}

const Tag: React.FunctionComponent<TagProps> = ({tag}: TagProps) => (
    <div className='lt-tag'>
        {
            //TODO don't hardcode width, height here maybe
            (!tag.uri) ? <img src={LINKS.DEFAULT_TAG} alt={i18n.defaultTag}
                              style={{width: '1.6rem', height: '1.6rem'}}/> : (
                (tag.color !== undefined) ?
                    ((tag.color.length > 0) ? <span style={{color: tag.color}}>{tag.uri}</span> :
                        <span>{tag.uri}</span>)
                    : <img src={tag.uri} alt={tag.name}/>)
        }
    </div>
);

export default Tag;
