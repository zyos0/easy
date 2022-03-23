import React, { useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import { Customer } from '../../../types/Customer';
import Modal from '../../Modal';
import { CustomersActions } from '../../../store/actions/customers';
import { useDispatch, useSelector } from 'react-redux';
import SaveIcon from '@mui/icons-material/Save';

import {
    createCustomerInProgressSelector,
    updateCustomerInProgressSelector,
} from '../../../store/selectors/customers';

export interface UpdateModalProps {
    customer?: Customer;
    open: boolean;
    onClose: () => void;
}

const UpdateCustomerModal: React.FC<UpdateModalProps> = ({
    open,
    onClose,
    customer,
}) => {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [dirty, setDirty] = useState(false);
    const customerUpdateInProgress = useSelector(updateCustomerInProgressSelector);
    const customerCreateInProgress = useSelector(createCustomerInProgressSelector);
    const create = !customer;
    const confirmLabel = create ? 'Create' : 'Update';
    const title = `${confirmLabel} customer`;
    const dispatch = useDispatch();

    useEffect(() => {
        if (!dirty) return;

        if (!(customerUpdateInProgress || customerCreateInProgress)) {
            onClose();
            setName('');
            setLastName('');
            setBirthDate('');
            setDirty(false);
        }
    }, [onClose, dirty, customerUpdateInProgress, customerCreateInProgress]);

    useEffect(() => {
        if (!customer) {
            setName('');
            setLastName('');
            setBirthDate('');
            return;
        }
        setName(customer.nombres);
        setLastName(customer.apellidos);
        setBirthDate(customer.fechaNac);
    }, [customer]);

    const handleOnConfirm = (
        payload: Partial<Customer>,
        currentCustomer: Customer | undefined
    ) => {
        const payloadCandidate = !create
            ? { ...currentCustomer, ...payload }
            : { ...payload};

        const dispatchAction = !create
            ? CustomersActions.updateCustomer
            : CustomersActions.createCustomer;

        dispatch(dispatchAction(payloadCandidate as Customer));
        setDirty(true);
    };

    return (
        <Modal
            title={title}
            isOpen={open}
            onClose={onClose}
            confirmLabel={confirmLabel}
            confirmIcon={<SaveIcon />}
            updateInProgress={customerUpdateInProgress || customerCreateInProgress}
            onConfirm={() => {
                handleOnConfirm(
                    { nombres: name, apellidos: lastName, fechaNac: birthDate },
                    customer
                );
            }}
        >
            <TextField
                type="text"
                label="Customer name"
                margin="dense"
                fullWidth
                autoFocus
                value={name}
                onChange={(evt) => setName(evt.target.value)}
            />
            <br />
            <TextField
                type="text"
                label="Last Name"
                margin="dense"
                fullWidth
                value={lastName}
                onChange={(evt) => setLastName(evt.target.value)}
            />

            <br />
            <TextField
                autoFocus
                margin="dense"
                label="Birthdate"
                type="text"
                fullWidth
                onChange={(e) => setBirthDate(e.target.value)}
                value={birthDate}
            />
        </Modal>
    );
};

export default UpdateCustomerModal;
