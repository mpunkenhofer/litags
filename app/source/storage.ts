import {litags} from "./selectors";
import {defaults as optionsDefaults} from "./options";
import {defaults as tagsDefaults} from "./tag";
import {Tag} from "./tag";
import {User} from "./user";

const browser = require("webextension-polyfill");

class StorageService {
    private tagCache: { tags: Tag[], valid: boolean } = {
        tags: [],
        valid: false
    };

    public setDefaultOptions() {
        browser.storage.sync.set({[litags.keys.options]: optionsDefaults});
    }

    public setDefaultTags() {
        browser.storage.sync.set({[litags.keys.tags]: tagsDefaults});
    }

    public async getOptions() {
        const options = await browser.storage.sync.get(litags.keys.options);
        return options[litags.keys.options];
    }

    public async getTags(): Promise<Tag[]> {
        if (this.tagCache.valid) {
            return this.tagCache.tags;
        } else {
            try {
                const tagData = (await browser.storage.sync.get(litags.keys.tags))[litags.keys.tags];

                this.tagCache.tags = [];

                for (const id in tagData) {
                    if (tagData.hasOwnProperty(id)) {
                        let [name, symbol, freq, aliases, colors] = tagData[id];
                        this.tagCache.tags.push(new Tag(Number(id), symbol, name, freq, aliases, colors));
                    }
                }

                this.tagCache.valid = true;

                return this.tagCache.tags;
            } catch (error) {
                console.error(error)
            }
        }
    }

    public setTags(tags: Tag[]) {
        let dict: { [_: number]: [string, string, number, string[], number[]] } = {};

        for (const tag of tags)
            dict[tag.id] = [tag.name, tag.symbol, tag.frequency, tag.aliases, tag.colors];

        browser.storage.sync.set({[litags.keys.tags]: dict});
    }

    public async getUser(username: string): Promise<User> {
        const userData = await browser.storage.local.get(username);

        if (Object.keys(userData).length !== 0) {
            const tags = await Tag.getTagsFromIds(userData[username]);
            return new User(username, tags);
        } else {
            return new User(username);
        }
    }

    public setUser(user: User) {
        return browser.storage.local.set({[user.username]: user.tags.map(t => t.id)});
    }
}

export const storageService = new StorageService();