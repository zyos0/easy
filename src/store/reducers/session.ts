import { SessionActions } from '../actions/session'
import { createReducer } from '@reduxjs/toolkit'

export interface SessionState {
    authenticated: boolean
    authenticationInProgress: boolean
    userData: any
    authenticationError: { message: string } | null
}

const getInitialState = (): SessionState => {
    return {
        authenticated: false,
        authenticationInProgress: false,
        userData: null,
        authenticationError: null,
    }
}

const onLoginSuccess = (
    state: SessionState,
    { payload }: ReturnType<typeof SessionActions.onLoginSuccess>
) => {
    state.userData = payload
    state.authenticated = true
}

const onLoginError = (
    state: SessionState,
    { payload }: ReturnType<typeof SessionActions.onLoginError>
) => {
    state.authenticationError = { message: payload.message }
}

const toggleLoadingState = (
    state: SessionState,
    { payload }: ReturnType<typeof SessionActions.toggleLoadingState>
) => {
    state.authenticationInProgress = payload
}

const resetSessionState = () => {
    return getInitialState()
}

const sessionReducerBuilder = (builder: any) => {
    builder
        .addCase(SessionActions.onLoginSuccess, onLoginSuccess)
        .addCase(SessionActions.onLoginError, onLoginError)
        .addCase(SessionActions.toggleLoadingState, toggleLoadingState)
        .addCase(SessionActions.resetSessionState, resetSessionState)
}

export const sessionReducer = createReducer(
    getInitialState(),
    sessionReducerBuilder
)
