import * as React from "react";
import {useSetDocumentTitle} from "../../../hooks/setDocumentTitle";
import {i18n} from "../../../constants/i18n";
import {Container, Row, Col, Button, Form, Alert, Fade} from "react-bootstrap";
import {FormEvent, useCallback, useState} from "react";
import {exportBackup, importBackup} from "../../../util/backup";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {
    getOptions,
    setExportUsers,
    setExportSets,
    setExportFrequentlyUsed,
    setExportSettings,
    setImportUsers,
    setImportSets,
    setImportFrequentlyUsed,
    setImportSettings, postOptions
} from "../../../slices/options";
import {RootState} from "../../../app/rootReducer";
import {throttle, delay} from 'lodash';

export const Backup = () => {
    const dispatch = useDispatch();
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertVariant, setAlertVariant] = useState<'danger' | 'success'>('danger');
    const [fileName, setFileName] = useState(i18n.chooseFile);
    const [fileBlob, setFileBlob] = useState(null);
    const {options} = useSelector((state: RootState) => state.options);

    useEffect(() => {
        dispatch(getOptions());
    }, []);

    useSetDocumentTitle(i18n.backup, 'Litags');

    const displayAlert = useCallback((message: string, variant: 'danger' | 'success' = 'danger') => {
        setAlertMessage(message);
        setAlertVariant(variant);
        setShowAlert(true);
        delay(() => setShowAlert(false), 10000);
    }, []);

    const onImport = useCallback(() => {
        const allFalse = !options.import.settings && !options.import.users && !options.import.frequentlyUsedTags
            && !options.import.sets;
        if (allFalse) {
            displayAlert(i18n.importNoneSelectedError);
            return;
        } else {
            setShowAlert(false);
        }

        if (fileBlob && fileName.endsWith('.json')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const contents = e.target.result;
                importBackup(options, contents as string)
                    .then(() => displayAlert(i18n.importSuccess, 'success'))
                    .catch(err => {
                        displayAlert(err.toString());
                        console.error(err);
                    });
            };
            reader.readAsText(fileBlob);
        } else {
            displayAlert(i18n.importJsonFileError);
            return;
        }
    }, [options, fileName, fileBlob]);

    const onImportChange = (e: FormEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        if (target && target.files && target.files.length > 0) {
            setFileName(target.files[0].name);
            setFileBlob(target.files[0]);
        } else {
            setFileName(i18n.chooseFile);
        }
    };

    const onExport = useCallback(() => {
        const allFalse = !options.export.settings && !options.export.users && !options.export.frequentlyUsedTags
            && !options.export.sets;
        if (allFalse) {
            setAlertMessage(i18n.exportNoneSelectedError);
            setShowAlert(true);
            return;
        } else {
            setShowAlert(false);
        }

        exportBackup(options)
            .then(backup => {
                const a = document.createElement('a');
                a.download = `litags-backup-${new Date().getTime()}`;
                a.href = URL.createObjectURL(new Blob([backup], {type: 'application/json'}));
                a.onload = _ => URL.revokeObjectURL(a.href);
                a.click();
            })
            .catch(err => {
                setAlertMessage(err.toString());
                setShowAlert(true);
                console.error(err);
            });
    }, [options]);

    const persistOptions = throttle(() => dispatch(postOptions()), 1000, {trailing: true});

    const onCheckChange = useCallback((action) => (ev: FormEvent<HTMLInputElement>) => {
        dispatch(action((ev.target as HTMLInputElement).checked));
        persistOptions();
    }, [dispatch]);

    return (
        <>
            {
                (showAlert && alertMessage && alertMessage.length > 0) &&
                <Alert variant={alertVariant} dismissible onClose={() => setShowAlert(false)}>
                    {alertMessage}
                </Alert>
            }
            <h1 className={'h2'}>{i18n.backup}</h1>
            <Container fluid={true}>
                <Row className='py-2 py-md-4'>
                    <Col className='bg-light border py-2 py-md-3 px-2 px-md-3 mr-0 mr-md-2 mr-lg-4'>
                        <h2 className={'h4'}>{i18n.export}</h2>
                        <div className={'d-flex'}>
                            <Form className='py-3'>
                                <Form.Check
                                    checked={options.export.users}
                                    type="switch"
                                    id="lt-export-users"
                                    label={i18n.users}
                                    onChange={onCheckChange(setExportUsers)}
                                />
                                <Form.Check
                                    checked={options.export.sets}
                                    type="switch"
                                    id="lt-export-sets"
                                    label={i18n.sets}
                                    onChange={onCheckChange(setExportSets)}
                                />
                                <Form.Check
                                    checked={options.export.frequentlyUsedTags}
                                    type="switch"
                                    id="lt-export-freqUsed"
                                    label={i18n.frequentlyUsedTags}
                                    onChange={onCheckChange(setExportFrequentlyUsed)}
                                />
                                <Form.Check
                                    checked={options.export.settings}
                                    type="switch"
                                    id="lt-export-settings"
                                    label={i18n.settings}
                                    onChange={onCheckChange(setExportSettings)}
                                />
                            </Form>
                            <div className='d-none d-lg-block ml-auto mr-3'>
                                <img src={'/assets/file-export-solid.svg'} className='d-block'
                                     style={{opacity: '0.2', width: '6rem', height: '6rem'}}
                                     alt={'File Export Icon'}/>
                            </div>
                        </div>
                        <Button variant='outline-primary' className='d-flex ml-auto' onClick={onExport}>
                            {i18n.export}
                        </Button>
                    </Col>
                    <Col className='bg-light border py-2 py-md-3 px-2 px-md-3'>
                        <h2 className={'h4'}>{i18n.import}</h2>
                        <div className={'d-flex'}>
                            <Form className='py-3'>
                                <Form.Check
                                    checked={options.import.users}
                                    type="switch"
                                    id="lt-import-users"
                                    label={i18n.users}
                                    onChange={onCheckChange(setImportUsers)}
                                />
                                <Form.Check
                                    checked={options.import.sets}
                                    type="switch"
                                    id="lt-import-sets"
                                    label={i18n.sets}
                                    onChange={onCheckChange(setImportSets)}
                                />
                                <Form.Check
                                    checked={options.import.frequentlyUsedTags}
                                    type="switch"
                                    id="lt-import-freqUsed"
                                    label={i18n.frequentlyUsedTags}
                                    onChange={onCheckChange(setImportFrequentlyUsed)}
                                />
                                <Form.Check
                                    checked={options.import.settings}
                                    type="switch"
                                    id="lt-import-settings"
                                    label={i18n.settings}
                                    onChange={onCheckChange(setImportSettings)}
                                />
                            </Form>
                            <div className='d-none d-lg-block ml-auto mr-3'>
                                <img src={'/assets/file-import-solid.svg'} className='d-block'
                                     style={{opacity: '0.2', width: '6rem', height: '6rem'}}
                                     alt={'File Export Icon'}/>
                            </div>
                        </div>
                        <div className='input-group'>
                            <div className="custom-file">
                                <input type="file" className="custom-file-input" id="lt-import-input"
                                       accept={'.json'} onChange={onImportChange}/>
                                <label className="custom-file-label" htmlFor="lt-import-input">
                                    {fileName}
                                </label>
                            </div>
                            <div className="input-group-append">
                                <button className="btn btn-outline-primary" type="button" id="lt-import-button"
                                        onClick={onImport}>
                                    {i18n.import}
                                </button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
};
