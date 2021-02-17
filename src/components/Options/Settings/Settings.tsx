import * as React from "react";
import { useSetDocumentTitle } from "../../../hooks/setDocumentTitle";
import { i18n } from "../../../constants/i18n";
import { useCallback, useState } from "react";
import { ChangeEvent } from "react";
import { useEffect } from "react";
import { getOptions, setTagListLimit, setFrequentlyUsedLimit, setOptions, setShowSearchField, setShowFrequentlyUsed } from "../../../slices/options";
import { useDispatch, useSelector } from "react-redux";
import { throttle } from "lodash";
import { RootState } from "../../../common/rootReducer";
import { Button, Col, Row } from "react-bootstrap";
import { ConfirmModal } from "../ConfirmModal";
import { clearFrequentlyUsed } from "../../../slices/frequentlyUsed";

interface ShowHideToggleProps {
    show: boolean;
    onChange: () => void;
}

const ShowHideToggle: React.FunctionComponent<ShowHideToggleProps> = ({ show, onChange }: ShowHideToggleProps) => {
    const [toggleState, setToggleState] = useState<boolean>(show);

    const onToggleChange = useCallback(() => {
        setToggleState(!toggleState);
        onChange();
    }, [onChange, toggleState, setToggleState]);

    return (
        <div role={'group'} className={'btn-group btn-group-toggle'}>
            <label className={`btn ${toggleState ? 'btn-primary' : 'btn-secondary'}`}>
                <input name='radio' type='radio' autoComplete='off' checked={show === true}
                    onChange={onToggleChange} />
                {i18n.show}
            </label>
            <label className={`btn ${!toggleState ? 'btn-primary' : 'btn-secondary'}`}>
                <input name='radio' type='radio' autoComplete='off' checked={show === false}
                    onChange={onToggleChange} />
                {i18n.hide}
            </label>
        </div>
    );
}

export const Settings: React.FunctionComponent = () => {
    const dispatch = useDispatch();
    const { options } = useSelector((state: RootState) => state.options);
    const [showClearTagModal, setShowClearTagModal] = useState(false);

    const persistOptions = throttle(() => dispatch(setOptions()), 2000, { trailing: true });

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

    // const onCheckChange = useCallback((action) => (ev: FormEvent<HTMLInputElement>): void => {
    //     dispatch(action((ev.target as HTMLInputElement).checked));
    //     persistOptions();
    // }, [dispatch, persistOptions]);

    const onShowSearchFieldToggle = useCallback(() => {
        dispatch(setShowSearchField(!options.showSearchField));
        persistOptions();
    }, [dispatch, options.showSearchField, persistOptions]);

    const onShowFrequentlyUsedToggle = useCallback(() => {
        dispatch(setShowFrequentlyUsed(!options.showFrequentlyUsed));
        persistOptions();
    }, [dispatch, options.showFrequentlyUsed, persistOptions]);

    const onClearFrequentlyUsedTagsClicked = useCallback(() => {
        dispatch(clearFrequentlyUsed());
    }, [dispatch]);

    return (
        <>
            <h1 className={'h2 py-2'}>{i18n.settings}</h1>

            <div className={'d-flex flex-column bg-light border p-2 p-md-4'}>
                <h2 className={'h4 pb-2 pb-md-4'}>{i18n.display}</h2>

                <div className={'mb-2 mb-md-5'}>
                    <h3 className='h5 pb-1 pb-md-2'>{i18n.seachBar}</h3>
                    <div className='d-flex flex-row'>
                        <div>
                            <p>{i18n.settingsShowSearchBarDescription}</p>
                        </div>
                        <div className={'ml-auto my-auto'}>
                            <ShowHideToggle show={options.showSearchField} onChange={onShowSearchFieldToggle} />
                        </div>
                    </div>
                </div>

                <div className={'mb-2 mb-md-5'}>
                    <h3 className='h5 pb-1 pb-md-2'>{i18n.frequentlyUsedTags}</h3>
                    <div className={'d-flex flex-row my-1 my-md-2'}>
                        <div>
                            <p>{i18n.settingsShowFrequentlyUsedDescription}</p>
                        </div>
                        <div className={'ml-auto my-auto'}>
                            <ShowHideToggle show={options.showFrequentlyUsed} onChange={onShowFrequentlyUsedToggle} />
                        </div>
                    </div>
                    <div className={'my-2 my-md-4'}>
                        <p>{i18n.settingsFrequentlyUsedLimitDescription}</p>

                        <Row className={'text-center pb-1 pb-md-2'}>
                            <Col>
                                <strong className={'text-muted'}>{options.frequentlyUsedLimit}</strong>
                            </Col>
                        </Row>
                        <Row className={'text-center'}>
                            <Col xs={2}>
                                <p className={'text-muted'}>1</p>
                            </Col>
                            <Col>
                                <input type="range" className="custom-range" min="1" max="20" value={options.frequentlyUsedLimit} onChange={onChangeFrequentlyUsedLimit} />
                            </Col>
                            <Col xs={2}>
                                <p className={'text-muted'}>20</p>
                            </Col>
                        </Row>
                    </div>
                    <div className={'d-flex flex-row my-1 my-md-2'}>
                        <div>
                            <p>{i18n.settingsClearFrequentlyUsedTagsDescription}</p>
                        </div>
                        <div className={'ml-auto my-auto'}>
                            <Button variant='outline-danger' className='mr-2 mr-md-3'
                                onClick={(): void => setShowClearTagModal(true)}>
                                {i18n.clearFrequentlyUsedTags}
                            </Button>
                        </div>
                    </div>
                </div>

                <div className={'mb-2 mb-md-5'}>
                    <h3 className='h5 pb-1 pb-md-2'>{i18n.userTagList}</h3>
                    <p>{i18n.settingsTagListLimitDescription}</p>

                    <Row className={'text-center pb-1 pb-md-2'}>
                        <Col>
                            <strong className={'text-muted'}>{options.tagListLimit}</strong>
                        </Col>
                    </Row>
                    <Row className={'text-center'}>
                        <Col xs={2}>
                            <p className={'text-muted'}>1</p>
                        </Col>
                        <Col>
                            <input type="range" className="custom-range" min="1" max="10" value={options.tagListLimit} onChange={onChangeTagListLimit} />
                        </Col>
                        <Col xs={2}>
                            <p className={'text-muted'}>10</p>
                        </Col>
                    </Row>
                </div>
            </div>

            <ConfirmModal show={showClearTagModal} onCancel={(): void => setShowClearTagModal(false)}
                onConfirm={(): void => {
                    setShowClearTagModal(false);
                    onClearFrequentlyUsedTagsClicked();
                }}
                variant='danger' title={i18n.clearFrequentlyUsedTags}
                body={i18n.clearFrequentlyUsedTagsConfirm}
                confirm={i18n.clear} />
        </>
    );
};
