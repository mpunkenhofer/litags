import * as React from 'react';
import {useCallback, useContext, useEffect, useRef, useState} from "react";
import {TagContext} from "../../contexts/tags";
import {UserContext} from "../../contexts/user";
import TagChooserGroup from "./TagChooserGroup";
import {groupBy, debounce} from 'lodash';
import {VisibilityContext} from "../../contexts/visibity";
import {useClickedOutside} from "../../hooks/clickedOutside";

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

const setFocus = (inputRef) => () => {
    const el: HTMLInputElement = inputRef.current;

    if (el)
        el.focus();
};

const TagChooserPopup = () => {
    const {addTag} = useContext(UserContext);
    const {visible, setVisible} = useContext(VisibilityContext);
    const {tags, isFetching, errorMessage, getFrequentlyUsed, search} = useContext(TagContext);

    const popupRef = useRef(null);
    const inputRef = useRef(null);

    const [searchResults, setSearchResults] = useState([]);

    const frequentlyUsed = useCallback(getFrequentlyUsed(), []);

    useClickedOutside(popupRef, () => setVisible(false));

    useEffect(() => {
        // if (visible && popupRef.current) {
        //     const [x, y] = calculatePos(popupRef.current.getBoundingClientRect(), 100);
        //     // popupRef.current.style.top = `${y}px`;
        //     // popupRef.current.style.left = `${x}px`;
        // }
        console.log('hello');
        // Bind the event listener
        document.addEventListener("keydown", setFocus(inputRef));
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("keydown", setFocus(inputRef));
        };
    });

    const handleOnInput = (e) => {
        const term = ((e.target as HTMLInputElement).value);
        setSearchResults(search(term))
    };

    if (errorMessage) {
        console.error(errorMessage);
    }

    if (visible && !isFetching && tags)
        return (
            <div ref={popupRef} className='lt-tc' style={{background: background()}}>
                <div className='lt-tcgs'>
                    {
                        (searchResults && searchResults.length != 0) &&
                        <TagChooserGroup key={'litags.searchResults'} title={'Search results'} tags={searchResults}
                                         addTag={addTag}/>
                    }
                    {
                        frequentlyUsed.length != 0 &&
                        <TagChooserGroup key={'litags.frequentlyUsed'} title={'Frequently used'} tags={frequentlyUsed}
                                         addTag={addTag}/>
                    }
                    {
                        Object.entries(groupBy(tags, (tag) => tag.set)).map(([title, tags]) =>
                            <TagChooserGroup key={title} title={title} tags={tags} addTag={addTag}/>)
                    }
                </div>
                <input ref={inputRef} className='lt-tc-search' type='search' autoCapitalize='off' autoComplete='off'
                       spellCheck='false' placeholder='Search Tags...'
                       onInput={handleOnInput}/>
            </div>
        );
    else {
        return <></>;
    }
};

export default TagChooserPopup;

