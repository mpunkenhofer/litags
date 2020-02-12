import * as React from 'react';
import {useEffect, useState} from 'react';
import TagChooserPopup from "./TagChooserPopup";
import * as actions from "../../actions";
import {useDispatch} from 'react-redux'

const TagChooserButton = ({onClick}) => (
    <button title='Show Tags' className='lt-icon-button lt-effect-button' onClick={onClick}/>
);

const TagChooser = ({username}) => {
    const dispatch = useDispatch();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        dispatch(actions.getSets());
        dispatch(actions.getFrequentlyUsed());
    }, []);

    return (
        <>
            <TagChooserButton onClick={() => setVisible(!visible)}/>
            {visible && <TagChooserPopup onClickOutside={() => setVisible(false)}/>}
        </>
    )
};

export default TagChooser;
