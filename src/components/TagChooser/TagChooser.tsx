import * as React from 'react';
import {useCallback, useState} from 'react';
import TagChooserPopup from "./TagChooserPopup";
import {useDispatch} from 'react-redux'
import {Tag} from "../../common/types";
import {addTag} from "../../slices/user";
import {i18n} from "../../constants/i18n";
import {useEffect} from "react";
import {browser} from "webextension-polyfill-ts";

interface TagChooserButtonProps {
    onClick: () => void;
}

const TagChooserButton: React.FunctionComponent<TagChooserButtonProps> = ({onClick}: TagChooserButtonProps) => (
    <button title={i18n.showTags} className='lt-button-effect' data-icon='O' onClick={onClick} />
);

interface TagChooserProps {
    id: string;
    keyboardShortcutsEnabled?: boolean;
}

const TagChooser: React.FunctionComponent<TagChooserProps> =
    ({id: username, keyboardShortcutsEnabled}: TagChooserProps) => {
        const dispatch = useDispatch();
        const [visible, setVisible] = useState(false);

        const shortcutHandler = useCallback((message: {command: string}) => {
            if (keyboardShortcutsEnabled == true && message.command == 'toggle-tag-chooser-popup') {
                setVisible(!visible)
            }
        }, [visible, setVisible, keyboardShortcutsEnabled]);

        useEffect(() => {
                browser.runtime.onMessage.addListener(shortcutHandler);
                return (): void => {
                    browser.runtime.onMessage.removeListener(shortcutHandler)
                }
        }, [shortcutHandler]);


        const onTagClicked = (tag: Tag) => (): void => {
            dispatch(addTag(username, tag));
            setVisible(false);
        };

        const onClickedOutside = (): void => {
            setVisible(false);
        };

        return (
            <>
                <TagChooserButton onClick={(): void => setVisible(!visible)}/>
                {visible && <TagChooserPopup onClickOutside={onClickedOutside} onTagClicked={onTagClicked}/>}
            </>
        )
    };

export default TagChooser;
