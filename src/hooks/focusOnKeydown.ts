import {useEffect} from "react";

export const useFocusOnKeydown = (ref) => {
    const setFocus = (ref) => () => {
        if (ref && ref.current)
            ref.current.focus();
    };

    useEffect(() => {
        // Bind the event listener
        document.addEventListener("keydown", setFocus(ref));
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("keydown", setFocus(ref));
        };
    }, [ref]);
};