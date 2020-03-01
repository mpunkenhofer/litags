import * as React from 'react';
import {useState} from 'react';
import TagChooserPopup from "./TagChooserPopup";
import {useDispatch} from 'react-redux'
import {Tag} from "../../api/storageAPI";
import {addTag} from "../../slices/user";
import {useBrowserKeyboardShortcuts} from "../../hooks/browserKeybordShortcuts";
import {i18n} from "../../constants/i18n";

interface TagChooserButtonProps {
    onClick: () => void;
}

const TagChooserButton: React.FunctionComponent<TagChooserButtonProps> = ({onClick}: TagChooserButtonProps) => (
    <button title={i18n.showTags} className='lt-plus-icon lt-button-effect' onClick={onClick}/>
);

interface TagChooserProps {
    username: string;
    keyboardShortcutsEnabled?: boolean;
}

const TagChooser: React.FunctionComponent<TagChooserProps> =
    ({username, keyboardShortcutsEnabled}: TagChooserProps) => {
        const dispatch = useDispatch();
        const [visible, setVisible] = useState(false);

        useBrowserKeyboardShortcuts({
            shortcut: 'toggle-tag-chooser-popup', handler: () => {
                if (keyboardShortcutsEnabled === true)
                    setVisible(!visible)
            }
        });


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
