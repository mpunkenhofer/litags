import * as React from "react";
import { useSetDocumentTitle } from "../../../../hooks/setDocumentTitle";
import { i18n } from "../../../../constants/i18n";
import { useEffect, useCallback } from "react";
import { getSets, addSet, setSets } from "../../../../slices/sets";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../common/rootReducer";
import { Container, Col, Row, Spinner } from "react-bootstrap";
import { SetList } from "./SetList";
import { SetView } from "./SetView";
import { HashRouter, Redirect, Route, Switch, useHistory } from "react-router-dom";
import { exportSet, importSet } from "../../../../common/backup";
import { generateID } from "../../../../common/id";

export const Sets: React.FunctionComponent = () => {
    const dispatch = useDispatch();
    const { sets, loading } = useSelector((state: RootState) => state.sets);

    useEffect(() => {
        dispatch(getSets());
    }, [dispatch]);

    useSetDocumentTitle(i18n.tagSets, 'Litags');

    const history = useHistory();

    const onExport = useCallback(() => {
        const setId = history.location.pathname.substring(history.location.pathname.lastIndexOf('/') + 1);
        exportSet(setId)
            .then(data => {
                const a = document.createElement('a');
                a.download = `litags-set-${setId}`;
                a.href = URL.createObjectURL(new Blob([data], { type: 'application/json' }));
                a.onload = (): void => URL.revokeObjectURL(a.href);
                a.click();
            })
            .catch(err => {
                // setAlertMessage(err.toString());
                // setShowAlert(true);
                console.error(err);
            });
    }, [history]);

    const onImport = useCallback(() => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.click();
        input.onchange = (e: Event): void => {
            try {
                const target = e.target as HTMLInputElement;
                if (target && target.files && target.files.length > 0) {
                    const fileName = target.files[0].name;
                    const fileBlob = target.files[0];

                    if (fileBlob && fileName.endsWith('.json')) {
                        const reader = new FileReader();
                        reader.onload = (e): void => {
                            if (e && e.target) {
                                const contents = e.target.result;
                                const importedSet = importSet(contents as string);
                                
                                // Generate new id for imported set
                                importedSet.id = generateID();
                                
                                // TODO: redirect to new set
                                dispatch(addSet(importedSet.name, importedSet.iconUrl, importedSet.font, importedSet.tags));
                                dispatch(setSets());
                            }
                        };
                        reader.readAsText(fileBlob);
                    } else {
                        //displayAlert(i18n.importJsonFileError);
                        return;
                    }
                }
            } catch (err) {
                console.error(err);
            }
        }
    }, [dispatch]);

    if (loading) {
        return (
            <div className='d-flex justify-content-center py-2 py-md-4'>
                <Spinner animation="border" variant="primary" />
            </div>
        );
    } else if (sets) {
        return (
            <>
                <Container className='' fluid={true}>
                    <HashRouter hashType={'noslash'} basename={'tags/sets'}>
                        <Row className='flex-column flex-lg-row'>
                            <Col md='auto' xl={2} className=''>
                                <Row className='flex-column'>
                                    <SetList sets={sets} />
                                </Row>
                                <Row className='flex-row flex-nowrap border-top p-1 mt-2 mt-md-3 pt-md-2'>
                                    <button className={'lt-sets-import-export-btn'} onClick={onImport}>
                                        <img src={'/assets/images/file-import-solid.svg'} className='mr-2'
                                            alt={'Import Set Icon'} />
                                        <small>{i18n.importSet}</small>
                                    </button>
                                    {
                                        (sets && sets.length > 0) &&
                                        <button className={'lt-sets-import-export-btn'} onClick={onExport}>
                                            <img src={'/assets/images/file-export-solid.svg'} className='mr-2'
                                                alt={'Export Set Icon'} />
                                            <small>{i18n.exportSet}</small>
                                        </button>
                                    }
                                </Row>
                            </Col>
                            <Col md='auto' xl={8}>
                                <Switch>
                                    {
                                        sets.map(set => (
                                            <Route key={set.id} path={`/${set.id}`}>
                                                <SetView set={set} />
                                            </Route>
                                        ))
                                    }
                                    {
                                        (sets.length > 0) &&
                                        <Route path="/">
                                            <Redirect to={`/${sets[0].id}`} />
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
