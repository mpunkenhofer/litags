export const litags = {
    keys: {
        tags: 'litags.tags',
        options: 'litags.options',
        frequentlyUsed: 'litags.frequentlyUsed'
    },
    links: {
      discord: 'https://discord.gg/4d7QWUK',
      github: 'https://github.com/mpunkenhofer/litags'
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
        },
        options: {
            nav: {
                main: 'lt-nav',
                title: 'lt-nav-title',
                button: 'lt-nav-button',
                socials: 'lt-nav-socials',
                separator: 'lt-nav-separator'
            },
            content: {
                main: 'lt-content',
                user: 'lt-content-user',
                userName: 'lt-content-userName',
                userList: 'lt-content-userList',
                userCount: 'lt-content-userCount',
                userRemove: 'lt-content-userRemove',
                separator: 'lt-content-separator',
            },
            buttonEffect: 'lt-button-effect'
        },
        icons: {
            discord: 'lt-icon-discord',
            github: 'lt-icon-github',
            trash: 'lt-icon-trash',
            chevup: 'lt-icon-chevron-up',
            chevdown: 'lt-icon-chevron-down'
        }
    }
};
