const browser = require("webextension-polyfill/dist/browser-polyfill.min");


interface UserInterface {
    username: string;
    encounters: number;
    tags: number[];
}

export class User implements UserInterface {
    username: string;
    encounters: number;
    tags: number[];

    static getUser(username: string) {
        return browser.storage.local.get(username);
    }

    static setUser(user: User) {
        const key = user.username;
        return browser.storage.local.set({key: user.tags});
    }
}

