import { useEffect, useReducer, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    customerListSelector,
    customersMapSelector,
} from '../../store/selectors/customers'
import {
    plateListSelector,
    platesMapSelector,
} from '../../store/selectors/plates'
import Layout from '../../components/Layout/Layout'
import { CustomersActions } from '../../store/actions/customers'
import { PlatesActions } from '../../store/actions/plates'

import {
    Button,
    Grid,
    IconButton,
    MenuItem,
    Paper,
    Select,
    TextField,
} from '@mui/material'
import {
    RemoveCircle as RemoveCircleIcon,
    AddCircle as AddCircleOutlineIcon,
} from '@mui/icons-material'
import { useInvoiceCreate } from '../../hooks/invoiceCreate'
import { Customer } from '../../types/Customer'
import { Plate } from '../../types/Plate'
import {
    getInitialState,
    InvoiceCreateActions,
    invoiceCreateReducer,
} from './InvoiceCreateReducer'
function InvoiceCreate() {
    const [state, localDispatch] = useReducer(
        invoiceCreateReducer,
        getInitialState()
    )
    const { observation, description, orders: orderMap } = state
    const orders = Object.values(orderMap) as any
    const [customer, setCustomer] = useState<Customer>()
    const [plate, setPlate] = useState<Plate>()

    const { updateInProgress, updateResult, updateError, createNewInvoice } =
        useInvoiceCreate()

    const customerList = useSelector(customerListSelector)
    const plateList = useSelector(plateListSelector)
    const platesMap = useSelector(platesMapSelector)
    const customersMap = useSelector(customersMapSelector)

    const dispatch = useDispatch()

    useEffect(() => {
        if (!customerList) dispatch(CustomersActions.getCustomers())
        if (!plateList) dispatch(PlatesActions.getPlates())
    }, [])

    useEffect(() => {
        if (updateError) {
            console.log(updateError)
        }
    }, [updateError])

    useEffect(() => {
        if (updateResult) {
            localDispatch({ type: InvoiceCreateActions.resetState })
        }
    }, [updateResult])

    const onNewInvoice = async () => {
        function transformOrders() {
            return orders.map((p) => {
                return {
                    key: p.id,
                    cantidad: p.quantity,
                    plato: {
                        id: p.id,
                    },
                }
            })
        }

        const payload = {
            descripcion: description,
            observacion: observation,
            cliente: {
                id: customer,
            },
            items: transformOrders(),
        }
        createNewInvoice(payload)
    }

    const handleSelectCustomer = (event: any) => {
        const customerKey = event.target.value
        setCustomer(customersMap[customerKey] as Customer)
        setPlate(undefined)
        localDispatch({ type: InvoiceCreateActions.removeOrders })
    }

    const handleSelectPlate = (event: any) => {
        const platesKey = event.target.value
        setPlate(platesMap[platesKey] as Plate)
    }

    const onChangeDescription = (event: any) => {
        localDispatch({
            type: InvoiceCreateActions.updateDescription,
            payload: event.target.value,
        })
    }

    const onChangeObservation = (event: any) => {
        localDispatch({
            type: InvoiceCreateActions.updateObservation,
            payload: event.target.value,
        })
    }

    const renderOrders = () => {
        return (
            <div className="tablePedidos">
                <div className="tableOrders__head">
                    <div className="tableOrders__head--item">Plate</div>
                    <div className="tableOrders__head--item">Quantity</div>
                    <div className="tableOrders__head--item">action</div>
                </div>
                <div className="tableOrders__body">
                    {orders.map((order) => (
                        <div className="tableOrders__body--row" key={order.id}>
                            <div className="tableOrders__body--col">
                                {order.nombre}
                            </div>
                            <div className="tableOrders__body--col">
                                {order.quantity}
                            </div>
                            <div className="tableOrders__body--col">
                                <IconButton
                                    color="inherit"
                                    onClick={() =>
                                        localDispatch({
                                            type: InvoiceCreateActions.removeEntry,
                                            payload: plate,
                                        })
                                    }
                                >
                                    <RemoveCircleIcon />
                                </IconButton>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <Layout>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <TextField
                        id="description"
                        label="Description"
                        multiline
                        fullWidth
                        rows={1}
                        margin="normal"
                        value={description}
                        onChange={onChangeDescription}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <TextField
                        id="observation"
                        label="Observation"
                        multiline
                        margin="normal"
                        fullWidth
                        rows={1}
                        value={observation}
                        onChange={onChangeObservation}
                    />
                </Grid>
            </Grid>
            <br />
            <br />
            <br />
            <br />

            <Grid container spacing={4}>
                <Grid item xs={4}>
                    <Select
                        id="customer"
                        style={{ width: '100%' }}
                        value={customer}
                        onChange={handleSelectCustomer}
                    >
                        {customerList &&
                            customerList.map((customer) => (
                                <MenuItem
                                    value={customer as any}
                                    key={customer.id}
                                >
                                    {customer.nombres} {customer.apellidos}
                                </MenuItem>
                            ))}
                    </Select>
                </Grid>
                <Grid item xs={4}>
                    <Select
                        id="plate"
                        style={{ width: '100%' }}
                        value={plate}
                        onChange={handleSelectPlate}
                    >
                        {plateList &&
                            plateList.map((plate) => (
                                <MenuItem key={plate.id} value={plate.id}>
                                    {plate.nombre}
                                </MenuItem>
                            ))}
                    </Select>
                </Grid>
                <Grid item xs={4}>
                    <IconButton
                        color="inherit"
                        onClick={() =>
                            localDispatch({
                                type: InvoiceCreateActions.addEntry,
                                payload: plate,
                            })
                        }
                    >
                        <AddCircleOutlineIcon />
                    </IconButton>
                </Grid>
            </Grid>
            <br />
            <br />
            <br />
            <br />
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Paper elevation={3}>
                        <div style={{ padding: '15px' }}>
                            {orders.length === 0 && (
                                <div>
                                    You haven't add any plate to your order yet
                                </div>
                            )}
                            {orders.length > 0 && renderOrders()}
                        </div>
                    </Paper>
                </Grid>
            </Grid>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <br />
                    <br />
                    <Button
                        fullWidth
                        onClick={onNewInvoice}
                        variant="contained"
                        color="primary"
                    >
                        Create Invoice
                    </Button>
                </Grid>
            </Grid>
        </Layout>
    )
}

export default InvoiceCreate
