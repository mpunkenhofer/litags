import * as React from "react";
import {useRef, useState} from "react";
import TagChooserGroup from "./TagChooserGroup";
import {useClickedOutside} from "../../hooks/clickedOutside";
import {useFocusOnKeydown} from "../../hooks/focusOnKeydown";
import {getBackgroundColor} from "../../util/colorTools";
import {useCallback} from "react";
import {useSelector} from 'react-redux'
import {RootState} from "../../app/rootReducer";
import {Tag} from "../../api/storageAPI";
import isEmpty from 'lodash/isempty';

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

interface TagChooserPopupInterface {
    onClickOutside: () => void,
    onTagClicked: (tag: Tag) => () => void
}

const TagChooserPopup = ({onClickOutside, onTagClicked}: TagChooserPopupInterface) => {
    const {sets, tagsById, loading, error} = useSelector((state: RootState) => state.sets);
    const {frequentlyUsed} = useSelector((state: RootState) => state.frequentlyUsed);

    const [searchResults, setSearchResults] = useState([]);

    const popupRef = useRef(null);
    const inputRef = useRef(null);

    useClickedOutside(popupRef, onClickOutside);
    useFocusOnKeydown(inputRef);

    // useEffect(() => {
    //     reposition(popupRef, 50);
    // });

    const searchTags = useCallback(term => {
        if (!term || term.length < 1)
            return [];

        term = term.toLowerCase();

        return Object.values(tagsById).filter(tag => tag.name.toLowerCase().includes(term)
            || tag.aliases.find(alias => alias.toLowerCase().includes(term)));
    }, [tagsById]);

    const onInput = (e) => setSearchResults(searchTags((e.target as HTMLInputElement).value));

    if (error) {
        console.error(error);
        return <></>;
    } else if (!loading && sets)
        return (
            <div ref={popupRef} className='lt-tc' style={{backgroundColor: getBackgroundColor(-.15)}}>
                <div className='lt-tcgs'>
                    {
                        (searchResults && searchResults.length != 0) &&
                        <TagChooserGroup key={'litags.searchResults'}
                                         set={{
                                             id: '0', name: 'Search result', tags: searchResults,
                                             icon_url: '', font_url: ''
                                         }}
                                         onTagClicked={onTagClicked}/>
                    }
                    {
                        (!isEmpty(tagsById) && frequentlyUsed && frequentlyUsed.length > 0) &&
                        <TagChooserGroup key={'litags.frequentlyUsed'}
                                         set={{
                                             id: '1', name: 'Frequently used',
                                             tags: frequentlyUsed.map(pair =>
                                                 tagsById[pair[0]] ? tagsById[pair[0]] : null),
                                             icon_url: '', font_url: ''
                                         }}
                                         onTagClicked={onTagClicked}/>
                    }
                    {
                        Object.values(sets).map(set =>
                            <TagChooserGroup key={set['id']} set={set} onTagClicked={onTagClicked}/>)
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
