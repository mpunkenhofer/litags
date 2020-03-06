import * as React from "react";
import {useSetDocumentTitle} from "../../../hooks/setDocumentTitle";
import {i18n} from "../../../constants/i18n";
import {Card, Button, Container, Row, Col} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import {LINKS} from "../../../constants/links";

export const About: React.FunctionComponent = () => {
    useSetDocumentTitle(i18n.about, 'Litags');

    const history = useHistory();

    return (
        <>
            <h1 className={'display-4 pb-2'}>{i18n.about}</h1>
            <p className='py-2'>{i18n.appDescriptionWithoutLink} <a href={'https://lichess.org/'}>lichess.org</a>.</p>

            <Container className='py-2' fluid={true}>
                <Row className='pb-2 pb-md-4'>
                    <Col>
                        <Card border="primary">
                            <Card.Header>
                                <img src={'/assets/cogs-solid.svg'} className={'lt-about-header-icon'}
                                     alt={'Settings Icon'}/>
                            </Card.Header>
                            <Card.Body>
                                <Card.Title>{i18n.settings}</Card.Title>
                                <Card.Text>
                                    {i18n.aboutSettingsDescription}
                                </Card.Text>
                                <Button variant="outline-primary"
                                        onClick={(): void => {
                                            history.push('/settings')
                                        }}>
                                    {`${i18n.goTo} ${i18n.settings}`}
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card border="primary">
                            <Card.Header>
                                <img src={'/assets/tags-solid.svg'} className={'lt-about-header-icon'}
                                     alt={'Tag Sets Icon'}/>
                            </Card.Header>
                            <Card.Body>
                                <Card.Title>{i18n.tagSets}</Card.Title>
                                <Card.Text>
                                    {i18n.aboutTagSetsDescription}
                                </Card.Text>
                                <Button variant="outline-primary"
                                        onClick={(): void => {
                                            history.push('/sets')
                                        }}>
                                    {`${i18n.goTo} ${i18n.tagSets}`}
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row className='pb-2 pb-md-4'>
                    <Col>
                        <Card border="primary">
                            <Card.Header>
                                <img src={'/assets/users-solid.svg'} className={'lt-about-header-icon'}
                                     alt={'Users Icon'}/>
                            </Card.Header>
                            <Card.Body>
                                <Card.Title>{i18n.users}</Card.Title>
                                <Card.Text>
                                    {i18n.aboutUsersDescription}
                                </Card.Text>
                                <Button variant="outline-primary"
                                        onClick={(): void => {
                                            history.push('/users')
                                        }}>
                                    {`${i18n.goTo} ${i18n.users}`}
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card border="primary">
                            <Card.Header>
                                <img src={'/assets/download-solid.svg'} className={'lt-about-header-icon'}
                                     alt={'Backup Icon'}/>
                            </Card.Header>
                            <Card.Body>
                                <Card.Title>{i18n.backup}</Card.Title>
                                <Card.Text>
                                    {i18n.aboutBackupDescription}
                                </Card.Text>
                                <Button variant="outline-primary"
                                        onClick={(): void => {
                                            history.push('/backup')
                                        }}>
                                    {`${i18n.goTo} ${i18n.backup}`}
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row className='pb-2 pb-md-4'>
                    <Col>
                        <Card border="primary">
                            <Card.Header>
                                <img src={'/assets/github_black.svg'} className={'lt-about-header-icon'}
                                     alt={'Github Icon'}/>
                            </Card.Header>
                            <Card.Body>
                                <Card.Title>{i18n.contributing}</Card.Title>
                                <Card.Text>
                                    {i18n.aboutContributionDescription}
                                </Card.Text>
                                <a className={'btn btn-outline-primary'} href={LINKS.GITHUB}
                                   target={'_blank'} rel={'noopener noreferrer'} aria-label={'GitHub'}>
                                    GitHub
                                </a>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card border="primary">
                            <Card.Header>
                                <img src={'/assets/discord_black.svg'} className={'lt-about-header-icon'}
                                     alt={'Discord Icon'}/>
                            </Card.Header>
                            <Card.Body>
                                <Card.Title>{i18n.community}</Card.Title>
                                <Card.Text>
                                    {i18n.aboutCommunityDescription}
                                </Card.Text>
                                <a className={'btn btn-outline-primary'} href={LINKS.DISCORD}
                                   target={'_blank'} rel={'noopener noreferrer'} aria-label={'Discord'}>
                                    {i18n.discordServer}
                                </a>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row className='pb-2 pb-md-4'>
                    <Col>
                        <Card border="primary">
                            <Card.Header>
                                <img src={'/assets/paypal_black.svg'} className={'lt-about-header-icon'}
                                     alt={'Paypal Icon'}/>
                            </Card.Header>
                            <Card.Body>
                                <Card.Title>{i18n.donate}</Card.Title>
                                <Card.Text>
                                    {i18n.aboutDonateDescription}
                                </Card.Text>
                                <a className={'btn btn-outline-primary'} href={LINKS.PAYPAL}
                                   target={'_blank'} rel={'noopener noreferrer'} aria-label={'Paypal'}>
                                    PayPal
                                </a>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col/>
                </Row>
            </Container>
        </>
    );
};