import {FontTag, IconTag, Tag} from "./tag";
import {keys} from "../constants/keys";
import {cache} from "../util/cache";
import {ID} from "../util/id";

const browser = require("webextension-polyfill");

export class TagSet {
    private readonly id: ID;
    private name: string;
    private tags: Tag[];
    private enabled = true;

    constructor(name: string, id: ID = new ID()) {
        this.name = name;
        this.id = id;
        this.tags = [];
    }

    createFontTag(name: string, aliases: string[] = [], resource: string, color: string, id: ID = new ID()): Tag {
        const tag = new FontTag(this, name, aliases, resource, color, id);
        this.tags.push(tag);
        return tag;
    }

    createIconTag(name: string, aliases: string[] = [], resource: string, id: ID = new ID()): Tag {
        const tag = new IconTag(this, name, aliases, resource, id);
        this.tags.push(tag);
        return tag;
    }

    getTags(): Tag[] {
        return this.tags;
    }

    deleteTag(tag: Tag[]) {
        cache.del(keys.cache.tags);
        console.log(`tag to be deleted: ${tag}`);
    }

    clearTags() {
        cache.del(keys.cache.tags);

        this.tags = [];
    }

    getName(): string {
        return this.name;
    }

    setName(name: string) {
        this.name = name
    }

    setEnabled(bool: boolean) {
        this.enabled = bool;
        this.storeSetID()
    }

    getEnabled() {
        return this.enabled;
    }

    static async load(id: ID): Promise<TagSet> {
        try {
            const setData = (await browser.storage.sync.get(id.toString()))[id.toString()];
            if (!setData) {
                return null;
            }
            return TagSet.fromData(setData, id);
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    async store() {
        cache.del(keys.cache.tags);
        this.storeSetID();
        try {
            await browser.storage.sync.set({[this.id.toString()]: this.toData()})
        } catch (e) {
            console.error(`Failed to store set data of set ${this.name} with setID: ${this.id.toString()}`, e)
        }
    }

    storeSetID() {
        browser.storage.sync.get(keys.sets).then(obj => {
            const setIDs = obj[keys.sets];

            if (setIDs && !Object.keys(setIDs).includes(this.id.toString())) {
                setIDs[this.id.toString()] = this.enabled;
                browser.storage.sync.set({[keys.sets]: setIDs}).catch(err => console.error(`Failed to add setID: ${this.id.toString()} of set ${this.name}`, err));
            } else {
                browser.storage.sync.set({[keys.sets]: {[this.id.toString()]: this.enabled}}).catch(err => console.error(`Failed to create setID array with setID: ${this.id.toString()} set ${this.name}`, err));
            }
        });
    }

    static createSetFromData(data: Object): TagSet {
        const set = new this(data[keys.tagSet.name], new ID());
        const tags = data[keys.tagSet.tags];

        for (const key in tags) {
            if (tags.hasOwnProperty(key)) {
                const [aliases, resource, color] = tags[key];
                if (color != undefined) {
                    set.createFontTag(key, aliases, resource, color);
                } else {
                    set.createIconTag(key, aliases, resource);
                }
            }
        }

        return set;
    }

    static fromData(data: Object, id: ID = new ID()): TagSet {
        if (!data.hasOwnProperty(keys.tagSet.name) || !data.hasOwnProperty(keys.tagSet.tags))
            throw Error(`Data misses expected field ${keys.tagSet.name} or/and ${keys.tagSet.tags}`);

        const setName = data[keys.tagSet.name];
        const tagData = data[keys.tagSet.tags];

        const set = new this(setName, id);

        for (const key in tagData) {
            if (tagData.hasOwnProperty(key)) {
                const [name, aliases, resource, color] = tagData[key];

                if (resource && aliases) {
                    if (color != undefined) {
                        set.createFontTag(name, aliases, resource, color, new ID(key));
                    } else {
                        set.createIconTag(name, aliases, resource, new ID(key));
                    }
                }
            }
        }

        return set;
    }

    toData() {
        const setData = {};
        setData[keys.tagSet.name] = this.name;

        const tagData = {};

        for (const tag of this.tags)
            tagData[tag.getID().toString()] = tag.toData();

        setData[keys.tagSet.tags] = tagData;

        return setData;
    }
}
