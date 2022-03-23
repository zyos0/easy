import { configureStore } from '@reduxjs/toolkit'
import { sessionReducer as session } from './reducers/session'
import { platesReducer as plates } from './reducers/plates'
import { customersReducer as customers } from './reducers/customers'
export const store = configureStore({
    reducer: { session, plates, customers },
})
