import * as React from 'react';
import {useContext, useEffect, useRef} from "react";
import {TagSearch} from "../TagSearch";
import {TagContext} from "../../contexts/tags";
import {UserContext} from "../../contexts/user";
import TagButton from "../TagButton";

const background = () => {
    const backgroundElement = document.querySelector('.round__app__table');
    if (backgroundElement) {
        const style = getComputedStyle(backgroundElement);
        if (style && style.background)
            return style.background;
    }
    return 'inherit';
};

const calculatePos = (rect: DOMRect, padding: number = 0) => {
    let [x, y] = [rect.x, rect.y];

    // TODO fix positioning while scrolling
    if ((rect.y + rect.height + padding) > (window.innerHeight - window.scrollY))
        y = rect.y - ((rect.y + rect.height + padding) - (window.innerHeight - window.scrollY));

    if ((rect.x + rect.width + padding) > window.innerWidth)
        x = rect.x - ((rect.x + rect.width + padding) - window.innerWidth);

    return [x, y];
};

const groupBySet = (tags) => {
    const result = {};
    for (const tag in tags) {
        if (tags.hasOwnProperty(tag)) {
            if (!tags[tag].hasOwnProperty('set'))
                break;

            const setName = tags[tag].set;

            if (setName) {
                const t = result[setName];
                result[setName] = {...t, ...{[tag]: tags[tag]}}
            }
        }
    }
    return result;
};

const TagChooserPopup = ({visible}) => {
    const ref = useRef(null);
    const {tags, isFetching, errorMessage} = useContext(TagContext);
    const {addTag} = useContext(UserContext);

    useEffect(() => {
        if (visible && ref.current) {
            const [x, y] = calculatePos(ref.current.getBoundingClientRect(), 100);
            ref.current.style.top = `${y}px`;
            ref.current.style.left = `${x}px`;
        }
    }, [visible]);

    if (errorMessage) {
        console.error(errorMessage);
    }

    if (visible && !isFetching && tags)
        return (
            <div ref={ref} className='lt-tc' style={{background: background()}}>
                <div className='lt-tcgs'>
                    {
                        Object.entries.length != 0 && Object.entries(groupBySet(tags)).map(([title, tags]) => (
                            <div key={title} className='lt-tcg'>
                                <span className='lt-tcg-title'>{title}</span>
                                <div className='lt-tcg-tags'>
                                    {Object.length && Object.entries(tags).map(([key, tag]) =>
                                        <TagButton key={key} tag={tag} onClick={addTag}/>)}
                                </div>
                            </div>))
                    }
                </div>
                <TagSearch/>
            </div>);
    else {
        return <></>;
    }
};

export default TagChooserPopup;

