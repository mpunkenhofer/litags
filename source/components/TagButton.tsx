import * as React from 'react';
import {Tag} from "./Tag";

export const TagButton = ({tag}) => {
    return <button className='lt-t-button'><Tag tag={tag}/></button>;
};
