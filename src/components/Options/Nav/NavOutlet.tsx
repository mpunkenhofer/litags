import {Redirect, Route, Switch} from "react-router-dom";
import {Settings} from "../pages/Settings";
import {Tags} from "../pages/Tags";
import {Users} from "../pages/Users";
import {Backup} from "../pages/Backup";
import {Home} from "../pages/Home";
import * as React from "react";

export const NavOutlet = () => (
    <main className={'col-md-9 col-xl-10 py-2 py-md-4 pl-md-5 bg-white'}>
        <Switch>
            <Route path='settings'>
                <Settings/>
            </Route>
            <Route path='tags'>
                <Tags/>
            </Route>
            <Route path={'/users'}>
                <Users/>
            </Route>
            <Route path='backup'>
                <Backup/>
            </Route>
            <Route path="/options.html">
                <Redirect to='home'/>
            </Route>
            <Route path='home'>
                <Home/>
            </Route>
        </Switch>
    </main>
);
