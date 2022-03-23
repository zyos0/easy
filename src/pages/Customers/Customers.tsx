import Layout from '../../components/Layout/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { CustomersActions } from '../../store/actions/customers';
import { useEffect, useState } from 'react';
import { Button, Grid } from '@mui/material';

import UpdateCustomerModal from '../../components/Customers/UpdateCustomerModal';
import {
    getCustomersListInProgressSelector,
    customerListSelector,
} from '../../store/selectors/customers';
import CustomList from '../../components/CustomList';
import CustomerListItem from '../../components/Customers/CustomerListItem';
import {Customer} from "../../types/Customer";
import DeleteCustomerModal from '../../components/Customers/DeleteCustomerModal';
import LoadingState from '../../components/LoadingState';
import EmptyState from '../../components/EmptyState';

const Customers = () => {
    const dispatch = useDispatch();
    const customerList = useSelector(customerListSelector);
    const fetchCustomerListInProgress = useSelector(
        getCustomersListInProgressSelector
    );
    const [updateCustomer, setUpdateCustomer] = useState<Customer>();
    const [showCreateDialog, toggleCreateDialog] = useState(false);
    const [showDeleteDialog, toggleDeleteDialog] = useState(false);

    const handleOnUpdate = (item: Customer) => {
        setUpdateCustomer(item);
        toggleCreateDialog(true);
    };

    const handleOnDelete = (item: Customer) => {
        setUpdateCustomer(item);
        toggleDeleteDialog(true);
    };

    const onUpdateModalDismiss = () => {
        toggleCreateDialog(false);
        setUpdateCustomer(undefined);
    };

    const onDeleteModalDismiss = () => {
        toggleDeleteDialog(false);
        setUpdateCustomer(undefined);
    };

    useEffect(() => {
        dispatch(CustomersActions.getCustomers());
    }, [dispatch]);

    return (
        <Layout>
            {fetchCustomerListInProgress && (
                <LoadingState message="Loading customers..." />
            )}

            {!fetchCustomerListInProgress && (
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <h1>Customers</h1>
                        <Button
                            onClick={() => toggleCreateDialog(true)}
                            variant="contained"
                        >
                            Add new customer
                        </Button>
                    </Grid>

                    {customerList && customerList.length ? (
                        <Grid item xs={9}>
                            {customerList && (
                                <CustomList<Customer>
                                    renderAs={CustomerListItem}
                                    collection={customerList}
                                    onDelete={handleOnDelete}
                                    onUpdate={handleOnUpdate}
                                />
                            )}
                        </Grid>
                    ) : (
                        <EmptyState message="No customers Available" />
                    )}
                </Grid>
            )}

            <UpdateCustomerModal
                open={showCreateDialog}
                customer={updateCustomer}
                onClose={onUpdateModalDismiss}
            />

            <DeleteCustomerModal
                open={showDeleteDialog}
                customer={updateCustomer as Customer}
                onClose={onDeleteModalDismiss}
            />
        </Layout>
    );
};

export default Customers;
