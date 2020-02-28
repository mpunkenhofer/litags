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

const pkg = require('../../package.json');

interface Backup {
    app: string
    version: string,
    url: string,
    date: number,
    settings?: Options,
    users?: User[],
    sets?: Set[],
    frequentlyUsed?: FrequentlyUsed
}

export async function importBackup(options: Options, data: string) {
    const backup: Backup = JSON.parse(data);

    // console.log('IMPORT BACKUP');
    // console.log(backup);
    // console.log(options);

    if(options.import.settings && !isEmpty(backup.settings)) {
        await postOptions(backup.settings);
    }

    if(options.import.sets && !isEmpty(backup.sets)) {
        await postSets(backup.sets);
    }

    if(options.import.frequentlyUsedTags && !isEmpty(backup.frequentlyUsed)) {
        await postFrequentlyUsed(backup.frequentlyUsed);
    }

    if(options.import.users && !isEmpty(backup.users)) {
        console.log('hello');
        await postUsers(backup.users);
    }
}

export async function exportBackup(options: Options): Promise<string> {
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
}
