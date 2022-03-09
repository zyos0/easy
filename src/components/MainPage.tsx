import Editor from './Editor'
import {useReducer} from 'react'
import {
    Box,
} from '@mui/material'
import YoutubeList from "./YoutubeList";
import {listReducer, youtubeInitialState} from "../store/reducer";

const MainPage = () => {
    const [state, dispatch] = useReducer(listReducer, youtubeInitialState)
    const {list, entryToUpdate} = state

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
            <Editor entryToUpdate={entryToUpdate} dispatch={dispatch} />
            <YoutubeList list={list} dispatch={dispatch}/>
        </Box>
    )
}

export default MainPage
