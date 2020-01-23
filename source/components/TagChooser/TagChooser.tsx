import * as React from 'react';
import {useContext} from 'react';
import TagChooserPopup from "./TagChooserPopup";
import {VisibilityContext, VisibilityProvider} from "../../contexts/visibity";
import {TagProvider} from "../../contexts/tags";

const TagChooserButton = () => {
    const {visible, setVisible} = useContext(VisibilityContext);

    return (<button title='Show Tags'
                className='lt-icon-button lt-effect-button' onClick={() => setVisible(!visible)}/>);
};

const TagChooser = () => (
    <VisibilityProvider>
        <TagChooserButton/>
        <TagProvider>
            <TagChooserPopup/>
        </TagProvider>
    </VisibilityProvider>
);


export default TagChooser;
