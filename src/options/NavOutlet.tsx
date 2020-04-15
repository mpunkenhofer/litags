import {Redirect, Route, Switch} from "react-router-dom";
import {Settings} from "./pages/Settings";
import {Sets} from "./pages/sets/Sets";
import {Users} from "./pages/Users";
import {Backup} from "./pages/Backup";
import {About} from "./pages/About";
import * as React from "react";

export const NavOutlet: React.FunctionComponent = () => (
    <Switch>
        <Route path='/about'>
            <About/>
        </Route>
        <Route path='/settings'>
            <Settings/>
        </Route>
        <Route path='/sets'>
            <Sets/>
        </Route>
        <Route path='/users'>
            <Users/>
        </Route>
        <Route path='/backup'>
            <Backup/>
        </Route>
        <Route path="/">
            <Redirect to='/about'/>
        </Route>
    </Switch>
);
