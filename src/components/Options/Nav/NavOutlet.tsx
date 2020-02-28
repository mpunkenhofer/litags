import {Redirect, Route, Switch} from "react-router-dom";
import {Settings} from "../Pages/Settings";
import {Tags} from "../Pages/Tags";
import {Users} from "../Pages/Users";
import {Backup} from "../Pages/Backup";
import {Home} from "../Pages/Home";
import * as React from "react";

export const NavOutlet = () => (
    <Switch>
        <Route path='/settings'>
            <Settings/>
        </Route>
        <Route path='/tags'>
            <Tags/>
        </Route>
        <Route path='/users'>
            <Users/>
        </Route>
        <Route path='/backup'>
            <Backup/>
        </Route>
        <Route path="/options.html">
            <Redirect to='/home'/>
        </Route>
        <Route path='/home'>
            <Home/>
        </Route>
    </Switch>
);
