import {
    getOptions,
    getUsers,
    Options,
    User,
    Set,
    FrequentlyUsed,
    getSets,
    getFrequentlyUsed,
    postOptions, postSets, postFrequentlyUsed, postUsers
} from "../api/storageAPI";
import isEmpty from 'lodash/isempty';
import pkg from '../../package.json';

interface Backup {
    app: string;
    version: string;
    url: string;
    date: number;
    settings?: Options;
    users?: User[];
    sets?: Set[];
    frequentlyUsed?: FrequentlyUsed;
}

export const importBackup = async (options: Options, data: string): Promise<void> => {
    const backup: Backup = JSON.parse(data);

    // console.log('IMPORT BACKUP');
    // console.log(backup);
    // console.log(options);

    if (options.import.settings && !isEmpty(backup.settings) && backup.settings) {
        await postOptions(backup.settings);
    }

    if (options.import.sets && !isEmpty(backup.sets) && backup.sets) {
        await postSets(backup.sets);
    }

    if (options.import.frequentlyUsedTags && !isEmpty(backup.frequentlyUsed) && backup.frequentlyUsed) {
        await postFrequentlyUsed(backup.frequentlyUsed);
    }

    if (options.import.users && !isEmpty(backup.users) && backup.users) {
        await postUsers(backup.users);
    }
};

export const exportBackup  = async (options: Options): Promise<string> => {
    const backup: Backup = {
        app: pkg.name,
        version: pkg.version,
        url: pkg.homepage,
        date: new Date().getTime(),
        settings: options.export.settings ? await getOptions() : undefined,
        users: options.export.users ? await getUsers() : undefined,
        sets: options.export.sets ? await getSets() : undefined,
        frequentlyUsed: options.export.frequentlyUsedTags ? await getFrequentlyUsed() : undefined
    };

    return JSON.stringify(backup, null, 2);
};
