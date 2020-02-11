import React, { useGlobal } from 'reactn'; // <-- reactn
import {useContext, useEffect, useRef, useState} from "react";
import {UserContext} from "../../contexts/user";
import TagChooserGroup from "./TagChooserGroup";
import {VisibilityContext} from "../../contexts/visibity";
import {useClickedOutside} from "../../hooks/clickedOutside";
import {useFocusOnKeydown} from "../../hooks/focusOnKeydown";
import {ColorContext} from "../../contexts/color";
import {SetContext} from "../../contexts/sets";

const reposition = (ref, padding: number = 0) => {
    if(ref && ref.current) {
        const rect = ref.current.getBoundingClientRect();

        let [x, y] = [rect.x, rect.y];
        [x, y] = [x, y];

        // if ((y + rect.height + padding) > (window.innerHeight))
        //     y = y - ((y + rect.height + padding) - (window.innerHeight));
        //
        // if ((x + rect.width + padding) > window.innerWidth)
        //     x = x - ((x + rect.width + padding) - window.innerWidth);

        ref.current.style.top = `${y}px`;
        ref.current.style.left = `${x}px`;
    }
};

const TagChooserPopup = () => {
    const {addTag} = useContext(UserContext);
    const {visible, setVisible} = useContext(VisibilityContext);
    const {sets, isFetching, errorMessage, search} = useContext(SetContext);
    const {shade} = useContext(ColorContext);

    const popupRef = useRef(null);
    const inputRef = useRef(null);

    const [searchResults, setSearchResults] = useState([]);

    useClickedOutside(popupRef, () => setVisible(false));
    useFocusOnKeydown(inputRef);

    useEffect(() => {
        if (visible)
            reposition(popupRef, 50);
    });

    const onInput = (e) => setSearchResults(search((e.target as HTMLInputElement).value));

    if (errorMessage) {
        console.log(errorMessage);
    }

    if (visible && !isFetching && sets)
        return (
            <div ref={popupRef} className='lt-tc' style={{backgroundColor: shade(-.15)}}>
                <div className='lt-tcgs'>
                    {
                        (searchResults && searchResults.length != 0) &&
                        <TagChooserGroup key={'litags.searchResults'}
                                         set={{name: 'Search result', tags: searchResults}}
                                         addTag={addTag}/>
                    }
                    {
                        // frequentlyUsed.length != 0 &&
                        // <TagChooserGroup key={'litags.frequentlyUsed'}
                        //                  set={{name: 'Frequently used', tags: frequentlyUsed}}
                        //                  addTag={addTag}/>
                    }
                    {
                        Object.entries(sets).map(([id, set]) =>
                            <TagChooserGroup key={id} set={set} addTag={addTag}/>)
                    }
                </div>
                <input ref={inputRef} className='lt-tc-search' type='search' autoCapitalize='off' autoComplete='off'
                       spellCheck='false' placeholder='Search Tags...'
                       onInput={onInput}/>
            </div>
        );
    else {
        return <></>;
    }
};

export default TagChooserPopup;

