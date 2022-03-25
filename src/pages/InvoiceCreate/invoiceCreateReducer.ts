export const InvoiceCreateAction = {
    updateDescription: 'updateDescription',
    updateObservation: 'updateObservation',
    addOrderEntry: 'addOrderEntry',
    removeOrderEntry: 'removeOrderEntry',
    resetState: 'resetState',
    resetOrders: 'resetOrders',
}

interface Action {
    type: String
    payload: any
}

export const invoiceCreateReducer = (state: any, action: Action) => {
    const { type, payload } = action

    switch (type) {
        case InvoiceCreateAction.updateDescription:
            return updateDescription(state, payload)
        case InvoiceCreateAction.updateObservation:
            return updateObservation(state, payload)
        case InvoiceCreateAction.addOrderEntry:
            return addOrderEntry(state, payload)
        case InvoiceCreateAction.removeOrderEntry:
            return removeOrderEntry(state, payload)
        case InvoiceCreateAction.resetState:
            return resetState()
        case InvoiceCreateAction.resetOrders:
            return resetOrders(state)
    }
}

function removeOrderEntry(state, order) {
    const existingEntry = { ...state.orders[order.id] }
    existingEntry.quantity -= 1
    if (existingEntry.quantity === 0) {
        const { [order.id]: toRemove, ...remainingOrders } = state.orders
        return {
            ...state,
            orders: remainingOrders,
        }
    }
    return {
        ...state,
        orders: { ...state.orders, [existingEntry.id]: existingEntry },
    }
}

function addOrderEntry(state, plate) {
    const existingEntry = state.orders[plate.id]
    if (existingEntry) {
        const newEntry = { ...existingEntry }
        newEntry.quantity += 1
        return {
            ...state,
            orders: { ...state.orders, [newEntry.id]: newEntry },
        }
    }

    const newEntry = {
        id: plate.id,
        quantity: 1,
        nombre: plate.nombre,
    }

    return {
        ...state,
        orders: { ...state.orders, [newEntry.id]: newEntry },
    }
}

function updateDescription(state, description) {
    return {
        ...state,
        description,
    }
}

function updateObservation(state, observation) {
    return {
        ...state,
        observation,
    }
}

function resetState() {
    return getInitialState()
}

function resetOrders(state) {
    return {
        ...state,
        orders: {},
    }
}

export function getInitialState() {
    return { observation: '', description: '', orders: {} }
}

export function fireAction(type, payload = undefined) {
    return { type, payload }
}
