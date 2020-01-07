import {keys} from "../constants/keys";
import {cache} from "./cache";
import {defaultOptions, Options} from "../XOLDoptions/options";
import {ID} from "./id";
import {lichessSetData} from "../constants/lichess-set";
import {frankerfacezSetData} from "../constants/frankerfacez-set";

const browser = require("webextension-polyfill");

class StorageService {
    // async getTagSets(onlyEnabledSets = false): Promise<TagSet[]> {
    //     const setIDs: Object = (await browser.storage.sync.get(keys.sets))[keys.sets];
    //
    //     if (!setIDs || Object.keys(setIDs).length === 0) {
    //         //default sets
    //
    //         const lichessSet = TagSet.createSetFromData(lichessSetData);
    //         const frankerfacezSet = TagSet.createSetFromData(frankerfacezSetData);
    //         frankerfacezSet.setEnabled(false);
    //         await lichessSet.store();
    //         await frankerfacezSet.store();
    //
    //         return [lichessSet, frankerfacezSet];
    //     } else {
    //         const sets: TagSet[] = [];
    //         for (const setID in setIDs) {
    //             if (setIDs.hasOwnProperty(setID)) {
    //                 if (onlyEnabledSets && !setIDs[setID])
    //                     continue;
    //
    //                 const tagSet = await TagSet.load(new ID(setID));
    //                 if (tagSet) {
    //                     sets.push(tagSet);
    //                 } else {
    //                     console.error(`Failed to load tagset: ${setID}.`);
    //                 }
    //             }
    //         }
    //         return sets;
    //     }
    // }
    //
    // async getAllTags(filter: Tag[] = []): Promise<Tag[]> {
    //     let tags: Tag[] = cache.get(keys.cache.tags);
    //
    //     if (tags != undefined)
    //         return filterTags(tags, filter);
    //
    //     const sets = await this.getTagSets(true);
    //     tags= [];
    //
    //     for (const set of sets)
    //         Array.prototype.push.apply(tags, set.getTags());
    //
    //     cache.set(keys.cache.tags, tags);
    //
    //     return filterTags(tags, filter);
    // }
    //
    // async getTag(id: ID): Promise<Tag> {
    //     const tags = await this.getAllTags();
    //
    //     for (const tag of tags) {
    //         if (id.equals(tag.getID()))
    //             return tag;
    //     }
    //
    //     return Promise.reject(`Failed to load tag: ${id}.`);
    // }
    //
    // async getTagSet(id: ID): Promise<TagSet> {
    //     const sets = await this.getTagSets();
    //
    //     for (const set of sets) {
    //         if (id.equals(set.getID()))
    //             return set;
    //     }
    //
    //     return Promise.reject(`Failed to load set: ${id}.`);
    // }
    //
    // async getAllUsers(): Promise<User[]> {
    //     let users = cache.get(keys.cache.users);
    //
    //     if (users != undefined)
    //         return users;
    //
    //     // get all
    //     const data = await browser.storage.local.get(null);
    //     users = [];
    //
    //     for (const key in data) {
    //         if (data.hasOwnProperty(key)) {
    //             if (!key.startsWith(keys.prefix)) {
    //                 const user = await User.load(key);
    //                 users.push(user);
    //             }
    //         }
    //     }
    //
    //     cache.set(keys.cache.users, users);
    //
    //     return users;
    // }
    //
    // async getRandomTags(maxTags: number = 8): Promise<Tag[]> {
    //     const result = [];
    //     const tags = await this.getAllTags();
    //     const randomNrTags = Math.floor(Math.random() * (maxTags - 1)) + 1;
    //     for(let i = 0; i < randomNrTags; i++) {
    //         const random = Math.floor(Math.random() * tags.length);
    //
    //         result.push(tags[random]);
    //     }
    //
    //     return result;
    // }
    //
    // async getMockUsers(): Promise<User[]> {
    //     const users: User[] = [];
    //
    //     users.push(new User('John', await this.getRandomTags(), 1,
    //         Math.floor(Math.random() * 100) + 1));
    //     users.push(new User('Sam', await this.getRandomTags(), 310000005460,
    //         Math.floor(Math.random() * 100) + 1));
    //     users.push(new User('Neca', await this.getRandomTags(), 700004560800,
    //         Math.floor(Math.random() * 100) + 1));
    //     users.push(new User('Ahidis', await this.getRandomTags(), 120004560000,
    //         Math.floor(Math.random() * 100) + 1));
    //     users.push(new User('Charlie', await this.getRandomTags(), 1510000045600,
    //         Math.floor(Math.random() * 100) + 1));
    //
    //     return users;
    // }
    //
    // async getFrequentlyUsed(filter: Tag[] = [], amount: number = 8): Promise<Tag[]> {
    //     try {
    //         const freqUsedData = (await browser.storage.sync.get(keys.frequentlyUsed))[keys.frequentlyUsed];
    //         if (freqUsedData) {
    //             const tags: Tag[] = await Promise.all(Object.keys(freqUsedData).map(key => Tag.fromID(new ID(key))));
    //             const frequencies: number[] = Object.values(freqUsedData);
    //
    //             let pairs: [Tag, number][] = tags.map((tag, i) => [tag, frequencies[i]]);
    //             pairs = pairs.filter(pair => !filter.find(filterTag => filterTag.getID().equals(pair[0].getID())));
    //
    //             return pairs
    //                 .sort((a, b): number => {
    //                     return b[1] - a[1];
    //                 })
    //                 .splice(0, amount)
    //                 .map(pair => pair[0]);
    //         }
    //     } catch (e) {
    //         console.error(e);
    //     }
    //
    //     return [];
    // }
    //
    // async updateFrequentlyUsed(tag: Tag) {
    //     let freqUsed = (await browser.storage.sync.get(keys.frequentlyUsed))[keys.frequentlyUsed];
    //     const options = await this.getOptions();
    //
    //     if (!freqUsed)
    //         freqUsed = {};
    //
    //     // add/inc freq used entry
    //     if (freqUsed[tag.getID().toString()])
    //         freqUsed[tag.getID().toString()] += 1;
    //     else
    //         freqUsed[tag.getID().toString()] = 1;
    //
    //     if (Object.keys(freqUsed).length > options.frequentlyUsedCap) {
    //         let min = [Number.MAX_VALUE, tag.getID().toString()];
    //
    //         for (const id in freqUsed) {
    //             if (freqUsed.hasOwnProperty(id)) {
    //                 const value = freqUsed[id];
    //                 min = value < min[0] ? [value, id] : min;
    //             }
    //         }
    //
    //         delete freqUsed[min[1]];
    //     }
    //
    //     browser.storage.sync.set({[keys.frequentlyUsed]: freqUsed});
    // }

    async getOptions(): Promise<Options> {
        const options = (await browser.storage.sync.get(keys.options))[keys.options];

        if (!options) {
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
