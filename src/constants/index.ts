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
    import: importExportDefaults
};
