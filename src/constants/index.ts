import { Options, ImportExportOptions } from "../types";

const importExportDefaults: ImportExportOptions = {
    users: true,
    sets: true,
    frequentlyUsedTags: true,
    settings: true
};

export const defaultOptions: Options = {
    tagListLimit: 10, 
    frequentlyUsedLimit: 20, 
    export: importExportDefaults, 
    import: importExportDefaults,
    showFrequentlyUsed: true,
    showSearchField: true
};

export const ICONS = {
    addTag: ["\ue042"],
    fav: ["\ue00D"],
    search: ["\ue06c"],
    options: ["\ue061"],
    remove: ["\ue03f"]
};

export const imageUploadTimeout = 30000; // in ms