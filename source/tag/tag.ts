import {TagSet} from "./tag-set";
import {storageService} from "../util/storage";

export abstract class Tag {
    protected readonly set: TagSet;
    protected name: string;
    protected aliases: string[];

    protected constructor(set: TagSet, name: string, aliases: string[] = []) {
        this.set = set;
        this.name = name;
        this.aliases = aliases;
    }

    getID(): string {
        return `${this.set.getName()}.${this.name}`;
    }

    getName(): string {
        return this.name;
    }

    setName(name: string) {
        this.name = name;
    }

    addAlias(alias: string) {
        if (alias) {
            this.aliases.push(alias);
        }
    }

    clearAliases() {
        this.aliases = [];
    }

    getAliases(): string[] {
        return this.aliases;
    }

    store() {
        return this.set.store();
    }

    static async fromID(id: string): Promise<Tag> {
        if(!id)
            return Promise.reject('Empty id string.');

        const [set, name] = id.split('.');

        if(!set || !name)
            return Promise.reject('Failed to get set and/or name from id.');

        const tagSet = await TagSet.load(set);
        const tag = tagSet.getTag(name);

        if(!tag)
            return Promise.reject(`Failed to get tag: ${name} in set ${set}.`);

        return tag;
    }
}

export class FontTag extends Tag {
    protected readonly character: string;
    protected color: string;

    constructor(set: TagSet, name: string, aliases: string[] = [], character: string, color: string = '') {
        super(set, name, aliases);

        this.character = character;
        this.color = color;
    }

    getCharacter(): string {
        return this.character;
    }

    getColor(): string {
        return this.color;
    }

    setColor(color: string) {
        this.color = color;
    }
}

export class IconTag extends Tag {
    protected url: string;

    constructor(set: TagSet, name: string, aliases: string[] = [], url: string) {
        super(set, name, aliases);

        this.url = url;
    }

    getURL(): string {
        return this.url;
    }

    setURL(url: string) {
        this.url = url;
    }
}

export const filterTags = (tags: Tag[], filter: Tag[]): Tag[] => {
    return filter ? tags.filter(tag => !filter.find(filterTag => filterTag.getID() === tag.getID())) : tags;
};

export async function searchTags(term: string, filter: Tag[] = []): Promise<Tag[]> {
    term = term.toLowerCase();
    const tags = await storageService.getAllTags(filter);
    return tags.filter(tag =>
        tag.getName().toLowerCase().includes(term)
        || tag.getAliases().find(alias => alias.toLowerCase().includes(term))
    );
}

export function createTagElement(tag: Tag, type: string = 'span', className: string = '') {
    const tagElement = document.createElement(type);
    tagElement.className = className;

    if(tag instanceof FontTag) {
        tagElement.innerText = tag.getCharacter();

        const color = tag.getColor();

        if (color.length > 0)
            tagElement.style.color = color;
    } else if(tag instanceof IconTag) {
        const image = new Image();
        image.src = tag.getURL();
        tagElement.append(image);
    }

    return tagElement;
}
