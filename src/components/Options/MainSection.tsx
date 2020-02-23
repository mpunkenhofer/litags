import {BrowserRouter as Router, NavLink, Route, Switch} from "react-router-dom";
import {browser} from "webextension-polyfill-ts";
import {Settings} from "./Settings";
import {Tags} from "./Tags";
import {Users} from "./Users";
import {Backup} from "./Backup";
import {Home} from "./Home";
import * as React from "react";

export const MainSection = () => {
    return (
        <Router>
            <div className={'container-fluid'}>
                <div className={'row flex-xl-nowrap lt-options-sidebar'}>
                    <nav className={'col-md-3 col-xl-2'}>
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
                    <main className={'col-md-9 col-xl-10 py-md-3 pl-md-5'}>
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
                    </main>
                </div>
            </div>
        </Router>
    );
};
