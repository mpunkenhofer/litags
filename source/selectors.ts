export const litags = {
    keys: {
        tags: 'litags.tags',
        options: 'litags.options',
        frequentlyUsed: 'litags.frequentlyUsed'
    },
    selectors: {
        app: {
            appElement: '.round__app',
            appTableElement: '.round__app__table',
            topUserElement: '.ruser-top',
            bottomUserElement: '.ruser-bottom',
            topUserName: '.ruser-top a',
            bottomUserName: '.ruser-bottom a'
        },
        button: {
            main: 'lt-button-addTag',
            wrapper: 'lt-button-addTag-wrap',
        },
        popup: {
            main: 'lt-popup',
            all: 'lt-popup-all',
            tag: 'lt-popup-tag',
            freq: 'lt-popup-freq',
            title: 'lt-popup-title',
            search: 'lt-popup-search',
            symbol: 'lt-popup-symbol',
            searchResults: 'lt-popup-searchResults',
            wrappers: {
                main: 'lt-popup-wrap',
                all: 'lt-popup-all-wrap',
                freq: 'lt-popup-freq-wrap',
                list: 'lt-popup-list',
                search: 'lt-popup-search-wrap',
                searchResults: 'lt-popup-searchResults-wrap'
            },
        },
        list: {
            main: 'lt-list',
            tag: 'lt-list-tag',
            tags: 'lt-list-tags',
            trash: 'lt-list-trash',
            trashSymbol: 'lt-list-trashSymbol',
            sortableGroup: 'lt-list-sortableGroup',
            hiddenDragGhost: 'lt-list-hiddenDragGhost'
        }
    }
};