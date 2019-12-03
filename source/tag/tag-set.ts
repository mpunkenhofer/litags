import {FontTag, IconTag, Tag} from "./tag";
import {keys} from "../constants/keys";

const browser = require("webextension-polyfill");

export class TagSet {
    private readonly name: string;
    private tags: Tag[];

    constructor(name: string, tags: Tag[] = []) {
        this.name = name;
        this.tags = tags;
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

    clearTags() {
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
        const tagData = {};

        for (const tag of this.tags) {
            if (tag instanceof FontTag)
                tagData[tag.getName()] = [tag.getCharacter(), tag.getAliases(), tag.getColor()];
            else if (tag instanceof IconTag)
                tagData[tag.getName()] = [tag.getURL(), tag.getAliases()];
        }

        const setNames: string[] = (await browser.storage.sync.get(keys.sets))[keys.sets];

        if (setNames && !setNames.includes(this.name)) {
            setNames.push(this.name);
            await browser.storage.sync.set({[keys.sets]: setNames});
        }

        return browser.storage.sync.set({[this.name]: tagData})
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
}
