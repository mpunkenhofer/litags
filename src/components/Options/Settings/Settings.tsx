import * as React from "react";
import {useSetDocumentTitle} from "../../../hooks/setDocumentTitle";
import {i18n} from "../../../constants/i18n";
import {Container, Row, Col, Form} from "react-bootstrap";
import {FormEvent, useCallback} from "react";
import {ChangeEvent} from "react";
import {useEffect} from "react";
import {getOptions, setTagListLimit, setFrequentlyUsedLimit, setOptions, setShowFrequentlyUsed, setShowSearchField} from "../../../slices/options";
import {useDispatch, useSelector} from "react-redux";
import {throttle} from "lodash";
import {RootState} from "../../../common/rootReducer";

export const Settings: React.FunctionComponent = () => {
    const dispatch = useDispatch();
    const {options} = useSelector((state: RootState) => state.options);

    const persistOptions = throttle(() => dispatch(setOptions()), 2000, {trailing: true});

    useEffect(() => {
        dispatch(getOptions());
    }, [dispatch]);

    useSetDocumentTitle(i18n.settings, 'Litags');

    const onChangeTagListLimit = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
        if (event && event.target && event.target.value !== undefined) {
            dispatch(setTagListLimit(Number(event.target.value)));
            persistOptions();
        }
    }, [dispatch, persistOptions]);

    const onChangeFrequentlyUsedLimit = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
        if (event && event.target && event.target.value !== undefined) {
            dispatch(setFrequentlyUsedLimit(Number(event.target.value)));
            persistOptions();
        }
    }, [dispatch, persistOptions]);

    const onCheckChange = useCallback((action) => (ev: FormEvent<HTMLInputElement>): void => {
        dispatch(action((ev.target as HTMLInputElement).checked));
        persistOptions();
    }, [dispatch, persistOptions]);
    
    return (
        <>
            <h1 className={'h2 py-2'}>{i18n.settings}</h1>

            <Container fluid={true}>
                <Row>
                    <Col>
                        <h2 className='h5'>Frequently Used</h2>
                        <p>Some text here.</p>
                    </Col>
                    <Col>
                        <Form>
                                <Form.Check
                                    checked={options.showFrequentlyUsed}
                                    type="switch"
                                    id="lt-show-frequentlyUsed"
                                    onChange={onCheckChange(setShowFrequentlyUsed)}
                                />
                        </Form>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h2 className='h5'>Search Field</h2>
                        <p>Some more here.</p>
                    </Col>
                    <Col>
                        <Form>
                                <Form.Check
                                    checked={options.showSearchField}
                                    type="switch"
                                    id="lt-show-searchField"
                                    onChange={onCheckChange(setShowSearchField)}
                                />
                        </Form>
                    </Col>
                </Row>
                <section className='bg-light border my-2 my-md-3 px-2 px-md-3 pt-2 pt-md-3 pb-2 pb-md-4'>
                    <h2 className='h4'>{i18n.settingsTagListLimitTitle} {options.tagListLimit}</h2>
                    <p>{i18n.settingsTagListLimitDescription}</p>
                    <Container fluid={true}>
                        <Row className='text-center'>
                            <Col xs={2}>
                                <strong className=''>1</strong>
                            </Col>
                            <Col>
                                {
                                    <input type="range" className="custom-range" min="1" max="10"
                                        value={options.tagListLimit} onChange={onChangeTagListLimit}/>
                                }
                            </Col>
                            <Col xs={2}><strong className=''>10</strong></Col>
                        </Row>
                    </Container>
                </section>
                <section className='bg-light border my-2 my-md-3 px-2 px-md-3 pt-2 pt-md-3 pb-2 pb-md-4'>
                    <h2 className='h4'>{i18n.settingsFrequentlyUsedLimitTitle} {options.frequentlyUsedLimit}</h2>
                    <p>{i18n.settingsFrequentlyUsedLimitDescription}</p>
                    <Container fluid={true}>
                        <Row className='text-center'>
                            <Col xs={2}>
                                <strong className=''>1</strong>
                            </Col>
                            <Col>
                                {
                                    <input type="range" className="custom-range" min="1" max="20"
                                        value={options.frequentlyUsedLimit} onChange={onChangeFrequentlyUsedLimit}/>
                                }
                            </Col>
                            <Col xs={2}><strong className=''>20</strong></Col>
                        </Row>
                    </Container>
                </section>
            </Container>
        </>
    );
};
