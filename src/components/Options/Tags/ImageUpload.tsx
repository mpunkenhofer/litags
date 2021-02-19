import React, { useCallback, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { i18n } from "../../../constants/i18n";
import axios from "axios";
import { imageUploadTimeout } from "../../../constants";
import * as imgur from '../../../constants/imgur.api.json';
import { browser } from "webextension-polyfill-ts";

const imageUploadApi = axios.create({
    baseURL: 'https://api.imgur.com/3/',
    timeout: imageUploadTimeout
});

interface ImageUploadProps {
    onUploadError: (msg: string) => void;
    onUploadSuccess: (url: string) => void;
}

export const ImageUpload: React.FunctionComponent<ImageUploadProps> = ({ onUploadError, onUploadSuccess }: ImageUploadProps) => {
    const [showUploadSpinner, setShowUploadSpinner] = useState(false);

    const onUploadClicked = useCallback((): void => {
        browser.permissions.request({ origins: ["https://api.imgur.com/3/upload"] })
            .then(granted => {
                if (granted) {
                    const input = document.createElement('input');
                    input.type = "file";
                    input.accept = "image/*";

                    if (input) {
                        input.click();
                        input.onchange = (e: Event): void => {
                            const target = e.target as HTMLInputElement;
                            if (target && target.files && target.files.length > 0) {
                                const fileBlob = target.files[0];
                                const formData = new FormData();
                                formData.append('image', fileBlob);

                                setShowUploadSpinner(true);

                                imageUploadApi.post('/upload', formData, {
                                    headers: {
                                        Authorization: `Client-ID ${imgur.client_id}`,
                                    }
                                })
                                    .then(response => {
                                        if (response && response?.status == 200) {
                                            const link = response?.data?.data?.link
                                            if (link) {
                                                onUploadSuccess(link);
                                                return;
                                            }
                                        }
                                        onUploadError(i18n.uploadImageFailure);
                                    })
                                    .catch(error => {
                                        if (error && error.code) {
                                            onUploadError(i18n.uploadImageTimeout.replace('%d', imageUploadTimeout.toString() + 'ms'));
                                        } else {
                                            onUploadError(i18n.uploadImageFailure);
                                        }
                                    })
                                    .finally((): void => {
                                        setShowUploadSpinner(false);
                                        browser.permissions.remove({ origins: ["https://api.imgur.com/3/upload"] });
                                    });
                            }
                        }
                    } else {
                        onUploadError(i18n.uploadImageFailure);
                        browser.permissions.remove({ origins: ["https://api.imgur.com/3/upload"] });
                    }
                } else {
                    onUploadError(i18n.uploadImageMissingPermisson.replace('%s', 'imgur.com'));
                }
            });
    }, [setShowUploadSpinner, onUploadError, onUploadSuccess]);

    return (
        <Button variant='outline-secondary' onClick={onUploadClicked}>
            {
                showUploadSpinner ?
                    <Spinner className={'lt-btn-icon mr-2'} animation="border" role="status" /> :
                    <img className={'lt-btn-icon mr-2'} src={'/assets/images/file-upload-solid.svg'} alt={'Upload Image Icon'} />
            }
            <span className={'d-none d-sm-inline'}>{i18n.uploadImage}</span>
        </Button>
    );
}

ImageUpload.defaultProps = {
    onUploadError: (msg: string): void => console.error(msg),
}
