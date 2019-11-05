import {Storage} from "./storage";

export interface TagData {
    tagNames: string[],
    tagSymbols: string[],
    tagEnabled: boolean[],
    tagFrequencies: number[],
    tagAliases: string[][],
    tagColors: number[][]
}

export class Tag {
    readonly id: number;
    readonly symbol: string;
    name: string;
    enabled: boolean;
    frequency: number;
    aliases: string[];
    colors: number[];

    constructor(id: number,
                symbol: string,
                name: string,
                enabled = true,
                frequency = 0,
                aliases: string[] = [],
                colors: number[] = []) {
        this.id = id;
        this.symbol = symbol;
        this.name = name;
        this.enabled = enabled;
        this.frequency = frequency;
        this.aliases = aliases;
        this.colors = colors;
    }

    static fromTagData(data: TagData, index: number): Tag {
        return new Tag(index, data.tagSymbols[index], data.tagNames[index], data.tagEnabled[index],
            data.tagFrequencies[index], data.tagAliases[index], data.tagColors[index]);
    }

    static async search(term: string): Promise<Tag[]> {
        term = term.toLowerCase();

        const result: Tag[] = [];
        try {
            const tagData = await Storage.getTags();

            for (let i = 0; i < tagData.tagNames.length; i++) {
                if (!tagData.tagEnabled)
                    continue;
                if (tagData.tagNames[i].toLowerCase().includes(term))
                    result.push(Tag.fromTagData(tagData, i));
                else {
                    for (const alias of tagData.tagAliases[i]) {
                        if (alias.toLowerCase().includes(term)) {
                            result.push(Tag.fromTagData(tagData, i));
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
            const tagData = await Storage.getTags();

            for (let i = 0; i < tagData.tagNames.length; i++) {
                if (tagData.tagEnabled[i] && tagData.tagFrequencies[i] > 0 &&
                    filter.filter(tag => tag.symbol == tagData.tagSymbols[i]).length == 0)
                    result.push(Tag.fromTagData(tagData, i))
            }

            return result.sort((a, b):number => {
                return b.frequency - a.frequency;
            }).splice(0, amount);
        } catch (error) {
            console.error(error);
        }

        return result;
    }

    static async getAvailable(filter: Tag[] = []): Promise<Tag[]> {
        const result: Tag[] = [];

        try {
            const tagData = await Storage.getTags();

            for (let i = 0; i < tagData.tagNames.length; i++) {
                if (tagData.tagEnabled[i] && filter.filter(tag => tag.symbol == tagData.tagSymbols[i]).length == 0) {
                    result.push(Tag.fromTagData(tagData, i));
                }
            }
        } catch (error) {
            console.error(error);
        }

        return result;
    }

}
