import * as React from "react";
import { LINKS } from "../../constants/links";
import pkg from '../../../package.json';

export const Navbar: React.FunctionComponent = () => (
    <nav className={'navbar navbar-expand navbar-dark bg-primary flex-column flex-md-row lt-options-navbar'}>
        <a className={'navbar-brand flex-column'} href={'/options.html'}>
                <img src={'/assets/images/litags_icon_bg.svg'}
                    className={'d-inline-block align-top mr-2 mr-md-4 lt-brand-icon'} alt={'Litags Icon'} />
            LiTags
        </a>
        <ul className={'navbar-nav ml-md-auto mr-md-3'}>
            <li className={'nav-item mr-md-2'}>
                <span className={'navbar-text p-2'}>{`v${pkg.version}`}</span>
            </li>
            <li className={'nav-item'}>
                <a className={'nav-link p-2'} href={LINKS.GITHUB} target={'_blank'} rel={'noopener noreferrer'}
                    aria-label={'GitHub'}>
                    <img src={'/assets/images/github.svg'} className={'lt-navbar-icon'}
                        alt={'GitHub Litags Repository'} />
                </a>
            </li>
            <li className={'nav-item'}>
                <a className={'nav-link p-2'} href={LINKS.DISCORD} target={'_blank'} rel={'noopener noreferrer'}
                    aria-label={'Discord'}>
                    <img src={'/assets/images/discord.svg'} className={'lt-navbar-icon'}
                        alt={'Discord Community'} />
                </a>
            </li>
            <li className={'nav-item'}>
                <a className={'nav-link p-2'} href={LINKS.PAYPAL} target={'_blank'} rel={'noopener noreferrer'}
                    aria-label={'PayPal'}>
                    <img src={'/assets/images/paypal.svg'} className={'lt-navbar-icon'}
                        alt={'PayPal Donation Link'} />
                </a>
            </li>
        </ul>
    </nav>
);
