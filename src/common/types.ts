export type Font = {
    fontFamily: string;
    src: string;
}

export type Tag = {
    id: string;
    name: string;
    uri: string;
    aliases?: string[];
    color?: string;
    font?: Font;
}

export type Set = {
    id: string;
    name: string;
    iconUrl: string;
    font?: Font;
    tags: Tag[];
}

export type User = {
    id: string;
    tags: Tag[];
}

export type ImportExportOptions = {
    users: boolean;
    sets: boolean;
    frequentlyUsedTags: boolean;
    settings: boolean;
}

export type Options = {
    import: ImportExportOptions;
    export: ImportExportOptions;
    tagListLimit: number;
    frequentlyUsedLimit: number;
}

export type FrequentlyUsed = {
    tag: Tag;
    count: number;
}
