import {tagService} from "./tag.service";

export class Tag {
    readonly id: number;
    readonly symbol: string;
    name: string;
    aliases: string[];
    color: string;

    constructor(id: number, symbol: string, name: string, aliases: string[] = [], color: string = '') {
        this.id = id;
        this.symbol = symbol;
        this.name = name;
        this.aliases = aliases;
        this.color = color;
    }
}

export const filterTags = (tags: Tag[], filter: Tag[]): Tag[] => {
    return filter ? tags.filter(tag => !filter.find(filterTag => filterTag.id === tag.id)) : tags;
};

export async function getTagsFromId(id: number, filter: Tag[] = []): Promise<Tag> {
    // be careful to return tags in the same order
    const tags = await tagService.getAll(filter);

    return tags.find(tag => tag.id === id);
}

export async function getTagsFromIds(ids: number[], filter: Tag[] = []): Promise<Tag[]> {
    // be careful to return tags in the same order
    const tags = await tagService.getAll(filter);
    //return tags.filter(tag => ids.find(id => id === tag.id));
    return ids.map(id => tags.find(tag => tag.id === id));
}

export async function searchTags(term: string, filter: Tag[] = []): Promise<Tag[]> {
    term = term.toLowerCase();
    const tags = await tagService.getAll(filter);
    return tags.filter(tag =>
        tag.name.toLowerCase().includes(term) || tag.aliases.find(alias => alias.toLowerCase().includes(term))
    );
}

export function createTagElement(tag: Tag, type: string = 'span', className: string = '') {
    const tagElement = document.createElement(type);
    tagElement.className = className;
    tagElement.innerText = tag.symbol;

    if(tag.color.length > 0)
        tagElement.style.color = tag.color;

    return tagElement;
}
