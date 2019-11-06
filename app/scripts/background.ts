import {Tag} from "./tag";

const browser = require("webextension-polyfill/dist/browser-polyfill.min");

console.log('Litags! Hello from background script!');

browser.runtime.onInstalled.addListener(() => {
    console.log('onInstalled...');
    // store default tags
    Tag.setDefaultTags();
    // create alarm after extension is installed / upgraded
    //browser.alarms.create('refresh', { periodInMinutes: 3 });
});

browser.runtime.onStartup.addListener(() => {
    console.log('onStartup....');
});

// browser.alarms.onAlarm.addListener((alarm: { name: any; }) => {
//     console.log(alarm.name); // refresh
//     helloWorld();
// });
