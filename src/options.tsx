import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";

const browser = require("webextension-polyfill");

const Options = () => (
    <Router>
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="/">LiTags</Link>
                    </li>
                    <li>
                        <Link to="/settings">{browser.i18n.getMessage('settings')}</Link>
                    </li>
                    <li>
                        <Link to="/tags">{browser.i18n.getMessage('tags')}</Link>
                    </li>
                    <li>
                        <Link to="/users">{browser.i18n.getMessage('users')}</Link>
                    </li>
                    <li>
                        <Link to="/backup">{browser.i18n.getMessage('backup')}</Link>
                    </li>
                </ul>
            </nav>
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
                <Route path="/">
                    <Home/>
                </Route>
            </Switch>
        </div>
    </Router>
);

const Home = () => {
    return <h2>Home</h2>;
};

const Settings = () => {
    return <h2>Settings</h2>;
};

const Tags = () => {
    return <h2>Tags</h2>;
};

const Users = () => {
    return <h2>Users</h2>;
};

const Backup = () => {
    return <h2>Backup</h2>;
};

ReactDOM.render(<Options/>, document.getElementById('root') as HTMLElement);
