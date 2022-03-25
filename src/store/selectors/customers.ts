import { CustomersState } from '../reducers/customers'
import { createSelector } from '@reduxjs/toolkit'
import { MapToList } from '../../utils/transformations'
import { Customer } from '../../types/Customer'

export const customersStateSelector = (state: any): CustomersState =>
    state.customers

export const customerListSelector = createSelector(
    customersStateSelector,
    (customerState) => {
        return customerState.customersList
    }
)

export const customersMapSelector = createSelector(
    customerListSelector,
    (customerList) => MapToList<Customer>(customerList)
)

export const getCustomersListInProgressSelector = createSelector(
    customersStateSelector,
    (customerState) => {
        return customerState.getCustomersListInProgress
    }
)

export const getCustomersListErrorSelector = createSelector(
    customersStateSelector,
    (customerState) => {
        return customerState.getCustomersListError
    }
)

export const updateCustomerInProgressSelector = createSelector(
    customersStateSelector,
    (customerState) => {
        return customerState.updateCustomerInProgress
    }
)

export const updateCustomerErrorSelector = createSelector(
    customersStateSelector,
    (customerState) => {
        return customerState.updateCustomerError
    }
)

export const deleteCustomerInProgress = createSelector(
    customersStateSelector,
    (customerState) => {
        return customerState.deleteCustomerInProgress
    }
)

export const createCustomerInProgressSelector = createSelector(
    customersStateSelector,
    (customerState) => {
        return customerState.createCustomerInProgress
    }
)

export const createCustomerErrorSelector = createSelector(
    customersStateSelector,
    (customerState) => {
        return customerState.createCustomerError
    }
)

export const deleteCustomerError = createSelector(
    customersStateSelector,
    (customerState) => {
        return customerState.deleteCustomerError
    }
)
