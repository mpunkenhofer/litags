import {litags} from "./selectors";
import {defaults as optionsDefaults, Options} from "./options";
import {defaults as tagsDefaults, filterTags, getTagsFromIds, Tag} from "./tag";
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

    public async getOptions(): Promise<Options> {
        const options = await browser.storage.sync.get(litags.keys.options);

        if (!options)
            throw Error('Failed to get options!');

        return options[litags.keys.options];
    }

    public async getTags(filter: Tag[] = []): Promise<Tag[]> {
        if (this.tagCache.valid) {
            return filterTags(this.tagCache.tags, filter);
        } else {
            try {
                const tagData = (await browser.storage.sync.get(litags.keys.tags))[litags.keys.tags];

                this.tagCache.tags = [];

                for (const id in tagData) {
                    if (tagData.hasOwnProperty(id)) {
                        let [name, symbol, aliases, colors] = tagData[id];
                        this.tagCache.tags.push(new Tag(Number(id), symbol, name, aliases, colors));
                    }
                }

                this.tagCache.valid = true;

                return filterTags(this.tagCache.tags, filter);
            } catch (error) {
                console.error(error)
            }
        }
    }

    public setTags(tags: Tag[]) {
        let dict: { [_: number]: [string, string, string[], string] } = {};

        for (const tag of tags)
            dict[tag.id] = [tag.name, tag.symbol, tag.aliases, tag.color];

        browser.storage.sync.set({[litags.keys.tags]: dict});
    }

    public async getUser(username: string): Promise<User> {
        const userData = await browser.storage.local.get(username);

        if (Object.keys(userData).length !== 0) {
            const tags = await getTagsFromIds(userData[username]);
            return new User(username, tags);
        } else {
            return new User(username);
        }
    }

    public setUser(user: User) {
        return browser.storage.local.set({[user.username]: user.tags.map(t => t.id)});
    }

    public async getFrequentlyUsedTags(filter: Tag[] = [], amount: number = 8): Promise<Tag[]> {
        const freqUsedData = (await browser.storage.sync.get(litags.keys.frequentlyUsed))[litags.keys.frequentlyUsed];

        if (freqUsedData) {
            const tags = await getTagsFromIds(Object.keys(freqUsedData).map(key => Number(key)));
            const frequencies: number[] = Object.values(freqUsedData);

            let pairs: [Tag, number][] = tags.map((tag, i) => [tag, frequencies[i]]);
            pairs = pairs.filter(pair => !filter.find(filterTag => filterTag.id === pair[0].id));

            return pairs
                .sort((a, b): number => {
                    return b[1] - a[1];
                })
                .splice(0, amount)
                .map(pair => pair[0]);
        }

        return [];
    }

    public async updateFrequentlyUsedTags(tag: Tag) {
        let freqUsed = (await browser.storage.sync.get(litags.keys.frequentlyUsed))[litags.keys.frequentlyUsed];
        const options = await this.getOptions();

        if (!freqUsed)
            freqUsed = {};

        // add/inc freq used entry
        if (freqUsed[tag.id])
            freqUsed[tag.id] += 1;
        else
            freqUsed[tag.id] = 1;

        if (Object.keys(freqUsed).length > options.frequentlyUsedCap) {
            let min = [Number.MAX_VALUE, tag.id];

            for (const id in freqUsed) {
                if (freqUsed.hasOwnProperty(id)) {
                    const value = freqUsed[id];
                    min = value < min[0] ? [value, id] : min;
                }
            }

            delete freqUsed[min[1]];
        }

        browser.storage.sync.set({[litags.keys.frequentlyUsed]: freqUsed});
    }
}

export const storageService = new StorageService();