import {HashRouter} from "react-router-dom";
import * as React from "react";
import {Nav} from "./Nav/Nav";
import {NavOutlet} from "./Nav/NavOutlet";
import {Col, Container, Row} from "react-bootstrap";

export const Main = () => (
    <HashRouter hashType={'noslash'}>
        <Container fluid={true}>
            <Row className='flex-xl-nowrap'>
                <Col md={3} xl={2} className='lt-options-sidebar py-1 py-md-4 bg-light border-right'>
                    <Nav/>
                </Col>
                <Col md={9} xl={10} className='py-1 py-md-4 px-md-5 bg-white'>
                    <NavOutlet/>
                </Col>
            </Row>
        </Container>
    </HashRouter>
);
