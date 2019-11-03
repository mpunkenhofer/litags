interface OptionsInterface {
    enabled: boolean,
    gameEnabled: boolean,
    profileEnabled: boolean,
    maxTags: number
}

const optionDefaults: OptionsInterface = {
    enabled: true,
    gameEnabled: true,
    profileEnabled: true,
    maxTags: 10
};

export class Options {
    static getOptions() {

    }

    static setOptions(options: Object) {

    }
}

