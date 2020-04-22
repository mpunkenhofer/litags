import * as React from "react";
import { delay } from 'lodash';
import { Alert as BootstrapAlert } from "react-bootstrap";
import { useState } from "react";

interface AlertProps {
    alertMessage: string;
    alertType: 'danger' | 'success';
    visible: boolean;
    setMessage?: (message: string) => void;
    setVisible?: (visible: boolean) => void;
    setVariant?: (variant: 'danger' | 'success') => void;
}

export const Alert: React.FunctionComponent<AlertProps> = ({
    alertMessage = '',
    alertType = 'danger',
    visible = true,
    setMessage,
    setVisible,
    setVariant
}: AlertProps) => {
    const [showModal, setShowModal] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessageState, setAlertMessageState] = useState(alertMessage);
    const [alertVariant, setAlertVariant] = useState<'danger' | 'success'>('danger');

    return (
        (showAlert && alertMessage && alertMessage.length > 0) ?
            (
                <BootstrapAlert variant={alertVariant} dismissible onClose={(): void => setShowAlert(false)}>
                    {alertMessage}
                </BootstrapAlert>
            ) : null
    );
}