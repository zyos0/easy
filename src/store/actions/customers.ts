import { createAction, Dispatch } from '@reduxjs/toolkit';
import httpClient from '../../services/httpClient';
import { customersUrl } from '../../constants/servicesUrls';
import {Customer} from "../../types/Customer";

export enum CustomerActionType {
    GET_CUSTOMER_LIST_ON_SUCCESS = 'GET_CUSTOMER_LIST_ON_SUCCESS',
    GET_CUSTOMER_LIST_ON_ERROR = 'GET_CUSTOMER_LIST_ON_ERROR',
    TOGGLE_GET_CUSTOMER_LIST_LOADING_STATE = 'TOGGLE_GET_CUSTOMER_LIST_LOADING_STATE',

    UPDATE_CUSTOMER_ON_SUCCESS = 'UPDATE_CUSTOMER_ON_SUCCESS',
    UPDATE_CUSTOMER_ON_ERROR = 'UPDATE_CUSTOMER_ON_ERROR',
    TOGGLE_UPDATE_CUSTOMER_LOADING_STATE = 'TOGGLE_UPDATE_CUSTOMER_LOADING_STATE',

    CREATE_CUSTOMER_ON_SUCCESS = 'CREATE_CUSTOMER_ON_SUCCESS',
    CREATE_CUSTOMER_ON_ERROR = 'CREATE_CUSTOMER_ON_ERROR',
    TOGGLE_CREATE_CUSTOMER_LOADING_STATE = 'TOGGLE_CREATE_CUSTOMER_LOADING_STATE',

    DELETE_CUSTOMER_ON_SUCCESS = 'DELETE_CUSTOMER_ON_SUCCESS',
    DELETE_CUSTOMER_ON_ERROR = 'DELETE_CUSTOMER_ON_ERROR',
    TOGGLE_DELETE_CUSTOMER_LOADING_STATE = 'TOGGLE_DELETE_CUSTOMER_LOADING_STATE',

    RESET_CUSTOMER_STATE = 'RESET_CUSTOMER_STATE',
}

const onUpdateCustomerSuccess = createAction<Customer>(
    CustomerActionType.UPDATE_CUSTOMER_ON_SUCCESS
);

const onUpdateCustomerError = createAction<Error>(
    CustomerActionType.UPDATE_CUSTOMER_ON_ERROR
);

const toggleUpdateCustomerLoadingState = createAction<boolean>(
    CustomerActionType.TOGGLE_UPDATE_CUSTOMER_LOADING_STATE
);

const onCreateCustomerSuccess = createAction<Customer>(
    CustomerActionType.CREATE_CUSTOMER_ON_SUCCESS
);

const onCreateCustomerError = createAction<Error>(
    CustomerActionType.CREATE_CUSTOMER_ON_ERROR
);

const toggleCreateCustomerLoadingState = createAction<boolean>(
    CustomerActionType.TOGGLE_CREATE_CUSTOMER_LOADING_STATE
);

const onDeleteCustomerSuccess = createAction<number | string>(
    CustomerActionType.DELETE_CUSTOMER_ON_SUCCESS
);

const onDeleteCustomerError = createAction<Error>(
    CustomerActionType.DELETE_CUSTOMER_ON_ERROR
);

const toggleDeleteCustomerLoadingState = createAction<boolean>(
    CustomerActionType.TOGGLE_DELETE_CUSTOMER_LOADING_STATE
);

const onGetCustomerListSuccess = createAction<Customer[]>(
    CustomerActionType.GET_CUSTOMER_LIST_ON_SUCCESS
);

const onGetCustomerListError = createAction<Error>(
    CustomerActionType.GET_CUSTOMER_LIST_ON_ERROR
);

const toggleGetCustomerListLoadingState = createAction<boolean>(
    CustomerActionType.TOGGLE_GET_CUSTOMER_LIST_LOADING_STATE
);

const resetCustomerState = createAction<undefined>(
    CustomerActionType.RESET_CUSTOMER_STATE
);

const getCustomers = () => async (dispatch: Dispatch) => {
    dispatch(toggleGetCustomerListLoadingState(true));
    try {
        const { data: plateList } = await httpClient.get(customersUrl);
        dispatch(onGetCustomerListSuccess(plateList));
    } catch (error) {
        dispatch(onGetCustomerListError(error as Error));
    }
    dispatch(toggleGetCustomerListLoadingState(false));
};

const createCustomer = (plate: Partial<Customer>) => async (dispatch: Dispatch) => {
    dispatch(toggleCreateCustomerLoadingState(true));
    try {
        const { data: response } = await httpClient.post(customersUrl, plate);
        dispatch(onCreateCustomerSuccess(response));
    } catch (error) {
        dispatch(onCreateCustomerError(error as Error));
    }
    dispatch(toggleCreateCustomerLoadingState(false));
};

const updateCustomer = (plate: Customer) => async (dispatch: Dispatch) => {
    dispatch(toggleUpdateCustomerLoadingState(true));
    try {
        const { data: response } = await httpClient.put(
            `${customersUrl}/${plate.id}`,
            plate
        );
        dispatch(onUpdateCustomerSuccess(response));
    } catch (error) {
        dispatch(onUpdateCustomerError(error as Error));
    }
    dispatch(toggleUpdateCustomerLoadingState(false));
};

const deleteCustomer = (id: string | number) => async (dispatch: Dispatch) => {
    dispatch(toggleDeleteCustomerLoadingState(true));
    try {
        await httpClient.delete(`${customersUrl}/${id}`);
        dispatch(onDeleteCustomerSuccess(id));
    } catch (error) {
        dispatch(onDeleteCustomerError(error as Error));
    }
    dispatch(toggleDeleteCustomerLoadingState(false));
};

export const CustomersActions = {
    onGetCustomerListSuccess,
    onGetCustomerListError,
    toggleGetCustomerListLoadingState,

    onCreateCustomerSuccess,
    onCreateCustomerError,
    toggleCreateCustomerLoadingState,
    createCustomer,

    onUpdateCustomerSuccess,
    onUpdateCustomerError,
    toggleUpdateCustomerLoadingState,
    updateCustomer,

    onDeleteCustomerSuccess,
    onDeleteCustomerError,
    toggleDeleteCustomerLoadingState,
    deleteCustomer,

    resetCustomerState,
    getCustomers,
};
