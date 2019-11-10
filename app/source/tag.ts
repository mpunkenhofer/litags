import {litags} from "./constants";

const browser = require("webextension-polyfill");

export class Tag {
    readonly id: number;
    readonly symbol: string;
    name: string;
    frequency: number;
    aliases: string[];
    colors: number[];

    constructor(id: number,
                symbol: string,
                name: string,
                frequency = 0,
                aliases: string[] = [],
                colors: number[] = []) {
        this.id = id;
        this.symbol = symbol;
        this.name = name;
        this.frequency = frequency;
        this.aliases = aliases;
        this.colors = colors;
    }

    private static tagCache: {tags: Tag[], valid: boolean} = {
        tags: [],
        valid: false
    };

    static async search(term: string, filter: Tag[] = []): Promise<Tag[]> {
        term = term.toLowerCase();
        const result: Tag[] = [];

        try {
            const tags = await Tag.getTags();

            for(const tag of tags) {
                if(!filter.find(t => t.id == tag.id) && tag.name.toLowerCase().includes(term))
                    result.push(tag);
                else {
                    for(const alias of tag.aliases) {
                        if(alias.toLowerCase().includes(term)) {
                            result.push(tag);
                            break;
                        }
                    }
                }
            }
        } catch (error) {
            console.error(error);
        }

        return result;
    }

    static async getFrequentlyUsed(amount: number = 8, filter: Tag[] = []): Promise<Tag[]> {
        const result: Tag[] = [];

        try {
            const tags = await Tag.getTags();

            for(const tag of tags) {
                if(tag.frequency > 0 && !filter.find(t => t.id == tag.id))
                    result.push(tag);
            }

            return result
                .sort((a, b):number => { return b.frequency - a.frequency;})
                .splice(0, amount);
        } catch (error) {
            console.error(error);
        }

        return result;
    }

    static async getAll(filter: Tag[] = []): Promise<Tag[]> {
        const result: Tag[] = [];

        try {
            const tags = await Tag.getTags();

            for(const tag of tags) {
                if (!filter.find(t => t.id == tag.id)) {
                    result.push(tag);
                }
            }
        } catch (error) {
            console.error(error);
        }

        return result;
    }

    static async increaseFrequentlyUsed(index: number) {
        let tags = await Tag.getTags();

        if(index >= 0 && index < tags.length) {
            tags[index].frequency += 1;
            Tag.setTags(tags);
            Tag.tagCache.valid = false;
        }
    }

    static async getTagsFromIds(ids: number[]): Promise<Tag[]> {
        const tags = await Tag.getTags();
        return tags.filter(tag => ids.find(id => id == tag.id));
    }

    public static setDefaultTags() {
        browser.storage.sync.set({[litags.keys.tags]: defaultTags});
    }

    private static setTags(tags: Tag[]) {
        let dict: {[_: number]: [string, string, number, string[], number[]]} = {};

        for (const tag of tags)
            dict[tag.id] = [tag.name, tag.symbol, tag.frequency, tag.aliases, tag.colors];

        browser.storage.sync.set({[litags.keys.tags]: dict});
    }

    private static async getTags(): Promise<Tag[]> {
        if(Tag.tagCache.valid) {
            return Tag.tagCache.tags;
        }
        else {
            try {
                const tagData = (await browser.storage.sync.get(litags.keys.tags))[litags.keys.tags];

                Tag.tagCache.tags = [];

                for(const id in tagData) {
                    if (tagData.hasOwnProperty(id)) {
                        let [name, symbol, freq, aliases, colors] = tagData[id];
                        Tag.tagCache.tags.push(new Tag(Number(id), symbol, name, freq, aliases, colors));
                    }
                }

                Tag.tagCache.valid = true;

                return Tag.tagCache.tags;
            } catch (error) {
                console.error(error)
            }
        }
    }
}

