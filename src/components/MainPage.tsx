import Editor from './Editor'
import { useState } from 'react'
import { YoutubeItem } from '../types/youtubeItem'
import {
    Box,
} from '@mui/material'
import YoutubeList from "./YoutubeList";

const MainPage = () => {
    const [list, updateList] = useState<YoutubeItem[]>([])
    const [entryToUpdate, setEntryToUpdate] = useState<YoutubeItem>()

    const handleSave = (newEntry: YoutubeItem) => {
        if (!entryToUpdate) {
            const newList = list.concat(newEntry)
            updateList(newList)
        } else {
            const newList = list.map((entry) => {
                return entry.id === newEntry.id ? newEntry : entry
            })
            updateList(newList)
            setEntryToUpdate(undefined)
        }
    }

    const handleDelete = (entryToRemove: YoutubeItem) => {
        const newList = list.filter((entry) => entryToRemove.id !== entry.id)
        updateList(newList)
    }
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
            <Editor entryToUpdate={entryToUpdate} onSubmit={handleSave} />
            <YoutubeList list={list} onDelete={handleDelete} onUpdate={setEntryToUpdate}/>
        </Box>
    )
}

export default MainPage
