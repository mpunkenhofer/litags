import React, { useGlobal } from 'reactn'; // <-- reactn
import {useEffect, useRef, useState} from "react";
import TagChooserGroup from "./TagChooserGroup";
import {useClickedOutside} from "../../hooks/clickedOutside";
import {useFocusOnKeydown} from "../../hooks/focusOnKeydown";
import {getBackgroundColor} from "../../util/background-color";
import {shadeRGBAColor} from "../../util/shade-color";

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

const TagChooserPopup = ({visible, setVisible}) => {
    const [sets, setSets] = useGlobal('sets');

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

    if (visible && sets)
        return (
            <div ref={popupRef} className='lt-tc'
                 style={{backgroundColor: shadeRGBAColor(getBackgroundColor(), -.15)}}>
                <div className='lt-tcgs'>
                    {
                        (searchResults && searchResults.length != 0) &&
                        <TagChooserGroup key={'litags.searchResults'}
                                         set={{name: 'Search result', tags: searchResults}} setVisible={setVisible}/>
                    }
                    {
                        // frequentlyUsed.length != 0 &&
                        // <TagChooserGroup key={'litags.frequentlyUsed'}
                        //                  set={{name: 'Frequently used', tags: frequentlyUsed}}
                        //                  addTag={addTag}/>
                    }
                    {
                        Object.entries(sets).map(([id, set]) =>
                            <TagChooserGroup key={id} set={set} setVisible={setVisible}/>)
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

