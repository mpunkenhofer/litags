import * as React from 'react';
import {useState} from 'react';
import {TagChooser} from "./TagChooser";

const browser = require("webextension-polyfill");

export default function TagChooserButton(props) {
    const [visible, setVisible] = useState(false);

    return (
        <>
            <button title={browser.i18n.getMessage("addTagButtonTooltip")}
                    className='lt-icon-button lt-effect-button' onClick={() => setVisible(!visible)}/>
            { <TagChooser visible={visible}/> }
        </>
    );
}
