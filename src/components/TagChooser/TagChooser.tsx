import * as React from 'react';
import {useEffect, useState} from 'react';
import TagChooserPopup from "./TagChooserPopup";
import {useDispatch} from 'react-redux'
import {getSets} from "../../slices/sets";
import {getFrequentlyUsed} from "../../slices/frequentlyUsed";
import {Tag} from "../../api/storageAPI";
import {addTag} from "../../slices/user";
import {browser} from "webextension-polyfill-ts";

interface TagChooserButtonProps {
    onClick: () => void
}

const TagChooserButton = ({onClick}: TagChooserButtonProps) => (
    <button title='Show Tags' className='lt-icon-button lt-effect-button' onClick={onClick}/>
);

interface TagChooserProps {
    username: string
}

// const randomHandler = (message) => {
//     console.log('>>>>>>>>>>>..........', message);
// };

const TagChooser = ({username}: TagChooserProps) => {
    const dispatch = useDispatch();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        console.log(`%cLoading Sets and Freq Used`, 'font-size: 1.5em; font-weight: bold; color: red');
        dispatch(getSets());
        dispatch(getFrequentlyUsed());
    }, [dispatch]);

    // useEffect(() => {
    //     browser.runtime.onMessage.addListener(randomHandler);
    //     return () => {
    //         browser.runtime.onMessage.removeListener(randomHandler)
    //     }
    // }, []);

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
