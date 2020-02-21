import {useEffect} from "react";

const setFocus = (ref, key: string, filter?: string[]) => (keyboardEvent: KeyboardEvent) => {
    if (ref && ref.current) {
        if (filter && filter.includes(keyboardEvent.key) || key && key !== keyboardEvent.key)
            return;
        ref.current.focus();
    }
};

export const useFocusOnAnyKeydown = (ref, filter?: string[]) => {
    useEffect(() => {
        document.addEventListener("keydown", setFocus(ref, null, filter));
        return () => {
            document.removeEventListener("keydown", setFocus(ref, null, filter));
        };
    }, [ref]);
};
