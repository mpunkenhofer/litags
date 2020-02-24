import {useEffect} from "react";


export const useSetDocumentTitle = (...args: string[]) => {
    useEffect(() => {
        if(args) {
            document.title = args.join(' · ');
        }
    }, []);
};
