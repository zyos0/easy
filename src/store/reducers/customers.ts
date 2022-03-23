import { createReducer } from '@reduxjs/toolkit';
import { CustomersActions } from '../actions/customers';
import { Customer } from '../../types/Customer';

export interface CustomersState {
    getCustomersListInProgress: boolean;
    customersList: Customer[] | null;
    getCustomersListError: { message: string } | null;

    createCustomerInProgress: boolean;
    createCustomerError: { message: string } | null;

    updateCustomerInProgress: boolean;
    updateCustomerError: { message: string } | null;

    deleteCustomerInProgress: boolean;
    deleteCustomerError: { message: string } | null;
}

const getInitialState = () => {
    return {
        getCustomersListError: null,
        getCustomersListInProgress: false,
        customersList: null,
    };
};

const onGetCustomerListSuccess = (
    state: CustomersState,
    { payload }: ReturnType<typeof CustomersActions.onGetCustomerListSuccess>
) => {
    return {
        ...state,
        customersList: payload,
    };
};

const onGetCustomerListError = (
    state: CustomersState,
    { payload }: ReturnType<typeof CustomersActions.onGetCustomerListError>
) => {
    return {
        ...state,
        getCustomersListError: { message: payload.message },
    };
};

const toggleGetCustomerListLoadingState = (
    state: CustomersState,
    {
        payload,
    }: ReturnType<typeof CustomersActions.toggleGetCustomerListLoadingState>
) => {
    return {
        ...state,
        getCustomersListInProgress: payload,
    };
};

const onCreateCustomerSuccess = (
    state: CustomersState,
    { payload }: ReturnType<typeof CustomersActions.onCreateCustomerSuccess>
) => {
    return {
        ...state,
        customersList: state.customersList?.concat(payload),
    };
};

const onCreateCustomerError = (
    state: CustomersState,
    { payload }: ReturnType<typeof CustomersActions.onCreateCustomerError>
) => {
    return {
        ...state,
        createCustomerError: { message: payload.message },
    };
};

const toggleCreateCustomerLoadingState = (
    state: CustomersState,
    {
        payload,
    }: ReturnType<typeof CustomersActions.toggleCreateCustomerLoadingState>
) => {
    return {
        ...state,
        createCustomerInProgress: payload,
    };
};

const onUpdateCustomerSuccess = (
    state: CustomersState,
    { payload }: ReturnType<typeof CustomersActions.onUpdateCustomerSuccess>
) => {
    return {
        ...state,
        customersList: state.customersList?.map(function replaceCustomer(customerItem) {
            return customerItem.id !== payload.id ? customerItem : payload;
        }),
    };
};

const onUpdateCustomerError = (
    state: CustomersState,
    { payload }: ReturnType<typeof CustomersActions.onUpdateCustomerError>
) => {
    return {
        ...state,
        updateCustomerError: { message: payload.message },
    };
};

const toggleUpdateCustomerLoadingState = (
    state: CustomersState,
    {
        payload,
    }: ReturnType<typeof CustomersActions.toggleUpdateCustomerLoadingState>
) => {
    return {
        ...state,
        updateCustomerInProgress: payload,
    };
};

const onDeleteCustomerSuccess = (
    state: CustomersState,
    { payload }: ReturnType<typeof CustomersActions.onDeleteCustomerSuccess>
) => {
    return {
        ...state,
        customersList: state.customersList?.filter(function removeCustomer(
            customerItem
        ) {
            return customerItem.id !== payload;
        }),
    };
};

const onDeleteCustomerError = (
    state: CustomersState,
    { payload }: ReturnType<typeof CustomersActions.onDeleteCustomerError>
) => {
    return {
        ...state,
        deleteCustomerError: { message: payload.message },
    };
};

const toggleDeleteCustomerLoadingState = (
    state: CustomersState,
    {
        payload,
    }: ReturnType<typeof CustomersActions.toggleDeleteCustomerLoadingState>
) => {
    return {
        ...state,
        deleteCustomerInProgress: payload,
    };
};

const resetCustomerState = () => getInitialState();

const customersReducerBuilder = (builder: any) => {
    builder.addCase(
        CustomersActions.onCreateCustomerSuccess,
        onCreateCustomerSuccess
    );
    builder.addCase(CustomersActions.onCreateCustomerError, onCreateCustomerError);
    builder.addCase(
        CustomersActions.toggleCreateCustomerLoadingState,
        toggleCreateCustomerLoadingState
    );

    builder.addCase(
        CustomersActions.onUpdateCustomerSuccess,
        onUpdateCustomerSuccess
    );
    builder.addCase(CustomersActions.onUpdateCustomerError, onUpdateCustomerError);
    builder.addCase(
        CustomersActions.toggleUpdateCustomerLoadingState,
        toggleUpdateCustomerLoadingState
    );

    builder.addCase(
        CustomersActions.onDeleteCustomerSuccess,
        onDeleteCustomerSuccess
    );
    builder.addCase(CustomersActions.onDeleteCustomerError, onDeleteCustomerError);
    builder.addCase(
        CustomersActions.toggleDeleteCustomerLoadingState,
        toggleDeleteCustomerLoadingState
    );

    builder.addCase(
        CustomersActions.onGetCustomerListSuccess,
        onGetCustomerListSuccess
    );
    builder.addCase(CustomersActions.onGetCustomerListError, onGetCustomerListError);
    builder.addCase(
        CustomersActions.toggleGetCustomerListLoadingState,
        toggleGetCustomerListLoadingState
    );

    builder.addCase(CustomersActions.resetCustomerState, resetCustomerState);
};

export const customersReducer = createReducer(
    getInitialState(),
    customersReducerBuilder
);
