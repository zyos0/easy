import Editor from './Editor'
import { useState } from 'react'
import { YoutubeItem } from '../types/youtubeItem'
import {
    Avatar,
    Box,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
} from '@mui/material'
import { Delete, Edit, Folder } from '@mui/icons-material'

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
                border: '1 px solid blue',
                width: '300px',
                textAlign: 'center',
            }}
            noValidate
            autoComplete="off"
        >
            <Editor entryToUpdate={entryToUpdate} onSubmit={handleSave} />
            <List dense>
                {list.map((listEntry) => {
                    return (
                        <ListItem key={listEntry.id}>
                            <ListItemSecondaryAction>
                                <IconButton
                                    edge="end"
                                    aria-label="delete"
                                    onClick={() => handleDelete(listEntry)}
                                >
                                    <Delete />
                                </IconButton>
                                <IconButton
                                    edge="end"
                                    aria-label="delete"
                                    onClick={() => setEntryToUpdate(listEntry)}
                                >
                                    <Edit />
                                </IconButton>
                            </ListItemSecondaryAction>
                            <ListItemAvatar>
                                <Avatar>
                                    <Folder />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={listEntry.videoName} />
                        </ListItem>
                    )
                })}
            </List>
        </Box>
    )
}

export default MainPage