const defaultTags: {[_: number]: [string, string, number, string[], number[]]} = {
    0: ['unnamed1', '0', 0, [], []],
    1: ['unnamed2', '1', 0, [], []],
    2: ['unnamed3', '2', 0, [], []],
    3: ['unnamed4', '3', 0, [], []],
    4: ['unnamed5', '4', 0, [], []],
    5: ['unnamed6', '5', 0, [], []],
    6: ['unnamed7', '6', 0, [], []],
    7: ['unnamed8', '7', 0, [], []],
    8: ['unnamed9', '8', 0, [], []],
    9: ['unnamed10', '9', 0, [], []],
    10: ['unnamed11', 'a', 0, [], []],
    11: ['unnamed12', 'b', 0, [], []],
    12: ['unnamed13', 'c', 0, [], []],
    13: ['unnamed14', 'd', 0, [], []],
    14: ['unnamed16', 'e', 0, [], []],
    15: ['unnamed17', 'f', 0, [], []],
    16: ['unnamed18', 'g', 0, [], []],
    17: ['unnamed19', 'h', 0, [], []],
    18: ['unnamed20', 'i', 0, [], []],
    19: ['unnamed21', 'j', 0, [], []],
    20: ['unnamed22', 'k', 0, [], []],
    21: ['unnamed23', 'l', 0, [], []],
    22: ['unnamed24', 'm', 0, [], []],
    23: ['unnamed25', 'n', 0, [], []],
    24: ['unnamed26', 'o', 0, [], []],
    25: ['unnamed27', 'p', 0, [], []],
    26: ['unnamed28', 'q', 0, [], []],
    27: ['unnamed29', 'r', 0, [], []],
    28: ['unnamed30', 's', 0, [], []],
    29: ['unnamed31', 't', 0, [], []],
    30: ['unnamed32', 'u', 0, [], []],
    31: ['unnamed33', 'v', 0, [], []],
    32: ['unnamed34', 'w', 0, [], []],
    33: ['unnamed35', 'x', 0, [], []],
    34: ['unnamed36', 'y', 0, [], []],
    35: ['unnamed37', 'z', 0, [], []],
    36: ['unnamed38', 'A', 0, [], []],
    37: ['unnamed39', 'B', 0, [], []],
    38: ['unnamed40', 'C', 0, [], []],
    39: ['unnamed41', 'D', 0, [], []],
    40: ['unnamed42', 'E', 0, [], []],
    41: ['unnamed43', 'F', 0, [], []],
    42: ['unnamed44', 'G', 0, [], []],
    43: ['unnamed45', 'H', 0, [], []],
    44: ['unnamed51', 'I', 0, [], []],
    45: ['unnamed46', 'J', 0, [], []],
    46: ['unnamed47', 'K', 0, [], []],
    47: ['unnamed48', 'L', 0, [], []],
    48: ['unnamed49', 'M', 0, [], []],
    49: ['unnamed50', 'N', 0, [], []],
    50: ['unnamed51', 'O', 0, [], []],
    51: ['unnamed52', 'P', 0, [], []],
    52: ['unnamed53', 'Q', 0, [], []],
    53: ['unnamed54', 'R', 0, [], []],
    54: ['unnamed55', 'S', 0, [], []],
    55: ['unnamed56', 'T', 0, [], []],
    56: ['unnamed57', 'U', 0, [], []],
    57: ['unnamed58', 'V', 0, [], []],
    58: ['unnamed59', 'W', 0, [], []],
    59: ['unnamed60', 'X', 0, [], []],
    60: ['unnamed61', 'Y', 0, [], []],
    61: ['unnamed62', 'Z', 0, [], []],
    62: ['unnamed63', '!', 0, [], []],
    63: ['unnamed64', '@', 0, [], []],
    64: ['unnamed65', '#', 0, [], []],
    65: ['unnamed66', '$', 0, [], []],
    66: ['unnamed67', '%', 0, [], []],
    67: ['unnamed68', '^', 0, [], []],
    68: ['unnamed69', '&', 0, [], []],
    69: ['unnamed70', '*', 0, [], []],
    70: ['unnamed71', '(', 0, [], []],
    71: ['unnamed72', ')', 0, [], []],
    72: ['unnamed73', '[', 0, [], []],
    73: ['unnamed74', ']', 0, [], []],
};