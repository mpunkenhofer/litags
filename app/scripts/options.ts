interface OptionsInterface {
    enabled: boolean,
    gameEnabled: boolean,
    profileEnabled: boolean,
    maxTags: number
}

const defaults: OptionsInterface = {
    enabled: true,
    gameEnabled: true,
    profileEnabled: true,
    maxTags: 8
};

export class Options {
    static getAllOptions() {
        return defaults;
    }

    static setOptions(options: Object) {

    }
}

