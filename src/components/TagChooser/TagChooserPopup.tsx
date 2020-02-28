import * as React from "react";
import {useEffect, useRef, useState} from "react";
import TagChooserGroup from "./TagChooserGroup";
import {useFocusOnAnyKeydown} from "../../hooks/focusOnKeydown";
import {getBackgroundColor} from "../../util/colorTools";
import {useCallback} from "react";
import {useSelector} from 'react-redux'
import {RootState} from "../../app/rootReducer";
import {Tag} from "../../api/storageAPI";
import isEmpty from 'lodash/isempty';
import FocusTrap from "focus-trap-react";
import {i18n} from "../../constants/i18n";

interface TagChooserPopupInterface {
    onClickOutside: () => void,
    onTagClicked: (tag: Tag) => () => void
}

const TagChooserPopup = ({onClickOutside, onTagClicked}: TagChooserPopupInterface) => {
    const {sets, tagsById, loading, error} = useSelector((state: RootState) => state.sets);
    const {frequentlyUsed} = useSelector((state: RootState) => state.frequentlyUsed);

    const [searchResults, setSearchResults] = useState([]);

    const inputRef = useRef(null);

    useFocusOnAnyKeydown(inputRef, ['Tab', 'Enter']);

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
            <FocusTrap focusTrapOptions={{
                clickOutsideDeactivates: true,
                onDeactivate: onClickOutside,
                initialFocus: () => ((inputRef && inputRef.current) ? inputRef.current : null)
            }}>
                <div className='lt-tc' style={{backgroundColor: getBackgroundColor(-.15)}}>
                    <div className='lt-tcgs'>
                        {
                            (searchResults && searchResults.length != 0) &&
                            <TagChooserGroup key={'litags.searchResults'}
                                             set={{
                                                 id: '0', name: i18n.searchResults, tags: searchResults,
                                                 icon_url: '', font_url: ''
                                             }}
                                             icon={<span className={'lt-search-icon'}/>}
                                             onTagClicked={onTagClicked}/>
                        }
                        {
                            (!isEmpty(tagsById) && frequentlyUsed && frequentlyUsed.length > 0) &&
                            <TagChooserGroup key={'litags.frequentlyUsed'}
                                             set={{
                                                 id: '1', name: i18n.frequentlyUsed,
                                                 tags: frequentlyUsed.map(pair =>
                                                     tagsById[pair[0]] ? tagsById[pair[0]] : null),
                                                 icon_url: '', font_url: ''
                                             }}
                                             icon={<span className={'lt-star-icon'}/>}
                                             onTagClicked={onTagClicked}/>
                        }
                        {
                            Object.values(sets).map(set =>
                                <TagChooserGroup key={set['id']} set={set} onTagClicked={onTagClicked}/>)
                        }
                    </div>
                    <input ref={inputRef} className='lt-tc-search' type='search' autoCapitalize='off' autoComplete='off'
                           spellCheck='false' placeholder={i18n.searchTagsPlaceHolder}
                           onInput={onInput}/>
                </div>
            </FocusTrap>
        );
    else {
        return <></>;
    }
};

export default TagChooserPopup;
