import * as React from 'react';
import {ENDPOINTS, METHODS} from "../api";
import {getTags, getTagsErrorMessage, getTagsIsFetching} from "../selectors";
import {useEffect, useRef} from "react";
import * as actions from "../actions";
import {useDispatch, useSelector} from 'react-redux'
import TagChooserGroup from "./TagChooserGroup";
import {TagSearch} from "./TagSearch";

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

export const TagChooser = ({visible}) => {
    const dispatch = useDispatch();
    const tags = useSelector(getTags);
    const isFetching = useSelector(getTagsIsFetching);
    const errorMessage = useSelector(getTagsErrorMessage);
    const ref = useRef(null);

    useEffect(() => {
        actions.fetch(ENDPOINTS.TAGS, METHODS.GET)(dispatch, isFetching);
    }, []);

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
                    {Object.entries(groupBySet(tags)).map(([key, value]) =>
                        <TagChooserGroup key={key} title={key} tags={value}/>)}
                </div>
                <TagSearch/>
            </div>);
    else {
        return <></>;
    }
};
