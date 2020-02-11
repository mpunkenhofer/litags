import * as React from 'react';
import {useContext, useEffect} from 'react';
import TagChooserPopup from "./TagChooserPopup";
import {VisibilityContext, VisibilityProvider} from "../../contexts/visibity";
import {ColorProvider} from "../../contexts/color";
import {SetProvider} from "../../contexts/sets";
import { setGlobal } from 'reactn';

const backgroundColor = () => {
    const backgroundElement = document.querySelector('.round__app__table');
    if (backgroundElement) {
        const style = getComputedStyle(backgroundElement);
        if (style && style.backgroundColor)
            return style.backgroundColor;
    }
    return 'rgba(0,0,0,1)';
};


const TagChooserButton = () => {
    const {visible, setVisible} = useContext(VisibilityContext);

    return (<button title='Show Tags'
                    className='lt-icon-button lt-effect-button' onClick={() => setVisible(!visible)}/>);
};

const TagChooser = () => {
    useEffect(() => {
        setGlobal({frequentlyUsed: [1, 2, 3]});
    });

    return (
    <VisibilityProvider>
        <TagChooserButton/>
        <SetProvider>
            <ColorProvider baseColor={backgroundColor()}>
                <TagChooserPopup/>
            </ColorProvider>
        </SetProvider>
    </VisibilityProvider>
)
};


export default TagChooser;
