import {Button, Modal} from "react-bootstrap";
import {i18n} from "../../constants/i18n";
import * as React from "react";

interface ConfirmModalProps {
    show: boolean,
    onCancel: () => void,
    onConfirm: () => void,
    variant: 'warning' | 'danger'
    title?: string,
    body?: string,
    confirm?: string,
    cancel?: string
}

export const ConfirmModal = ({
                                 variant = 'danger',
                                 show,
                                 onCancel,
                                 onConfirm,
                                 title = '',
                                 body = '',
                                 confirm = i18n.confirm,
                                 cancel = i18n.cancel
                             }: ConfirmModalProps) => (
    <Modal show={show} onHide={onCancel}>
        <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {body}
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={onCancel}>
                {cancel}
            </Button>
            <Button variant={variant} onClick={onConfirm}>
                {confirm}
            </Button>
        </Modal.Footer>
    </Modal>
);
