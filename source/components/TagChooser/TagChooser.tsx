import * as React from 'react';
import {useContext} from 'react';
import TagChooserPopup from "./TagChooserPopup";
import {VisibilityContext, VisibilityProvider} from "../../contexts/visibity";
import {SetProvider} from "../../contexts/sets";

const TagChooserButton = () => {
    const {visible, setVisible} = useContext(VisibilityContext);

    return (<button title='Show Tags'
                    className='lt-icon-button lt-effect-button' onClick={() => setVisible(!visible)}/>);
};

const TagChooser = () => {
    return (
    <VisibilityProvider>
        <TagChooserButton/>
        <SetProvider>
                <TagChooserPopup/>
        </SetProvider>
    </VisibilityProvider>
)
};


export default TagChooser;
