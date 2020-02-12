import * as React from 'react';
import {useState} from 'react';
import TagChooserPopup from "./TagChooserPopup";
import {SetProvider} from "../../contexts/sets";

const TagChooserButton = ({onClick}) => (
    <button title='Show Tags' className='lt-icon-button lt-effect-button' onClick={onClick}/>
);

const TagChooser = () => {
    const [visible, setVisible] = useState(false);

    return (
        <>
            <TagChooserButton onClick={() => setVisible(!visible)}/>
            <SetProvider>
            {visible && <TagChooserPopup onClickOutside={() => setVisible(false)}/>}
            </SetProvider>
        </>
    )
};

export default TagChooser;
