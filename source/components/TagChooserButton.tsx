import * as React from 'react';
import {useState} from 'react';
import {TagChooser} from "./TagChooser";
import {useRef} from "react";
import {useClickedOutside} from "../hooks/clickedOutside";

const browser = require("webextension-polyfill");

export default function TagChooserButton(props) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useClickedOutside(ref, () => setVisible(false));

    return (
        <div ref={ref}>
            <button title='Show Tags'
                    className='lt-icon-button lt-effect-button' onClick={() => setVisible(!visible)}/>
            <TagChooser visible={visible}/>
        </div>
    );
}
