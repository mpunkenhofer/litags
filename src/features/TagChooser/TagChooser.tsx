import * as React from 'react';
import {useEffect, useState} from 'react';
import TagChooserPopup from "./TagChooserPopup";
import {useDispatch} from 'react-redux'
import {getSets} from "../../slices/sets";
import {getFrequentlyUsed} from "../../slices/frequentlyUsed";

const TagChooserButton = ({onClick}) => (
    <button title='Show Tags' className='lt-icon-button lt-effect-button' onClick={onClick}/>
);

const TagChooser = ({username}) => {
    const dispatch = useDispatch();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        dispatch(getSets());
        dispatch(getFrequentlyUsed());
    }, [dispatch]);

    return (
        <>
            <TagChooserButton onClick={() => setVisible(!visible)}/>
            {visible && <TagChooserPopup onClickOutside={() => setVisible(false)}/>}
        </>
    )
};

export default TagChooser;
