import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Layout from '../../components/Layout/Layout';
import { customerListSelector } from '../../store/selectors/customers';
import { invoiceStateSelector } from '../../store/selectors/invoices';
import {
    clearInvoicesByUser,
    getInvoiceList,
    getInvoicesByUser,
} from '../../store/actions/invoices';
import { CustomersActions } from '../../store/actions/customers';
import {
    Button,
    CircularProgress,
    Divider,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    MenuItem,
    Select,
    Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Visibility as VisibilityIcon } from '@mui/icons-material';

function Invoices() {
    const [idSelected, setIdSelected] = useState('');

    const state = useSelector(invoiceStateSelector);
    const customerList = useSelector(customerListSelector);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (event: any) => {
        setIdSelected(event.target.value);
    };

    const onSearchByUser = async () => {
        console.log('click');
        dispatch(getInvoicesByUser(idSelected));
    };

    const onClearFilter = () => {
        setIdSelected('');
        dispatch(clearInvoicesByUser());
    };

    const onDetail = (data: any) => {
        navigate(`/invoices/${data.id}`);
    };

    const fetchInvoices = () => {
        dispatch(getInvoiceList());
    };

    useEffect(() => {
        if (!customerList) {
            dispatch(CustomersActions.getCustomers());
        }
        fetchInvoices();
    }, []);

    const renderListCustomers = () => {
        return state.list.data.map((data: any, i: any) => (
            <ListItem key={i}>
                <ListItemText primary={data.descripcion} />
                <ListItemSecondaryAction>
                    <IconButton
                        edge="end"
                        aria-label="edit"
                        onClick={() => onDetail(data)}
                    >
                        <VisibilityIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        ));
    };

    const renderListCustomersByUser = () => {
        if (state.filterList.data.length === 0) {
            return <div>There are no invoices for this Customer</div>;
        }
        return state.filterList.data.map((data: any, i: any) => (
            <ListItem key={i}>
                <ListItemText primary={data.descripcion} />
                <ListItemSecondaryAction>
                    <IconButton
                        edge="end"
                        aria-label="edit"
                        onClick={() => onDetail(data)}
                    >
                        <VisibilityIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        ));
    };

    return (
        <Layout>
            <Grid item xs={12} md={12}>
                <Typography variant="h4" gutterBottom>
                    Invoice List
                </Typography>
                <div>
                    <Grid container spacing={4}>
                        <Grid item xs={6}>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                style={{ width: '100%' }}
                                value={idSelected}
                                onChange={handleChange}
                            >
                                {customerList &&
                                    customerList.map((customer, i) => (
                                        <MenuItem key={i} value={customer.id}>
                                            {customer.nombres} {customer.apellidos}
                                        </MenuItem>
                                    ))}
                            </Select>
                        </Grid>
                        <Grid item>
                            <Button
                                onClick={onSearchByUser}
                                variant="contained"
                                color="primary"
                            >
                                Search
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button onClick={onClearFilter} variant="contained">
                                Clean
                            </Button>
                        </Grid>
                    </Grid>
                </div>
                <br />
                <br />
                <Divider />
                <br />
                <br />
                <div>
                    <List dense={false}>
                        {(state.list.loading || state.filterList.loading) && (
                            <CircularProgress color="inherit" />
                        )}
                        {state.list.data &&
                            state.filterList.data === null &&
                            renderListCustomers()}
                        {state.filterList.data !== null &&
                            renderListCustomersByUser()}
                    </List>
                </div>
            </Grid>
        </Layout>
    );
}

export default Invoices;
