import * as React from 'react';

export const TagSearch = () => {
    return <input className='lt-tc-search'
                  type='search'
                  autoCapitalize='off'
                  autoComplete='off'
                  spellCheck='false'
                  placeholder='Search Tags...'
                  onInput={() => console.log('hello')}/>;
};
