export class Tag {
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

export class TagVector {
    symbol: string[];
    name: string[];
    enabled: boolean[];
    frequency: number[];
    aliases: string[][];
    colors: number[][];

    constructor(symbol: string[],
                name: string[],
                enabled: boolean[],
                frequency: number[],
                aliases: string[][],
                colors: number[][]) {
        this.symbol = symbol;
        this.name = name;
        this.enabled = enabled;
        this.frequency = frequency;
        this.aliases = aliases;
        this.colors = colors;
    }
}

const defaultTagNames: string[] = [
    'unnamed1', 'unnamed2', 'unnamed3', 'unnamed4', 'unnamed5', 'unnamed6', 'unnamed7', 'unnamed8', 'unnamed9',
    'unnamed10', 'unnamed11', 'unnamed12', 'unnamed13', 'unnamed14', 'unnamed16', 'unnamed17', 'unnamed18',
    'unnamed19', 'unnamed20', 'unnamed21', 'unnamed22', 'unnamed23', 'unnamed24', 'unnamed25', 'unnamed26',
    'unnamed27', 'unnamed28', 'unnamed29', 'unnamed30', 'unnamed31', 'unnamed32', 'unnamed33', 'unnamed34',
    'unnamed35', 'unnamed36', 'unnamed37', 'unnamed38', 'unnamed39', 'unnamed40', 'unnamed41', 'unnamed42',
    'unnamed43', 'unnamed44', 'unnamed45', 'unnamed46', 'unnamed47', 'unnamed48', 'unnamed49', 'unnamed50',
    'unnamed51', 'unnamed52', 'unnamed53', 'unnamed54', 'unnamed55', 'unnamed56', 'unnamed57', 'unnamed58',
    'unnamed59', 'unnamed60', 'unnamed61', 'unnamed62', 'unnamed63', 'unnamed64', 'unnamed65', 'unnamed66',
    'unnamed67', 'unnamed68', 'unnamed69', 'unnamed70', 'unnamed71', 'unnamed72', 'unnamed73', 'unnamed74',
    'unnamed75', 'unnamed76', 'unnamed77', 'unnamed78', 'unnamed79', 'unnamed80', 'unnamed81', 'unnamed82',
    'unnamed83', 'unnamed84', 'unnamed85', 'unnamed86', 'unnamed87', 'unnamed88', 'unnamed89', 'unnamed90',
    'unnamed91', 'unnamed92', 'unnamed93', 'unnamed94', 'unnamed95', 'unnamed96', 'unnamed97', 'unnamed98',
    'unnamed99', 'unnamed100', 'unnamed101', 'unnamed102', 'unnamed103', 'unnamed104', 'unnamed105', 'unnamed106',
    'unnamed107', 'unnamed108', 'unnamed109', 'unnamed110', 'unnamed111', 'unnamed112', 'unnamed113', 'unnamed114',
    'unnamed115'];

const defaultSymbols: string[] = [
    '!', '&#x22;', '#', '$', '%', '&#x26;', "'", '(', ')', '*', '+', ' ', '-', '.', '/', '0', '1', '2', '3', '4',
    '5', '6', '7', '8', '9', ':', ';', '&#x3c;', '=', '&#x3e;', '?', '@', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
    'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '[', '\\', ']', '^',
    '_', '`', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
    'u', 'v', 'w', 'x', 'y', 'z', '', '', '~', '&#xe000;', '&#xe001;', '&#xe002;', '&#xe003;', '&#xe004;',
    '&#xe005;', '&#xe006;', '&#xe007;', '&#xe008;', '&#xe009;', '&#xe00a;', '&#xe00b;', '&#xe00c;', '&#xe00d;',
    '&#xe00e;', '&#xe00f;', '&#xe010;', 'Ã’', '&#xe019;', '&#xe020;', '&#x00bf;'];

const defaultEnabled: boolean[] = [
    true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true,
    true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true,
    true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true,
    true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true,
    true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true,
    true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true];

const defaultFrequencies: number[] = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

const defaultAliases: string[][] = [
    [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [],
    [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [],
    [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [],
    [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []];

const defaultColors: number[][] = [
    [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [],
    [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [],
    [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [],
    [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []];

export const defaultTags =
    new TagVector(defaultSymbols, defaultTagNames, defaultEnabled, defaultFrequencies, defaultAliases, defaultColors);
