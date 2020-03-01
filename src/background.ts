import { browser } from "webextension-polyfill-ts";

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

const onError = (error: string): void => {
    console.error(`Error: ${error}`);
};

browser.commands.onCommand.addListener(command =>  {
    browser.tabs.query({currentWindow: true,active: true})
        .then(tabs => {
            for (const tab of tabs) {
                if(tab.id)
                    browser.tabs.sendMessage(tab.id,{command}).catch(onError);
            }
        }).catch(onError);
});
