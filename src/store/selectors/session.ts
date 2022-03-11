import { SessionState } from '../reducers/session'
import { createSelector } from '@reduxjs/toolkit'

export const sessionStateSelector = (state: any): SessionState => state.session

export const userNameStateSelector = createSelector(
    sessionStateSelector,
    (sessionState) => sessionState.userName
)
