import {NavLink} from "react-router-dom";
import {browser} from "webextension-polyfill-ts";
import * as React from "react";

export const Nav = () => (
    <nav className={'col-md-3 col-xl-2 py-md-3 bg-light lt-options-sidebar'}>
        <ul className={'nav flex-row flex-md-column justify-content-center'}>
            <li className={'nav-item'}>
                <NavLink exact className={'nav-link d-flex'} to="/">
                    <img src={'/assets/home-solid.svg'} className={'mr-1 mr-md-3 lt-sidebar-icon'}
                         alt={'Home Icon'}/>
                    <span className={'d-none d-sm-flex'}>
                                        {browser.i18n.getMessage('home')}
                                    </span>
                </NavLink>
            </li>
            <li className={'nav-item'}>
                <NavLink className={'nav-link d-flex'} to="/settings">
                    <img src={'/assets/cogs-solid.svg'} className={'mr-1 mr-md-3 lt-sidebar-icon'}
                         alt={'Cogs Icon'}/>
                    <span className={'d-none d-sm-flex'}>
                                    {browser.i18n.getMessage('settings')}
                                    </span>
                </NavLink>
            </li>
            <li className={'nav-item'}>
                <NavLink className={'nav-link d-flex'} to="/tags">
                    <img src={'/assets/tags-solid.svg'} className={'mr-1 mr-md-3 lt-sidebar-icon'}
                         alt={'Tags Icon'}/>
                    <span className={'d-none d-sm-flex'}>
                                    {browser.i18n.getMessage('tags')}
                                    </span>
                </NavLink>
            </li>
            <li className={'nav-item'}>
                <NavLink className={'nav-link d-flex'} to="/users">
                    <img src={'/assets/users-solid.svg'} className={'mr-1 mr-md-3 lt-sidebar-icon'}
                         alt={'Users Icon'}/>
                    <span className={'d-none d-sm-flex'}>
                                    {browser.i18n.getMessage('users')}
                                    </span>
                </NavLink>
            </li>
            <li className={'nav-item'}>
                <NavLink className={'nav-link d-flex'} to="/backup">
                    <img src={'/assets/download-solid.svg'} className={'mr-1 mr-md-3 lt-sidebar-icon'}
                         alt={'Download Icon'}/>
                    <span className={'d-none d-sm-flex'}>
                                    {browser.i18n.getMessage('backup')}
                                    </span>
                </NavLink>
            </li>
        </ul>
    </nav>
);
