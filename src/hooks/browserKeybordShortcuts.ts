import {useEffect} from "react";
import {browser} from "webextension-polyfill-ts";

interface ShortcutHandler {
    shortcut: string;
    handler: () => void;
}

const onMessageHandler = (shortcutHandler: ShortcutHandler[]) => (message: {command: string}): void => {
    for(const handler of shortcutHandler) {
        if(handler.shortcut === message.command) {
           handler.handler();
        }
    }
};

export const useBrowserKeyboardShortcuts = (...args: ShortcutHandler[]): void => {
    useEffect(() => {
        if(args) {
            browser.runtime.onMessage.addListener(onMessageHandler(args));
            return (): void => {
                browser.runtime.onMessage.removeListener(onMessageHandler(args))
            }
        } else {
            return undefined;
        }
    }, [args]);
};
