import * as React from "react";
import {useSetDocumentTitle} from "../../../../common/hooks/setDocumentTitle";
import {i18n} from "../../../../constants/i18n";
import {useEffect} from "react";
import {getSets} from "../../../../common/slices/sets";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../common/rootReducer";
import {Container, Col, Row, Spinner} from "react-bootstrap";
import {SetList} from "./SetList";
import {SetView} from "./SetView";
import {HashRouter, Redirect, Route, Switch} from "react-router-dom";

export const Sets: React.FunctionComponent = () => {
    const dispatch = useDispatch();
    const {sets, loading} = useSelector((state: RootState) => state.sets);

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
                <Container className='' fluid={true}>
                    <HashRouter hashType={'noslash'} basename={'tags/sets'}>
                        <Row className='flex-column flex-lg-row'>
                            <Col md='auto' xl={2} className=''>
                                <SetList sets={sets}/>
                            </Col>
                            <Col md='auto' xl={8}>
                                <Switch>
                                    {
                                        sets.map(set => (
                                            <Route key={set.id} path={`/${set.id}`}>
                                                <SetView set={set}/>
                                            </Route>
                                        ))
                                    }
                                    {
                                        (sets.length > 0) &&
                                        <Route path="/">
                                            <Redirect to={`/${sets[0].id}`}/>
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
