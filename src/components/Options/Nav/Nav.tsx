import {NavLink} from "react-router-dom";
import * as React from "react";
import {i18n} from "../../../constants/i18n";

export const Nav: React.FunctionComponent = () => (
    <nav>
        <ul className={'nav flex-row flex-md-column justify-content-center'}>
            <li className={'nav-item'}>
                <NavLink exact className={'nav-link d-flex'} to='/about'>
                    <img src={'/assets/home-solid.svg'} className={'mr-1 mr-md-3 lt-sidebar-icon'}
                         alt={'Home Icon'}/>
                    <span className={'d-none d-sm-flex'}>{i18n.about}</span>
                </NavLink>
            </li>
            <li className={'nav-item'}>
                <NavLink className={'nav-link d-flex'} to='/settings'>
                    <img src={'/assets/cogs-solid.svg'} className={'mr-1 mr-md-3 lt-sidebar-icon'}
                         alt={'Cogs Icon'}/>
                    <span className={'d-none d-sm-flex'}>{i18n.settings}</span>
                </NavLink>
            </li>
            <li className={'nav-item'}>
                <NavLink className={'nav-link d-flex'} to='/sets'>
                    <img src={'/assets/tags-solid.svg'} className={'mr-1 mr-md-3 lt-sidebar-icon'}
                         alt={'Tags Icon'}/>
                    <span className={'d-none d-sm-flex'}>{i18n.tagSets}</span>
                </NavLink>
            </li>
            <li className={'nav-item'}>
                <NavLink className={'nav-link d-flex'} to='/users'>
                    <img src={'/assets/users-solid.svg'} className={'mr-1 mr-md-3 lt-sidebar-icon'}
                         alt={'Users Icon'}/>
                    <span className={'d-none d-sm-flex'}>{i18n.users}</span>
                </NavLink>
            </li>
            <li className={'nav-item'}>
                <NavLink className={'nav-link d-flex'} to='/backup'>
                    <img src={'/assets/download-solid.svg'} className={'mr-1 mr-md-3 lt-sidebar-icon'}
                         alt={'Download Icon'}/>
                    <span className={'d-none d-sm-flex'}>{i18n.backup}</span>
                </NavLink>
            </li>
        </ul>
    </nav>
);
