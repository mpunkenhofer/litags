import { Redirect, Route, Switch } from "react-router-dom";
import { FrequentlyUsed } from "./pages/tags/FrequentlyUsed";
import { Settings } from "./pages/Settings";
import { Sets } from "./pages/tags/sets/Sets";
import { Users } from "./pages/Users";
import { Backup } from "./pages/Backup";
import { About } from "./pages/About";
import * as React from "react";

export const NavOutlet: React.FunctionComponent = () => (
    <Switch>
        <Route path='/about'>
            <About />
        </Route>
        <Route path='/settings'>
            <Settings />
        </Route>
        <Redirect exact from='/tags' to='tags/sets'/>
        <Route path='/tags/sets'>
            <Sets/>
        </Route>
        <Route path='/tags/frequentlyUsed'>
            <FrequentlyUsed/>
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
