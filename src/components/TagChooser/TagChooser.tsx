import {useEffect, useState} from 'react';
import TagChooserPopup from "./TagChooserPopup";
import React, {useDispatch} from 'reactn';

const TagChooserButton = (onClick) => {
    return (
        <button title='Show Tags'
                className='lt-icon-button lt-effect-button' onClick={onClick}/>
    );
};

const TagChooser = ({username}) => {
    const [visible, setVisible] = useState(false);
    const getUser = useDispatch('getUser');

    useEffect(() => {
        getUser(username);
    });

    return (
        <>
            <TagChooserButton onClick={() => setVisible(!visible)}/>
            <TagChooserPopup visible={visible} setVisible={setVisible}/>
        </>
    )
};

export default TagChooser;
