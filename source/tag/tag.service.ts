import {filterTags, getTagsFromIds, Tag} from "./tag";
import {keys} from "../constants/keys";
import {optionService} from "../options/options.service";
import {cache} from "../util/cache";

const browser = require("webextension-polyfill");

class TagService {
    async getAll(filter: Tag[] = []): Promise<Tag[]> {
        let tags = cache.get(keys.cache.tags);

        if(tags != undefined)
            return filterTags(tags, filter);

        let tagData = (await browser.storage.sync.get(keys.tags))[keys.tags];

        if(!tagData) {
            browser.storage.sync.set({[keys.tags]: defaultTags});
            tagData = defaultTags;
        }

        tags = [];

        for (const id in tagData) {
            if (tagData.hasOwnProperty(id)) {
                const [name, symbol, aliases, colors] = tagData[id];
                tags.push(new Tag(Number(id), symbol, name, aliases, colors));
            }
        }

        cache.set(keys.cache.tags, tags);

        return filterTags(tags, filter);
    }

    set(tags: Tag[]) {
        cache.del(keys.cache.tags);

        let dict: { [_: number]: [string, string, string[], string] } = {};

        for (const tag of tags)
            dict[tag.id] = [tag.name, tag.symbol, tag.aliases, tag.color];

        browser.storage.sync.set({[keys.tags]: dict});
    }

    async getFrequentlyUsed(filter: Tag[] = [], amount: number = 8): Promise<Tag[]> {
        const freqUsedData = (await browser.storage.sync.get(keys.frequentlyUsed))[keys.frequentlyUsed];

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

    async updateFrequentlyUsed(tag: Tag) {
        cache.del(keys.cache.tags);

        let freqUsed = (await browser.storage.sync.get(keys.frequentlyUsed))[keys.frequentlyUsed];
        const options = await optionService.get();

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

        browser.storage.sync.set({[keys.frequentlyUsed]: freqUsed});
    }
}

export const tagService = new TagService();

export const defaultTags: { [_: number]: [string, string, string[], string] } = {
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

