import {Tag} from "./tag";
import {getAllOptions, Options} from "./options";

const browser = require("webextension-polyfill");

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

    public async addTag(tag: Tag) {
        const options = await getAllOptions();
        if(this.tags.length < options.maxTags) {
            this.tags.push(tag);
            Tag.increaseFrequentlyUsed(tag.id).then(() => User.setUser(this)).catch(e => console.error(e));
        }
    }

    public removeTag(tag: Tag | number) {
        const id = (typeof tag === "number") ? tag : tag.id;
        this.tags = this.tags.filter(t => t.id !== id);
        User.setUser(this);
    }
}

