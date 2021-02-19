import * as React from "react";
import { FormEvent, useRef, useState } from "react";
import TagChooserGroup from "./TagChooserGroup";
import { useFocusOnAnyKeydown } from "../../hooks/focusOnKeydown";
import { useCallback, useMemo } from "react";
import { useSelector } from 'react-redux'
import { RootState } from "../../common/rootReducer";
import { Tag } from "../../types";
import FocusTrap from "focus-trap-react";
import { i18n } from "../../constants/i18n";
import { browser } from "webextension-polyfill-ts";
import { getTheme } from "../../common/theme";

interface TagChooserPopupInterface {
    onClickOutside: () => void;
    onTagClicked: (tag: Tag) => () => void;
}

const TagChooserPopup: React.FunctionComponent<TagChooserPopupInterface> =
    ({ onClickOutside, onTagClicked }: TagChooserPopupInterface) => {
        const { sets, loading, error } = useSelector((state: RootState) => state.sets);
        const { frequentlyUsed } = useSelector((state: RootState) => state.frequentlyUsed);
        const { options } = useSelector((state: RootState) => state.options);

        const [searchResults, setSearchResults] = useState<Tag[]>([]);

        const inputRef = useRef<HTMLInputElement | null>(null);

        useFocusOnAnyKeydown(inputRef, ['Tab', 'Enter']);

        const tags = useMemo(() => {
            let allTags: Tag[] = [];

            for (const set of sets)
                allTags = [...allTags, ...set.tags]
            
            return allTags;
        }, [sets]);

        const searchTags = useCallback(term => {
            if (!term || term.length < 1)
                return [];
                
            term = term.toLowerCase();

            return tags.filter(tag => tag.name.toLowerCase().includes(term) ||
                (tag.aliases && tag.aliases.find(alias => alias.toLowerCase().includes(term))));
        }, [tags]);

        const onInput = (e: FormEvent<HTMLInputElement>): void =>
            setSearchResults(searchTags((e.target as HTMLInputElement).value));

        if (error) {
            console.error(error);
            return <></>;
        } else if (!loading && sets)
            return (
                <FocusTrap focusTrapOptions={{
                    clickOutsideDeactivates: true,
                    onDeactivate: onClickOutside,
                    initialFocus: (): HTMLElement => inputRef.current || new HTMLElement(),
                }}>
                    <div className='lt-tag-chooser' style={{ backgroundColor: getTheme().primaryBackgroundColor, borderColor: getTheme().borderColor }}>
                        <div className='lt-sets'>
                            {
                                (searchResults.length > 0) &&
                                <TagChooserGroup key={'litags.searchResults'}
                                    set={{
                                        id: '0',
                                        name: `(${searchResults.length}) ${i18n.searchResults}`,
                                        tags: searchResults,
                                        iconUrl: ''
                                    }}
                                    onTagClicked={onTagClicked}
                                    className={'search-results'}
                                    icon={<i className={'lt-lichess-icon'} data-icon='y'/>} />
                            }
                            {
                                ((frequentlyUsed.length > 0) && (options.showFrequentlyUsed !== false)) &&
                                <TagChooserGroup key={'litags.frequentlyUsed'}
                                    set={{
                                        id: '1',
                                        name: i18n.frequentlyUsed,
                                        tags: frequentlyUsed
                                            .slice(0, options.frequentlyUsedLimit)
                                            .map(freqUsed => freqUsed.tag),
                                        iconUrl: browser.runtime.getURL('assets/images/star-solid.svg')
                                    }}
                                    onTagClicked={onTagClicked}
                                    className={'favorites'}
                                    icon={<i className={'lt-lichess-icon'} data-icon='s'/>} />
                            }
                            {
                                Object.values(sets).map(set =>
                                    <TagChooserGroup key={set.id} set={set} onTagClicked={onTagClicked} />)
                            }
                            {/* <a href={browser.runtime.getURL('options.html')} target={'_blank'} rel={'noopener noreferrer'}>LiTags Options</a> */}
                        </div>
                        {
                            (options.showSearchField !== false) &&
                            <div className={'lt-set-search'} style={{backgroundColor: getTheme().secondaryBackgroundColor, borderColor: getTheme().borderColor}}>
                                <i className={'lt-lichess-icon'} data-icon='y' onClick={(): void => {
                                    if(inputRef && inputRef.current) {
                                        inputRef.current.focus();
                                    }
                                }}/>
                                <input ref={inputRef} type='search' autoCapitalize='off'
                                    autoComplete='off'
                                    spellCheck='false' placeholder={i18n.searchTagsPlaceHolder}
                                    onInput={onInput} />
                            </div>
                        }
                    </div>
                </FocusTrap>
            );
        else {
            return <></>;
        }
    };

export default TagChooserPopup;
