import { SessionState } from '../reducers/session'
import { createSelector } from '@reduxjs/toolkit'

export const sessionStateSelector = (state: any): SessionState => state.session

export const sessionAuthenticatedSelector = createSelector(
    sessionStateSelector,
    (sessionState) => sessionState.authenticated
)

export const sessionAuthenticationInProgressSelector = createSelector(
    sessionStateSelector,
    (sessionState) => sessionState.authenticationInProgress
)

export const sessionAuthenticationError = createSelector(
    sessionStateSelector,
    (sessionState) => sessionState.authenticationError
)
