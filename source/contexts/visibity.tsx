import * as React from "react";
import {useState} from "react";

const VisibilityContext = React.createContext(null);

const VisibilityProvider = ({children}) => {
    const [visible, setVisible] = useState(false);

    return (
        <VisibilityContext.Provider value={{visible: visible, setVisible: setVisible}}>
            {children}
        </VisibilityContext.Provider>
    );
};

export {VisibilityProvider, VisibilityContext}