import {Tag} from "./tag";
import {Options} from "./options";

const browser = require("webextension-polyfill/dist/browser-polyfill.min");

export class LTUser {
    username: string;
    tags: Tag[];

    constructor(username: string, tags: Tag[] = []) {
        this.username = username;
        this.tags = tags;
    }

    static async getUser(username: string): Promise<LTUser> {
        const userData = await browser.storage.local.get(username);

        if(Object.keys(userData).length !== 0) {
            const tags = await Tag.getTagsFromIds(userData[username]);
            return new LTUser(username, tags);
        } else {
            return new LTUser(username);
        }
    }

    static setUser(user: LTUser) {
        return browser.storage.local.set({[user.username]: user.tags.map(t => t.id)});
    }

    public addTag(tag: Tag) {
        if(this.tags.length < Options.getAllOptions().maxTags)
            this.tags.push(tag);

        console.log(this.tags);
    }
}

