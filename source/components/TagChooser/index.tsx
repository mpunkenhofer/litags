import * as React from 'react';
import {useState} from 'react';
import {useRef} from "react";
import {useClickedOutside} from "../../hooks/clickedOutside";
import {TagProvider} from "../../contexts/tags";
import TagChooserPopup from "./TagChooserPopup";

const TagChooser = () => {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useClickedOutside(ref, () => setVisible(false));

    return (
        <div ref={ref}>
            <button title='Show Tags'
                    className='lt-icon-button lt-effect-button' onClick={() => setVisible(!visible)}/>
            <TagProvider>
                <TagChooserPopup visible={visible}/>
            </TagProvider>
        </div>
    );
};

export default TagChooser;
