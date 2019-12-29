import {FontTag, IconTag, Tag} from "./tag";
import {keys} from "../constants/keys";
import {cache} from "../util/cache";

const browser = require("webextension-polyfill");

export class TagSet {
    private readonly id: string;
    private readonly name: string;
    private tags: Tag[];

    constructor(name: string) {
        this.name = name;
        this.tags = [];
    }

    createTag(name: string, aliases: string[] = [], resource: string, color?: string): Tag {
        if (color != undefined) {
            const tag = new FontTag(this, name, aliases, resource, color);
            this.tags.push(tag);
            return tag;
        } else {
            const tag = new IconTag(this, name, aliases, resource);
            this.tags.push(tag);
            return tag;
        }
    }

    getTag(id: string): Tag {
        return this.tags.find(tag => tag.getID() === id || tag.getName() === id);
    }

    getTags(): Tag[] {
        return this.tags;
    }

    deleteTag(tag: Tag[]) {
        cache.del(keys.cache.tags);
    }

    clearTags() {
        cache.del(keys.cache.tags);

        this.tags = [];
    }

    getName(): string {
        return this.name;
    }

    static async load(name: string): Promise<TagSet> {
        const tagData = (await browser.storage.sync.get(name))[name];

        if (!tagData)
            return Promise.reject(`Could not load tag set: ${name}`);

        return TagSet.fromData(name, tagData);
    }

    async store() {
        cache.del(keys.cache.tags);

        const setNames: string[] = (await browser.storage.sync.get(keys.sets))[keys.sets];

        if (setNames && !setNames.includes(this.name)) {
            setNames.push(this.name);
            await browser.storage.sync.set({[keys.sets]: setNames});
        } else {
            await browser.storage.sync.set({[keys.sets]: [this.name]})
        }

        return browser.storage.sync.set({[this.name]: this.toData()})
    }

    static fromData(name: string, data: Object): TagSet {
        const set = new this(name);

        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                const [resource, aliases, color] = data[key];

                if (resource && aliases) {
                    if (color != undefined) {
                        set.createTag(key, aliases, resource, color);
                    } else {
                        set.createTag(key, aliases, resource);
                    }
                }
            }
        }

        return set;
    }

    toData() {
        const tagData = {};

        for (const tag of this.tags)
            tagData[tag.getName()] = tag.toData();

        return tagData;
    }
}
