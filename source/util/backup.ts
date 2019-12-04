import {storageService} from "./storage";
import {keys} from "../constants/keys";

const pkg = require('../../package.json');

export async function importBackup(backup: string) {

}

export async function exportBackup(): Promise<Object> {
    const backup = {};

    backup[keys.backup.version] = pkg.version;
    backup[keys.backup.date] = new Date().getTime();
    const options = await storageService.getOptions();

    if (options.exportOptions.settings)
        backup[keys.backup.settings] = options;

    if (options.exportOptions.sets) {
        const sets = (await storageService.getTagSets());

        const setBackup = {};

        for (const set of sets) {
            setBackup[set.getName()] = set.toData();
        }

        backup[keys.backup.sets] = setBackup;
    }

    if (options.exportOptions.users) {
        const users = (await storageService.getAllUsers());

        const userBackup = {};

        for (const user of users) {
            userBackup[user.getUserName()] = user.toData();
        }

        backup[keys.backup.users] = userBackup;
    }

    if (options.exportOptions.frequentlyUsed) {
        backup[keys.backup.frequentlyUsed] = (await storageService.getFrequentlyUsed()).map(tag => tag.toData());
    }

    return JSON.stringify(backup);
}