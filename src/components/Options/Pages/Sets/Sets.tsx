import * as React from "react";
import {useSetDocumentTitle} from "../../../../hooks/setDocumentTitle";
import {i18n} from "../../../../constants/i18n";
import {useEffect, useState} from "react";
import {getSets} from "../../../../slices/sets";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../app/rootReducer";
import {Container, Col, Row, Spinner} from "react-bootstrap";
import {SetList} from "./SetList";
import {HashRouter, NavLink, Redirect, Route, Switch} from "react-router-dom";
import {SetDisplay} from "./SetDisplay";

export const Sets = () => {
    const dispatch = useDispatch();
    const {sets, loading, error} = useSelector((state: RootState) => state.sets);

    useEffect(() => {
        dispatch(getSets());
    }, [dispatch]);

    useSetDocumentTitle(i18n.tagSets, 'Litags');

    if (loading) {
        return (
            <div className='d-flex justify-content-center py-2 py-md-4'>
                <Spinner animation="border" variant="primary"/>
            </div>
        );
    } else if (sets) {
        return (
            <>
                <Container className=''>
                    <HashRouter hashType={'noslash'} basename={'sets'}>
                        <Row className='flex-lg-nowrap'>
                            <Col md={3} xl={2} className=''>
                                <SetList sets={sets}/>
                            </Col>
                            <Col md={9} xl={10}>
                                <Switch>
                                    {
                                        sets.map(set => (
                                            <Route key={set.id} path={`/${set.name}`}>
                                                <SetDisplay set={set}/>
                                            </Route>
                                        ))
                                    }
                                    {
                                        (sets.length > 0) &&
                                        <Route path="/">
                                            <Redirect to={`/${sets[0].name}`}/>
                                        </Route>
                                    }
                                </Switch>
                            </Col>
                        </Row>
                    </HashRouter>
                </Container>
            </>
        );
    } else {
        return null;
    }
};
