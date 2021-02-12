import * as React from "react";
import { useSetDocumentTitle } from "../../../hooks/setDocumentTitle";
import { i18n } from "../../../constants/i18n";
import { useEffect, useCallback, useState } from "react";
import { getSets, addSet, setSets } from "../../../slices/sets";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../common/rootReducer";
import { Container, Col, Row, Spinner, Alert, Button } from "react-bootstrap";
import { SetList } from "./SetList";
import { SetView } from "./SetView";
import { HashRouter, Redirect, Route, Switch, useHistory } from "react-router-dom";
import { exportSet, importSet } from "../../../common/backup";
import { generateID } from "../../../common/id";
import { delay } from "lodash";

export const Sets: React.FunctionComponent = () => {
    const dispatch = useDispatch();
    const { sets, loading } = useSelector((state: RootState) => state.sets);

    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertVariant, setAlertVariant] = useState<'danger' | 'success'>('danger');

    const history = useHistory();

    useEffect(() => {
        dispatch(getSets());
    }, [dispatch]);

    useSetDocumentTitle(i18n.tagSets, 'Litags');

    const displayAlert = useCallback((message: string, variant: 'danger' | 'success' = 'danger') => {
        setAlertMessage(message);
        setAlertVariant(variant);
        setShowAlert(true);
        delay(() => setShowAlert(false), 10000);
    }, []);

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
                displayAlert(i18n.exportSetFailure);
                console.error(err);
            });
    }, [history, displayAlert]);

    const onImport = useCallback(() => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.click();
        input.onchange = (e: Event): void => {
            const target = e.target as HTMLInputElement;
            if (target && target.files && target.files.length > 0) {
                const fileName = target.files[0].name;
                const fileBlob = target.files[0];

                if (fileBlob && fileName.endsWith('.json')) {
                    const reader = new FileReader();
                    reader.onload = (e): void => {
                        if (e && e.target) {
                            const contents = e.target.result;
                            try {
                                const set = importSet(contents as string);
                                const setId = generateID(); // Generate new id for imported set
                                set.id = setId;

                                // TODO: redirect to new set
                                dispatch(addSet(set.name, set.iconUrl, set.font, set.tags));
                                dispatch(setSets());

                                displayAlert(i18n.importSetSuccess.replace('%s', set.name), 'success');
                            } catch (err) {
                                displayAlert(i18n.importSetFailure);
                                console.error(err);
                            }
                        }
                    };
                    reader.readAsText(fileBlob);
                } else {
                    displayAlert(i18n.importJsonFileError);
                    return;
                }
            }
        }
    }, [dispatch, displayAlert]);

    const onAddSetClicked = useCallback((): void => {
        dispatch(addSet(i18n.newSet));
        dispatch(setSets());
    }, [dispatch]);

    if (loading) {
        return (
            <div className='d-flex justify-content-center py-2 py-md-4'>
                <Spinner animation="border" variant="primary" />
            </div>
        );
    }
    else if (sets) {
        return (
            <>
                <Alert variant={alertVariant} dismissible show={showAlert && alertMessage.length > 0} onClose={(): void => setShowAlert(false)}>
                    {alertMessage}
                </Alert>
                <Container className='' fluid={true}>
                    <HashRouter hashType={'noslash'} basename={'tags'}>
                        <Row className='d-flex flex-row border-bottom pb-2 pb-md-3 m-3 m-md-3 my-1'>
                            <Col className={'align-middle'}>
                                <SetList sets={sets} />
                            </Col>
                            <Col className='col-auto'>
                                <Button className={'mr-2 mr-md-4'} variant={'outline-primary'} onClick={onAddSetClicked}>
                                    <img className={'lt-btn-icon mr-2'} src={'/assets/images/plus-square-solid.svg'} alt={'Add new Set Icon'} />
                                    {i18n.addNewSet}
                                </Button>
                                <Button className={'mr-1 mr-md-2'} variant={'outline-secondary'} onClick={onImport}>
                                    <img className={'lt-btn-icon mr-2'} src={'/assets/images/file-import-solid.svg'} alt={'Import Set Icon'} />
                                    {i18n.importSet}
                                </Button>
                                {
                                    (sets && sets.length > 0) &&
                                    <Button variant={'outline-secondary'} onClick={onExport}>
                                        <img className={'lt-btn-icon mr-2'} src={'/assets/images/file-export-solid.svg'} alt={'Export Set Icon'} />
                                        {i18n.exportSet}
                                    </Button>
                                }
                            </Col>
                        </Row>
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
                    </HashRouter>
                </Container>
            </>
        );
    } else {
        return null;
    }
};
