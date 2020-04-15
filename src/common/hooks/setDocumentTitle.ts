import {useEffect} from "react";


export const useSetDocumentTitle = (...args: string[]): void => {
    useEffect(() => {
        if(args) {
            document.title = args.join(' · ');
        }
    }, [args]);
};
