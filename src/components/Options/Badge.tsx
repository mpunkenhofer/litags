import * as React from "react";
import {useState} from "react";
import {i18n} from "../../constants/i18n";

interface BadgeProps {
    text: string;
    onRemoveButtonClicked: () => void;
}

export const Badge: React.FunctionComponent<BadgeProps> = ({text, onRemoveButtonClicked}: BadgeProps) => {
    const [hovering, setHovering] = useState(false);

    return (
        <div className='d-inline-block mr-2'
             onMouseEnter={(): void => setHovering(true)} onMouseLeave={(): void => setHovering(false)}
             style={{cursor: 'default'}}>
            <span className='badge badge-pill badge-primary'>
                {text}
            </span>
            {
                hovering &&
                <button type="button" className="close position-relative"
                        style={{top: '-10px', right: '8px', borderRadius: '50%', color: 'red'}}
                        title={i18n.removeAlias}
                        onClick={onRemoveButtonClicked}>
                    <span aria-hidden="true">&times;</span>
                </button>
            }
        </div>
    );
};