export interface Options {
    enabled: boolean,
    gameEnabled: boolean,
    profileEnabled: boolean,
    maxTags: number
    frequentlyUsedCap: number
}

export const defaults: Options = {
    enabled: true,
    gameEnabled: true,
    profileEnabled: true,
    maxTags: 8,
    frequentlyUsedCap: 20
};