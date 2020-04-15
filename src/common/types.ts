export type Tag = {
    id: string;
    name: string;
    aliases: string[];
    uri: string;
    color?: string;
}

export type Set = {
    id: string;
    name: string;
    iconUrl: string;
    fontUrl: string;
    tags: Tag[];
}

export type User = {
    name: string;
    tags: string[];
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

export type FrequentlyUsed = [string, number][];