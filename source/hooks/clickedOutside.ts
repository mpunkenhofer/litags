import {useEffect} from "react";

export const useClickedOutside = (ref, callback: () => any) => {
    function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
            callback();
        }
    }

    useEffect(() => {
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
};