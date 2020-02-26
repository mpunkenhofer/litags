import {HashRouter} from "react-router-dom";
import * as React from "react";
import {Nav} from "./Nav/Nav";
import {NavOutlet} from "./Nav/NavOutlet";

export const Main = () => (
    <HashRouter hashType={'noslash'}>
        <div className={'container-fluid'}>
            <div className={'row flex-xl-nowrap'}>
                <Nav/>
                <NavOutlet/>
            </div>
        </div>
    </HashRouter>
);
