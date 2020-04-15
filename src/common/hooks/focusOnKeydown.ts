import {MutableRefObject, useEffect} from "react";

const setFocus = (ref: MutableRefObject<HTMLInputElement | null>, filter?: string[]) =>
    (keyboardEvent: KeyboardEvent): void => {
    if (ref && ref.current) {
        if (filter && filter.includes(keyboardEvent.key))
            return;
        ref.current.focus();
    }
};

export const useFocusOnAnyKeydown = (ref: MutableRefObject<HTMLInputElement | null>, filter?: string[]): void => {
    useEffect(() => {
        document.addEventListener("keydown", setFocus(ref, filter));
        return (): void => {
            document.removeEventListener("keydown", setFocus(ref, filter));
        };
    }, [filter, ref]);
};
