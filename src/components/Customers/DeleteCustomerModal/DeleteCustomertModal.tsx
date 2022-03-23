import Modal from '../../Modal/Modal';
import { Customer } from '../../../types/Customer';
import { useDispatch, useSelector } from 'react-redux';
import { CustomersActions } from '../../../store/actions/customers';
import { Delete } from '@mui/icons-material';
import { deleteCustomerInProgress } from '../../../store/selectors/customers';
import { useEffect, useState } from 'react';

interface DeleteCustomerModalProps {
    customer: Customer;
    open: boolean;
    onClose: () => void;
}

const DeleteCustomertModal: React.FC<DeleteCustomerModalProps> = ({
    open,
    customer,
    onClose,
}) => {
    const dispatch = useDispatch();
    const [commited, setCommited] = useState(false);
    const deleteInProgress = useSelector(deleteCustomerInProgress);

    useEffect(() => {
        if (!commited) return;

        if (!deleteInProgress) {
            onClose();
            setCommited(false);
        }
    }, [commited, deleteInProgress, onClose]);
    const dismiss = () => {
        onClose();
    };

    const handleOnClose = () => {
        dismiss();
    };
    const handleOnConfirm = () => {
        dispatch(CustomersActions.deleteCustomer(customer.id));
        setCommited(true);
    };
    return (
        <Modal
            onClose={handleOnClose}
            isOpen={open}
            title="Delete customer"
            onConfirm={handleOnConfirm}
            updateInProgress={deleteInProgress}
            confirmLabel="Delete"
            confirmIcon={<Delete />}
        >
            <span>
                Are you sure you want to delete{' '}
                {`${customer?.nombres} ${customer?.apellidos}`}?
            </span>
        </Modal>
    );
};

export default DeleteCustomertModal;
