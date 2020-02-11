const browser = require("webextension-polyfill");

console.log('LiTags is open source! https://github.com/mpunkenhofer/litags');

// browser.runtime.onInstalled.addListener(() => {
//     // store defaults
//     // storageService.setDefaultTags();
//     // storageService.setDefaultOptions();
// });

// browser.runtime.onMessage.addListener((request: { enabled: boolean; }) => {
//     console.log(request);
//
//     if(request.enabled)
//         browser.pageAction.setIcon({path: "assets/litags_icon32.png"});
// });
