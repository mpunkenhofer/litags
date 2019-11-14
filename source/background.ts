import {storageService} from "./storage";

const browser = require("webextension-polyfill");


console.log('[Background-Script] LiTags is open source! https://github.com/mpunkenhofer/litags');

browser.runtime.onInstalled.addListener(() => {
    // console.log('onInstalled...');
    // store default tags
    storageService.setDefaultTags();
    storageService.setDefaultOptions();
    // create alarm after extension is installed / upgraded
    //browser.alarms.create('refresh', { periodInMinutes: 3 });
});

// browser.runtime.onStartup.addListener(() => {
//     console.log('onStartup....');
// });

// browser.alarms.onAlarm.addListener((alarm: { name: any; }) => {
//     console.log(alarm.name); // refresh
//     helloWorld();
// });
