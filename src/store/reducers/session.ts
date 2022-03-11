import { updateUserName } from '../actions/session'
import { createReducer } from '@reduxjs/toolkit'

export interface SessionState {
    userName: string
    password: string
    authenticated: boolean
}

const getInitialState = (): SessionState => {
    return {
        userName: '',
        password: '',
        authenticated: false,
    }
}

const UpdateUserNameExecutor = (
    state: SessionState,
    { payload }: ReturnType<typeof updateUserName>
) => {
    // return {
    //     ...state,
    //     userName: payload,
    // }

    state.userName = payload
}

// export const sessionReducer = (
//     state = getInitialState(),
//     action: SessionAction
// ) => {
//     const { type } = action
//     switch (type) {
//         case SessionActionType.UPDATE_USERNAME:
//             return UpdateUserNameExecutor(state, action)
//         default:
//             return state
//     }
// }

const sessionReducerBuilder = (builder: any) => {
    builder.addCase(updateUserName, UpdateUserNameExecutor)
}

export const sessionReducer = createReducer(
    getInitialState(),
    sessionReducerBuilder
)
