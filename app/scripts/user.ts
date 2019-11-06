import {Tag} from "./tag";

const browser = require("webextension-polyfill/dist/browser-polyfill.min");


export class User {
    username: string;
    tags: Tag[];

    constructor(username: string, tags: Tag[] = []) {
        this.username = username;
        this.tags = tags;
    }

    static async getUser(username: string): Promise<User> {
        const userData = await browser.storage.local.get(username);

        if(Object.keys(userData).length !== 0) {
            const tags = await Tag.getTagsFromIds(userData[username]);
            return new User(username, tags);
        } else {
            return new User(username);
        }
    }

    static setUser(user: User) {
        return browser.storage.local.set({[user.username]: user.tags.map(t => t.id)});
    }
}

