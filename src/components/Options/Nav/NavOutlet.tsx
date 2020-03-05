import {Redirect, Route, Switch} from "react-router-dom";
import {Settings} from "../Pages/Settings";
import {Sets} from "../Pages/Sets/Sets";
import {Users} from "../Pages/Users";
import {Backup} from "../Pages/Backup";
import {About} from "../Pages/About";
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
