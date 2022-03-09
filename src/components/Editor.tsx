import { Box, Button, TextField } from '@mui/material'
import { Dispatch, useEffect, useState } from 'react'
import { YoutubeItem } from '../types/youtubeItem'
// @ts-ignore
import { v4 as uuidv4 } from 'uuid'
import {useList} from "./MainPage";

const blackList = ['demo', 'test']

const Editor = () => {
    const [state, dispatch] = useList()
    const [videoName, setVideoName] = useState('')
    const [videoUrl, setVideoUrl] = useState('')
    const {entryToUpdate}= state
    useEffect(() => {
        if (!entryToUpdate) return

        setVideoName(entryToUpdate.videoName)
        setVideoUrl(entryToUpdate.videoUrl)
    }, [entryToUpdate])

    const handleSubmit = () => {
        const entry: YoutubeItem = entryToUpdate
            ? { videoName, videoUrl, id: entryToUpdate.id }
            : { videoName, videoUrl, id: uuidv4() }
        const type = entryToUpdate ? 'edit' : 'add'
        dispatch({ type, payload: { item: entry } })

        setVideoName('')
        setVideoUrl('')
    }

    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
                border: '1 px solid red',
                textAlign: 'center',
            }}
            noValidate
            autoComplete="off"
        >
            <div>
                <TextField
                    id="video-name"
                    label="video name"
                    variant="outlined"
                    value={videoName}
                    onChange={(e) => setVideoName(e.target.value)}
                />
            </div>
            <div>
                <TextField
                    id="video-url"
                    label="video url"
                    variant="outlined"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                />
            </div>
            <div>
                <Button variant="contained" onClick={() => handleSubmit()}>
                    {!entryToUpdate ? 'Create Entry' : 'Update Entry'}
                </Button>
            </div>
        </Box>
    )
}

export default Editor
