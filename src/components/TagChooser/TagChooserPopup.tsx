import * as React from "react";
import {useContext, useEffect, useRef, useState} from "react";
import TagChooserGroup from "./TagChooserGroup";
import {useClickedOutside} from "../../hooks/clickedOutside";
import {useFocusOnKeydown} from "../../hooks/focusOnKeydown";
import {getBackgroundColor} from "../../util/color-tools";
import {SetContext} from "../../contexts/sets";

const reposition = (ref, padding: number = 0) => {
    if (ref && ref.current) {
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

const TagChooserPopup = ({onClickOutside}) => {
    const {sets, isFetching, addTag, searchTags} = useContext(SetContext);

    const popupRef = useRef(null);
    const inputRef = useRef(null);

    const [searchResults, setSearchResults] = useState([]);

    useClickedOutside(popupRef, onClickOutside);
    useFocusOnKeydown(inputRef);

    useEffect(() => {
        reposition(popupRef, 50);
    });

    const onInput = (e) => setSearchResults(searchTags((e.target as HTMLInputElement).value));

    if (!isFetching && sets)
        return (
            <div ref={popupRef} className='lt-tc' style={{backgroundColor: getBackgroundColor(-.15)}}>
                <div className='lt-tcgs'>
                    {
                        (searchResults && searchResults.length != 0) &&
                        <TagChooserGroup key={'litags.searchResults'}
                                         set={{name: 'Search result', tags: searchResults}}
                                         addTag={addTag}
                                         setVisible={onClickOutside}/>
                    }
                    {
                        // frequentlyUsed.length != 0 &&
                        // <TagChooserGroup key={'litags.frequentlyUsed'}
                        //                  set={{name: 'Frequently used', tags: frequentlyUsed}}
                        //                  addTag={addTag}/>
                    }
                    {
                        Object.entries(sets).map(([id, set]) =>
                            <TagChooserGroup key={id} set={set} addTag={addTag} setVisible={onClickOutside}/>)
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

