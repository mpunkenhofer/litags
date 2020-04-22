import {
    Options,
    User,
    Set,
    FrequentlyUsed,
} from "./types";
import isEmpty from 'lodash/isempty';
import pkg from '../../package.json';
import { setOptions, setSets, setFrequentlyUsed, setUsers, getOptions, getUsers, getSets, getFrequentlyUsed } from "./storage";

interface Backup {
    app: string;
    version: string;
    url: string;
    date: number;
    settings?: Options;
    users?: User[];
    sets?: Set[];
    frequentlyUsed?: FrequentlyUsed[];
}

export const importBackup = async (options: Options, data: string): Promise<void> => {
    const backup: Backup = JSON.parse(data);

    // console.log('IMPORT BACKUP');
    // console.log(backup);
    // console.log(options);

    if (options.import.settings && !isEmpty(backup.settings) && backup.settings) {
        await setOptions(backup.settings);
    }

    if (options.import.sets && !isEmpty(backup.sets) && backup.sets) {
        await setSets(backup.sets);
    }

    if (options.import.frequentlyUsedTags && !isEmpty(backup.frequentlyUsed) && backup.frequentlyUsed) {
        await setFrequentlyUsed(backup.frequentlyUsed);
    }

    if (options.import.users && !isEmpty(backup.users) && backup.users) {
        await setUsers(backup.users);
    }
};

export const exportBackup = async (options: Options): Promise<string> => {
    const backup: Backup = {
        app: pkg.name,
        version: pkg.version,
        url: pkg.homepage,
        date: Date.now(),
        settings: options.export.settings ? await getOptions() : undefined,
        users: options.export.users ? await getUsers() : undefined,
        sets: options.export.sets ? await getSets() : undefined,
        frequentlyUsed: options.export.frequentlyUsedTags ? await getFrequentlyUsed() : undefined
    };

    return JSON.stringify(backup, null, 2);
};

interface SetBackup {
    app: string;
    version: string;
    url: string;
    date: number;
    set: Set;
}

export const importSet = (data: string): Set | null => {
    const setData: SetBackup = JSON.parse(data);

    if (!isEmpty(setData.set) && setData.set) {
        return setData.set;
    }

    return null;
}

export const exportSet = async (id: string): Promise<string | null> => {
    const setToExport = (await getSets()).filter(set => set.id === id);

    if(setToExport.length > 0) {
        const exportData: SetBackup = {
            app: pkg.name,
            version: pkg.version,
            url: pkg.homepage,
            date: Date.now(),
            set: setToExport[0]
        }

        return JSON.stringify(exportData, null, 2);
    }

    return null;
}