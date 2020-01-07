// import {storageService} from "./storage";
// import {keys} from "../constants/keys";
// import {TagSet} from "../tag/tag-set";
// import {User} from "../user/user";
// import {ID} from "./id";
//
// const browser = require("webextension-polyfill");
// const pkg = require('../../package.json');
//
// export async function importBackup(data: string) {
//     const backup = JSON.parse(data);
//     const options = await storageService.getOptions();
//
//     if (options.importOptions.settings && backup.hasOwnProperty(keys.backup.settings)) {
//         const importedOptions = backup[keys.backup.settings];
//         await storageService.setOptions(importedOptions);
//     }
//
//     if (options.importOptions.sets && backup.hasOwnProperty(keys.backup.sets)) {
//         const sets = backup[keys.backup.sets];
//
//         for(const set in sets) {
//             if(sets.hasOwnProperty(set))
//                 await TagSet.fromData(sets[set], new ID(set)).store();
//         }
//     }
//
//     if (options.importOptions.users && backup.hasOwnProperty(keys.backup.users)) {
//         const users = backup[keys.backup.users];
//
//         for(const user in users) {
//             if(users.hasOwnProperty(user)) {
//                 const importedUser = await User.fromData(user, users[user]);
//                 await importedUser.store();
//             }
//         }
//     }
//
//     if (options.importOptions.frequentlyUsed && backup.hasOwnProperty(keys.backup.frequentlyUsed)) {
//         const freqUsed = backup[keys.backup.frequentlyUsed];
//         await browser.storage.sync.set({[keys.frequentlyUsed]: freqUsed});
//     }
// }
//
// export async function exportBackup(): Promise<string> {
//     const backup = {};
//
//     backup[keys.backup.version] = pkg.version;
//     backup[keys.backup.date] = new Date().getTime();
//
//     const options = await storageService.getOptions();
//
//     if (options.exportOptions.settings)
//         backup[keys.backup.settings] = options;
//
//     if (options.exportOptions.sets) {
//         const sets = await storageService.getTagSets();
//
//         if(sets && sets.length > 0) {
//             const setBackup = {};
//
//             for (const set of sets) {
//                 setBackup[set.getID().toString()] = set.toData();
//             }
//
//             backup[keys.backup.sets] = setBackup;
//         }
//     }
//
//     if (options.exportOptions.users) {
//         const users = await storageService.getAllUsers();
//
//         if(users && users.length > 0) {
//             const userBackup = {};
//
//             for (const user of users) {
//                 userBackup[user.getUserName()] = user.toData();
//             }
//
//             backup[keys.backup.users] = userBackup;
//         }
//     }
//
//     if (options.exportOptions.frequentlyUsed) {
//         const freqUsed = (await browser.storage.sync.get(keys.frequentlyUsed))[keys.frequentlyUsed];
//
//         if(freqUsed)
//             backup[keys.backup.frequentlyUsed] = freqUsed;
//     }
//
//     return JSON.stringify(backup, null, 2);
// }
