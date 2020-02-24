import {Redirect, Route, Switch} from "react-router-dom";
import {Settings} from "./Settings";
import {Tags} from "./Tags";
import {Users} from "./Users";
import {Backup} from "./Backup";
import {Home} from "./Home";
import * as React from "react";

export const NavOutlet = () => (
    <main className={'col-md-9 col-xl-10 py-md-3 pl-md-5 bg-white'}>
        <Switch>
            <Route path="/settings">
                <Settings/>
            </Route>
            <Route path="/tags">
                <Tags/>
            </Route>
            <Route path="/users">
                <Users/>
            </Route>
            <Route path="/backup">
                <Backup/>
            </Route>
            <Route path="/options.html">
                <Redirect to="/"/>
            </Route>
            <Route path="/">
                <Home/>
            </Route>
        </Switch>
    </main>
);
