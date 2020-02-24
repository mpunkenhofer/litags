import {BrowserRouter as Router} from "react-router-dom";
import * as React from "react";
import {Nav} from "./Nav";
import {NavOutlet} from "./NavOutlet";

export const Main = () => (
    <Router>
        <div className={'container-fluid'}>
            <div className={'row flex-xl-nowrap'}>
                <Nav/>
                <NavOutlet/>
            </div>
        </div>
    </Router>
);
