import * as React from "react";
import {ColorChangeHandler, SketchPicker} from "react-color";
import {useState} from "react";
import {useRef} from "react";
import {useOnClickedOutside} from "../../hooks/onClickedOutside";

interface ColorPickerProps {
    color: string;
}

export const ColorPicker: React.FunctionComponent<ColorPickerProps> = ({color}: ColorPickerProps) => {
    const [c, setColor] = useState<string>(color ? color : '#000000');
    const [showSketchPicker, setShowSketchPicker] = useState(false);

    const sketchPickerRef = useRef(null);

    const handleColorChange: ColorChangeHandler = (color) => {
        setColor(color.hex);
    };

    useOnClickedOutside(sketchPickerRef, () => setShowSketchPicker(false));

    return (
        <div ref={sketchPickerRef}>
            <div style={{
                background: `${c}`, width: '1.6rem', height: '1.6rem',
                border: '1px solid #ced4da', borderRadius: '.25rem', cursor: 'pointer'
            }}
                 onClick={(): void => setShowSketchPicker(!showSketchPicker)}/>
            {
                showSketchPicker &&
                <div className='position-absolute'>
                    <SketchPicker disableAlpha={true} color={c} onChange={handleColorChange}/>
                </div>
            }
        </div>
    );
};