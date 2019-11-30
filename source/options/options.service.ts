import {Options} from "./options";
import {keys} from "../constants/keys";

const browser = require("webextension-polyfill");

class OptionService {
    async get(): Promise<Options> {
        const options = await browser.storage.sync.get(keys.options)[keys.options];

        if (!options) {
            this.set(defaultOptions);
            return defaultOptions;
        }

        return options;
    }

    async set(options: Options) {
        browser.storage.sync.set({[keys.options]: options});
    }
}

export const optionService = new OptionService();

const defaultOptions: Options = {
    enabled: true,
    gameEnabled: true,
    profileEnabled: true,
    maxTags: 8,
    frequentlyUsedCap: 20
};

