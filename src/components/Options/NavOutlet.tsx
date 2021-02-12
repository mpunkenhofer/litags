import { Redirect, Route, Switch } from "react-router-dom";
import { Settings } from "./Settings/Settings";
import { Sets } from "./Tags/Sets";
import { Users } from "./Users/Users";
import { Backup } from "./Backup/Backup";
import { About } from "./About/About";
import * as React from "react";

export const NavOutlet: React.FunctionComponent = () => (
    <Switch>
        <Route path='/about'>
            <About />
        </Route>
        <Route path='/settings'>
            <Settings />
        </Route>
        <Route path='/tags'>
            <Sets />
        </Route>
        <Route path='/users'>
            <Users />
        </Route>
        <Route path='/backup'>
            <Backup />
        </Route>
        <Redirect from='/' to='/about' />
    </Switch>
);
