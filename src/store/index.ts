import { configureStore } from '@reduxjs/toolkit'
import { sessionReducer as session } from './reducers/session'
import { platesReducer as plates } from './reducers/plates'
export const store = configureStore({
    reducer: { session, plates },
})
