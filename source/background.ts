import {storageService} from "./storage";

const browser = require("webextension-polyfill");

// we put those requries because of some hotreload issues
require('./font.scss');
require('./layout.scss');
require('./button.scss');
require('./list.scss');

console.log('Litags! Hello from background script!');

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
