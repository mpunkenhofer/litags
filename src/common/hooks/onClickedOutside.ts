import {MutableRefObject, useEffect} from "react";

const handleClickOutside = (ref: MutableRefObject<HTMLElement | null>, cb: () => void) => (event: MouseEvent): void => {
    if (event && event.target && ref.current && !ref.current.contains(event.target as Node)) {
        cb();
    }
};

export const useOnClickedOutside = (ref: MutableRefObject<HTMLElement | null>, cb: () => void): void => {
    useEffect(() => {
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside(ref, cb));
        return (): void => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside(ref, cb));
        };
    }, [ref, cb]);
};