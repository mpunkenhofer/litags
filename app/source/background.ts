import {Tag} from "./tag";
import {setDefaultOptions} from "./options";

// we put those requries because of some hotreload issues
require('./font.scss');
require('./layout.scss');
require('./button.scss');
require('./list.scss');

const browser = require("webextension-polyfill");

console.log('Litags! Hello from background script!');

browser.runtime.onInstalled.addListener(() => {
    // console.log('onInstalled...');
    // store default tags
    Tag.setDefaultTags();
    setDefaultOptions();
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
