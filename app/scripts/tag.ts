interface TagInterface {
    name: string,
    readonly symbol: string,
    enabled: boolean,
    frequency: number,
    aliases: string[],
    colors: number[]
}

const tagDefaults: TagInterface[] = [
    {
        name: "unnamed1",
        symbol: "!",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed2",
        symbol: "&#x22;",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed3",
        symbol: "#",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed4",
        symbol: "$",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed5",
        symbol: "%",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed6",
        symbol: "&#x26;",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed7",
        symbol: "'",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed8",
        symbol: "(",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed9",
        symbol: ")",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed10",
        symbol: "*",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed11",
        symbol: "+",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed12",
        symbol: ",",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed13",
        symbol: "-",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed14",
        symbol: ".",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed16",
        symbol: "/",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed17",
        symbol: "0",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed18",
        symbol: "1",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed19",
        symbol: "2",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed20",
        symbol: "3",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed21",
        symbol: "4",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed22",
        symbol: "5",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed23",
        symbol: "6",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed24",
        symbol: "7",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed25",
        symbol: "8",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed26",
        symbol: "9",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed27",
        symbol: ":",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed28",
        symbol: ";",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed29",
        symbol: "&#x3c;",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed30",
        symbol: "=",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed31",
        symbol: "&#x3e;",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed32",
        symbol: "?",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed33",
        symbol: "@",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed34",
        symbol: "A",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed35",
        symbol: "B",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed36",
        symbol: "C",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed37",
        symbol: "D",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed38",
        symbol: "E",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed39",
        symbol: "F",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed40",
        symbol: "G",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed41",
        symbol: "H",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed42",
        symbol: "I",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed43",
        symbol: "J",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed44",
        symbol: "K",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed45",
        symbol: "L",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed46",
        symbol: "M",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed47",
        symbol: "N",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed48",
        symbol: "O",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed49",
        symbol: "P",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed50",
        symbol: "Q",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed51",
        symbol: "R",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed52",
        symbol: "S",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed53",
        symbol: "T",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed54",
        symbol: "U",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed55",
        symbol: "V",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed56",
        symbol: "W",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed57",
        symbol: "X",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed58",
        symbol: "Y",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed59",
        symbol: "Z",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed60",
        symbol: "[",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed61",
        symbol: "\\",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed62",
        symbol: "]",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed63",
        symbol: "^",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed64",
        symbol: "_",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed65",
        symbol: "`",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed66",
        symbol: "a",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed67",
        symbol: "b",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed68",
        symbol: "c",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed69",
        symbol: "d",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed70",
        symbol: "e",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed71",
        symbol: "f",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed72",
        symbol: "g",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed73",
        symbol: "h",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed74",
        symbol: "i",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed75",
        symbol: "j",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed76",
        symbol: "k",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed77",
        symbol: "l",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed78",
        symbol: "m",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed79",
        symbol: "n",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed80",
        symbol: "o",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed81",
        symbol: "p",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed82",
        symbol: "q",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed83",
        symbol: "r",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed84",
        symbol: "s",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed85",
        symbol: "t",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed86",
        symbol: "u",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed87",
        symbol: "v",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed88",
        symbol: "w",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed89",
        symbol: "x",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed90",
        symbol: "y",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed91",
        symbol: "z",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed92",
        symbol: "{",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed93",
        symbol: "}",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed94",
        symbol: "~",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed95",
        symbol: "&#xe000;",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed96",
        symbol: "&#xe001;",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed97",
        symbol: "&#xe002;",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed98",
        symbol: "&#xe003;",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed99",
        symbol: "&#xe004;",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed100",
        symbol: "&#xe005;",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed101",
        symbol: "&#xe006;",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed102",
        symbol: "&#xe007;",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed103",
        symbol: "&#xe008;",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed104",
        symbol: "&#xe009;",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed105",
        symbol: "&#xe00a;",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed106",
        symbol: "&#xe00b;",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed107",
        symbol: "&#xe00c;",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed108",
        symbol: "&#xe00d;",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed109",
        symbol: "&#xe00e;",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed110",
        symbol: "&#xe00f;",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed111",
        symbol: "&#xe010;",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed112",
        symbol: "Ã’",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed113",
        symbol: "&#xe019;",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed114",
        symbol: "&#xe020;",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    },
    {
        name: "unnamed115",
        symbol: "&#x00bf;",
        enabled: true,
        frequency: 0,
        aliases: [],
        colors: []
    }
];

export class Tag implements TagInterface {
    aliases: string[];
    colors: number[];
    enabled: boolean;
    frequency: number;
    name: string;
    readonly symbol: string;

    static toStorage(tag: TagInterface) {
        return 0;
    }
}
