import { createAction } from '@reduxjs/toolkit'

export enum SessionActionType {
    SET_USER_AUTH = 'SET_USER_AUTH',
    UPDATE_PASSWORD = 'UPDATE_PASSWORD',
    UPDATE_USERNAME = 'UPDATE_USERNAME',
}

// export interface SessionAction {
//     type: SessionActionType
//     payload?: any
// }
//
// export const updateUserName = (userName: string): SessionAction => {
//     return {
//         type: SessionActionType.UPDATE_USERNAME,
//         payload: { userName },
//     }
// }

export const updateUserName = createAction<string>(SessionActionType.UPDATE_USERNAME)
