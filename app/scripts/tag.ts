class Tag {
    readonly symbol: string;
    name: string;
    enabled: boolean;
    frequency: number;
    aliases: string[];
    colors: number[];

    constructor(symbol: string,
                name: string,
                enabled = true,
                frequency = 0,
                aliases: string[] = [],
                colors: number[] = []) {
        this.symbol = symbol;
        this.name = name;
        this.enabled = enabled;
        this.frequency = frequency;
        this.aliases = aliases;
        this.colors = colors;
    }
}

class TagManager {

}

export const tagManager = new TagManager();

