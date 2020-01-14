import * as React from 'react';

export const TagChooser = ({visible}) => {
    if (visible) {
        return <div className='lt-tc'>Hello</div>
    } else {
        return <div></div>
    }
};
