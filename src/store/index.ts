import { configureStore } from '@reduxjs/toolkit'
import { sessionReducer as session } from './reducers/session'
export const store = configureStore({
    reducer: { session },
})
