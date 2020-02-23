import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {browser} from "webextension-polyfill-ts";
import {BrowserRouter as Router, NavLink, Route, Switch} from "react-router-dom";
import {Home} from "./components/Options/Home";
import {Settings} from "./components/Options/Settings";
import {Users} from "./components/Options/Users";
import {Tags} from "./components/Options/Tags";
import {Backup} from "./components/Options/Backup";

const Options = () => {
    return (
        <Router>
            <div className={'container-fluid'}>
                <div className={'row'}>
                    <nav className={'col-3'}>
                        <ul className={'nav flex-column nav-pills'}>
                            <li className={'nav-link'}>
                                <NavLink to="/">LiTags</NavLink>
                            </li>
                            <li className={'nav-link'}>
                                <NavLink to="/settings">{browser.i18n.getMessage('settings')}</NavLink>
                            </li>
                            <li className={'nav-link'}>
                                <NavLink to="/tags">{browser.i18n.getMessage('tags')}</NavLink>
                            </li>
                            <li className={'nav-link'}>
                                <NavLink to="/users">{browser.i18n.getMessage('users')}</NavLink>
                            </li>
                            <li className={'nav-link'}>
                                <NavLink to="/backup">{browser.i18n.getMessage('backup')}</NavLink>
                            </li>
                        </ul>
                    </nav>
                    <Switch>
                        <div className={'col-9'}>
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
                        </div>
                    </Switch>
                </div>
            </div>
        </Router>
    );
};

ReactDOM.render(<Options/>, document.getElementById('root') as HTMLElement);
