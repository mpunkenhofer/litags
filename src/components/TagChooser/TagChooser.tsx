import * as React from 'react';
import {useState} from 'react';
import TagChooserPopup from "./TagChooserPopup";
import {useDispatch} from 'react-redux'
import {Tag} from "../../api/storageAPI";
import {addTag} from "../../slices/user";
import {useBrowserKeyboardShortcuts} from "../../hooks/browserKeybordShortcuts";

interface TagChooserButtonProps {
    onClick: () => void
}

const TagChooserButton = ({onClick}: TagChooserButtonProps) => (
    <button title='Show Tags' className='lt-plus-icon lt-button-effect' onClick={onClick}/>
);

interface TagChooserProps {
    username: string
    keyboardShortcutsEnabled?: boolean
}

const TagChooser = ({username, keyboardShortcutsEnabled }: TagChooserProps) => {
    const dispatch = useDispatch();
    const [visible, setVisible] = useState(false);

    if(keyboardShortcutsEnabled === true) {
        useBrowserKeyboardShortcuts({shortcut: 'toggle-tag-chooser-popup', handler: () => setVisible(!visible)});
    }

    const onTagClicked = (tag: Tag) => () => {
        dispatch(addTag(username, tag));
        setVisible(false);
    };

    const onClickedOutside = () => {
        setVisible(false);
    };

    return (
        <>
            <TagChooserButton onClick={() => setVisible(!visible)}/>
            {visible && <TagChooserPopup onClickOutside={onClickedOutside} onTagClicked={onTagClicked}/>}
        </>
    )
};

export default TagChooser;
