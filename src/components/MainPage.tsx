import Editor from './Editor'
import React, { useReducer } from 'react'
import { Box } from '@mui/material'
import YoutubeList from './YoutubeList'
import { listReducer, youtubeInitialState } from '../store/reducer'

const ListContext = React.createContext(undefined)
const ListProvider = (props: any) => {
    const [state, dispatch] = useReducer(listReducer, youtubeInitialState)
    return <ListContext.Provider value={[state, dispatch]} {...props} />
}

export const useList = ():any => {
    const context = React.useContext(ListContext)
    if (!context) {
        throw new Error('useList must be uses within a ListProvider')
    }
    return context
}

const MainPage = () => {
    const [state, dispatch] = useReducer(listReducer, youtubeInitialState)

    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
                border: '1px solid red',
                margin: '0 auto',
                width: '300px',
                textAlign: 'center',
            }}
            noValidate
            autoComplete="off"
        >
            <ListProvider>
                <Editor />
                <YoutubeList/>
            </ListProvider>
        </Box>
    )
}

export default MainPage
