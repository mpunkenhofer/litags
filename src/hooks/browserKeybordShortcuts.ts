import {useEffect} from "react";
import {browser} from "webextension-polyfill-ts";

interface ShortcutHandler {
    shortcut: string,
    handler: () => void
}

const onMessageHandler = (shortcutHandler: ShortcutHandler[]) => (message: {command: string}) => {
    for(const handler of shortcutHandler) {
        if(handler.shortcut === message.command) {
           handler.handler();
        }
    }
};

export const useBrowserKeyboardShortcuts = (...args: ShortcutHandler[]) => {
    useEffect(() => {
        if(args) {
            browser.runtime.onMessage.addListener(onMessageHandler(args));
            return () => {
                browser.runtime.onMessage.removeListener(onMessageHandler(args))
            }
        } else {
            return undefined;
        }
    }, []);
};
