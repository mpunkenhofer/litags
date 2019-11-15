import {storageService} from "./storage";
import {litags} from "./selectors";

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
    const tags = await storageService.getTags(filter);

    return tags.find(tag => tag.id === id);
}

export async function getTagsFromIds(ids: number[], filter: Tag[] = []): Promise<Tag[]> {
    // be careful to return tags in the same order
    const tags = await storageService.getTags(filter);
    //return tags.filter(tag => ids.find(id => id === tag.id));
    return ids.map(id => tags.find(tag => tag.id === id));
}

export async function searchTags(term: string, filter: Tag[] = []): Promise<Tag[]> {
    term = term.toLowerCase();
    const tags = await storageService.getTags(filter);
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

export const defaults: { [_: number]: [string, string, string[], string] } = {
    0: ['unnamed1', '0', [], 'green'],
    1: ['unnamed2', '1', [], 'yellow'],
    2: ['unnamed3', '2', [], '#AA33aa'],
    3: ['unnamed4', '3', [], '#FF4400'],
    4: ['unnamed5', '4', [], ''],
    5: ['unnamed6', '5', [], ''],
    6: ['unnamed7', '6', [], ''],
    7: ['unnamed8', '7', [], ''],
    8: ['unnamed9', '8', [], ''],
    9: ['unnamed10', '9', [], ''],
    10: ['unnamed11', 'a', [], ''],
    11: ['unnamed12', 'b', [], ''],
    12: ['unnamed13', 'c', [], ''],
    13: ['unnamed14', 'd', [], ''],
    14: ['unnamed16', 'e', [], ''],
    15: ['unnamed17', 'f', [], ''],
    16: ['unnamed18', 'g', [], ''],
    17: ['unnamed19', 'h', [], ''],
    18: ['unnamed20', 'i', [], ''],
    19: ['unnamed21', 'j', [], ''],
    20: ['unnamed22', 'k', [], ''],
    21: ['unnamed23', 'l', [], ''],
    22: ['unnamed24', 'm', [], ''],
    23: ['unnamed25', 'n', [], ''],
    24: ['unnamed26', 'o', [], ''],
    25: ['unnamed27', 'p', [], ''],
    26: ['unnamed28', 'q', [], ''],
    27: ['unnamed29', 'r', [], ''],
    28: ['unnamed30', 's', [], ''],
    29: ['unnamed31', 't', [], ''],
    30: ['unnamed32', 'u', [], ''],
    31: ['unnamed33', 'v', [], ''],
    32: ['unnamed34', 'w', [], ''],
    33: ['unnamed35', 'x', [], ''],
    34: ['unnamed36', 'y', [], ''],
    35: ['unnamed37', 'z', [], ''],
    36: ['unnamed38', 'A', [], ''],
    37: ['unnamed39', 'B', [], ''],
    38: ['unnamed40', 'C', [], ''],
    39: ['unnamed41', 'D', [], ''],
    40: ['unnamed42', 'E', [], ''],
    41: ['unnamed43', 'F', [], ''],
    42: ['unnamed44', 'G', [], ''],
    43: ['unnamed45', 'H', [], ''],
    44: ['unnamed51', 'I', [], ''],
    45: ['unnamed46', 'J', [], ''],
    46: ['unnamed47', 'K', [], ''],
    47: ['unnamed48', 'L', [], ''],
    48: ['unnamed49', 'M', [], ''],
    49: ['unnamed50', 'N', [], ''],
    50: ['unnamed51', 'O', [], ''],
    51: ['unnamed52', 'P', [], ''],
    52: ['unnamed53', 'Q', [], ''],
    53: ['unnamed54', 'R', [], ''],
    54: ['unnamed55', 'S', [], ''],
    55: ['unnamed56', 'T', [], ''],
    56: ['unnamed57', 'U', ['alias', 'test'], ''],
    57: ['unnamed58', 'V', ['rest'], ''],
    58: ['unnamed59', 'W', [], ''],
    59: ['unnamed60', 'X', [], ''],
    60: ['unnamed61', 'Y', [], ''],
    61: ['unnamed62', 'Z', [], ''],
    62: ['unnamed63', '!', [], ''],
    63: ['unnamed64', '@', [], ''],
    64: ['unnamed65', '#', [], ''],
    65: ['unnamed66', '$', [], ''],
    66: ['unnamed67', '%', [], ''],
    67: ['unnamed68', '^', [], ''],
    68: ['unnamed69', '&', [], ''],
    69: ['unnamed70', '*', [], ''],
    70: ['unnamed71', '(', [], ''],
    71: ['unnamed72', ')', [], ''],
    72: ['unnamed73', '[', [], ''],
    73: ['unnamed74', ']', [], ''],
};