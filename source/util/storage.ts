import {keys} from "../constants/keys";
import {TagSet} from "../tag/tag-set";
import {User} from "../user/user";
import {cache} from "./cache";
import {filterTags, Tag} from "../tag/tag";
import {Options} from "../options/options";
import {lichessTagSetData} from "../constants/lichess-set";

const browser = require("webextension-polyfill");

class StorageService {
    async getTagSets(): Promise<TagSet[]> {
        const setNames: string[] = (await browser.storage.sync.get(keys.sets))[keys.sets];

        if (!setNames || setNames.length == 0) {
            //default sets
            const lichessSet = TagSet.fromData('lichess', lichessTagSetData);
            await lichessSet.store();
            return [lichessSet];
        } else {
            return await Promise.all(setNames.map(setName => TagSet.load(setName)));
        }
    }

    async getAllTags(filter: Tag[] = []): Promise<Tag[]> {
        const sets = await this.getTagSets();
        const tags: Tag[] = [];

        for (const set of sets)
            Array.prototype.push.apply(tags, set.getTags());

        return filterTags(tags, filter);
    }

    async getAllUsers(): Promise<User[]> {
        let users = cache.get(keys.cache.users);

        if (users != undefined)
            return users;

        // get all
        const data = await browser.storage.local.get(null);
        users = [];

        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                if (!key.startsWith(keys.prefix)) {
                    const user = await User.load(key);
                    users.push(user);
                }
            }
        }

        cache.set(keys.cache.users, users);

        return users;
    }

    async getFrequentlyUsed(filter: Tag[] = [], amount: number = 8): Promise<Tag[]> {
        const freqUsedData = (await browser.storage.sync.get(keys.frequentlyUsed))[keys.frequentlyUsed];

        if (freqUsedData) {
            const tags: Tag[] = await Promise.all(Object.keys(freqUsedData).map(key => Tag.fromID(key)));
            const frequencies: number[] = Object.values(freqUsedData);

            let pairs: [Tag, number][] = tags.map((tag, i) => [tag, frequencies[i]]);
            pairs = pairs.filter(pair => !filter.find(filterTag => filterTag.getID() === pair[0].getID()));

            return pairs
                .sort((a, b): number => {
                    return b[1] - a[1];
                })
                .splice(0, amount)
                .map(pair => pair[0]);
        }

        return [];
    }

    async updateFrequentlyUsed(tag: Tag) {
        cache.del(keys.cache.tags);

        let freqUsed = (await browser.storage.sync.get(keys.frequentlyUsed))[keys.frequentlyUsed];
        const options = await this.getOptions();

        if (!freqUsed)
            freqUsed = {};

        // add/inc freq used entry
        if (freqUsed[tag.getID()])
            freqUsed[tag.getID()] += 1;
        else
            freqUsed[tag.getID()] = 1;

        if (Object.keys(freqUsed).length > options.frequentlyUsedCap) {
            let min = [Number.MAX_VALUE, tag.getID()];

            for (const id in freqUsed) {
                if (freqUsed.hasOwnProperty(id)) {
                    const value = freqUsed[id];
                    min = value < min[0] ? [value, id] : min;
                }
            }

            delete freqUsed[min[1]];
        }

        browser.storage.sync.set({[keys.frequentlyUsed]: freqUsed});
    }

    async getOptions(): Promise<Options> {
        const options = await browser.storage.sync.get(keys.options)[keys.options];

        if (!options) {
            const defaultOptions: Options = {
                enabled: true,
                gameEnabled: true,
                profileEnabled: true,
                maxTags: 8,
                frequentlyUsedCap: 20
            };

            this.setOptions(defaultOptions);
            return defaultOptions;
        }

        return options;
    }

    async setOptions(options: Options) {
        browser.storage.sync.set({[keys.options]: options});
    }
}

export const storageService = new StorageService();
