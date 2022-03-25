export const InvoiceCreateActions = {
    updateDescription: 'updateDescription',
    updateObservation: 'updateObservation',
    addEntry: 'addEntry',
    removeEntry: 'removeEntry',
    removeOrders: 'removeOrders',
    resetState: 'resetState',
}
export interface Action {
    type: string
    payload?: any
}

export const invoiceCreateReducer = (state: any, action: Action) => {
    const { type, payload } = action
    switch (type) {
        case InvoiceCreateActions.updateDescription:
            return {
                ...state,
                description: payload,
            }

        case InvoiceCreateActions.updateObservation:
            return {
                ...state,
                observation: payload,
            }
        case InvoiceCreateActions.addEntry: {
            const existingOrder = state.orders[payload.id]

            if (existingOrder) {
                return {
                    ...state,
                    orders: {
                        ...state.orders,
                        [payload.id]: {
                            ...existingOrder,
                            quantity: existingOrder.quantity + 1,
                        },
                    },
                }
            }

            return {
                ...state,
                orders: {
                    ...state.orders,
                    [payload.id]: {
                        quantity: 1,
                        nombre: payload.nombre,
                        id:payload.id
                    },
                },
            }
        }

        case InvoiceCreateActions.removeEntry: {
            const existingOrder = { ...state.orders[payload.id] }
            existingOrder.quantity -= 1
            if (existingOrder.quantity === 0) {
                const { [payload.id]: toRemove, ...newOrders } = state.order
                return {
                    ...state,
                    orders: newOrders,
                }
            }

            return {
                ...state,
                orders: {
                    ...state.orders,
                    [existingOrder.id]: existingOrder,
                },
            }
        }

        case InvoiceCreateActions.removeOrders: {
            return {
                ...state,
                orders: {},
            }
        }

        case InvoiceCreateActions.resetState: {
            return getInitialState()
        }
    }
}

export const getInitialState = () => {
    return { observation: '', description: '', orders: {} }
}
