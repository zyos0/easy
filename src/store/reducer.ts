import { Action } from '../types/reducer'

export const listReducer = (state: any, action: Action) => {
    const { type, payload } = action
    switch (type) {
        case 'add': {
            return {
                ...state,
                list: state.list.concat(payload.item),
            }
        }
        case 'edit': {
            return {
                ...state,
                entryToUpdate: undefined,
                list: state.list.map((entry: any) => {
                    return entry.id === payload.item.id ? payload.item : entry
                }),
            }
        }
        case 'start-edit': {
            return {
                ...state,
                entryToUpdate: payload.item,
            }
        }
        case 'delete': {
            return {
                ...state,
                list: state.list.filter(
                    (entry: any) => payload.item.id !== entry.id
                ),
            }
        }
    }
}

export const youtubeInitialState = {
    list: [],
    entryToUpdate: undefined,
}
