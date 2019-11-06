import {Tag} from "./tag";
import {User} from './user';

// we put those requries because of some hotreload issues

require('../styles/font.scss');
require('../styles/layout.scss');
require('../styles/button.scss');
require('../styles/list.scss');

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
