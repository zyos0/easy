import { useEffect, useReducer, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { customersMapSelector } from '../../store/selectors/customers'
import { platesMapSelector } from '../../store/selectors/plates'

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
import { useCreateInvoice } from '../../hooks/useCreateInvoice'
import { Customer } from '../../types/Customer'
import { Plate } from '../../types/Plate'
import {
    fireAction,
    getInitialState,
    InvoiceCreateAction,
    invoiceCreateReducer,
} from './invoiceCreateReducer'
function InvoiceCreate() {
    const [customer, setCustomer] = useState<Customer>()
    const [plate, setPlate] = useState<Plate>()

    const [state, localDispatch] = useReducer(
        invoiceCreateReducer,
        getInitialState()
    )
    const { description, observation, orders:orderMap} = state

    const orders= Object.values(orderMap) as any

    const customerMap = useSelector(customersMapSelector)
    const customerList = customerMap ? Object.values(customerMap) : null

    const plateMap = useSelector(platesMapSelector)
    const plateList = plateMap ? Object.values(plateMap) : null

    const { updateResult, updateError, createInvoice } = useCreateInvoice()

    useEffect(() => {
        if (updateResult) {
            setCustomer(undefined)
            setPlate(undefined)
            localDispatch(fireAction(InvoiceCreateAction.resetState))
        }
    }, [updateResult])

    useEffect(() => {
        if (updateError) {
            console.log(updateError)
        }
    }, [updateError])

    const dispatch = useDispatch()

    useEffect(() => {
        if (!customerList) dispatch(CustomersActions.getCustomers())
        if (!plateList) dispatch(PlatesActions.getPlates())
    }, [])

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
                id: customer.id,
            },
            items: transformOrders(),
        }

        createInvoice(payload)
    }

    const handleSelectCustomer = (event: any) => {
        const customerId = event.target.value
        const selectedCustomer = customerMap[customerId]
        setCustomer(selectedCustomer)
        localDispatch(fireAction(InvoiceCreateAction.resetOrders))
    }

    const handleSelectPlate = (event: any) => {
        const plateId = event.target.value
        const selectedPlate = plateMap[plateId]
        setPlate(selectedPlate)
    }

    const onChangeDescription = (event: any) => {
        localDispatch(
            fireAction(
                InvoiceCreateAction.updateDescription,
                event.target.value
            )
        )
    }

    const onChangeObservation = (event: any) => {
        localDispatch(
            fireAction(
                InvoiceCreateAction.updateObservation,
                event.target.value
            )
        )
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
                                        localDispatch(
                                            fireAction(
                                                InvoiceCreateAction.removeOrderEntry,
                                                order
                                            )
                                        )
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
                                <MenuItem value={customer.id} key={customer.id}>
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
                            localDispatch(
                                fireAction(
                                    InvoiceCreateAction.addOrderEntry,
                                    plate
                                )
                            )
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
