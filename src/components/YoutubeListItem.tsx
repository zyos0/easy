import { YoutubeItem } from '../types/youtubeItem'
import {
    Avatar,
    IconButton,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
} from '@mui/material'
import { Delete, Edit, Folder } from '@mui/icons-material'
import { getThumbnail } from '../utils'
import { Dispatch } from 'react'
import {useList} from "./MainPage";

interface YoutubeListItemProps {
    listItem: YoutubeItem
}
const YoutubeListItem: React.FC<YoutubeListItemProps> = ({
    listItem,
}) => {
    const [,dispatch ] = useList()
    return (
        <ListItem key={listItem.id}>
            <ListItemSecondaryAction>
                <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() =>
                        dispatch({
                            type: 'delete',
                            payload: { item: listItem },
                        })
                    }
                >
                    <Delete />
                </IconButton>
                <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() =>
                        dispatch({
                            type: 'start-edit',
                            payload: { item: listItem },
                        })
                    }
                >
                    <Edit />
                </IconButton>
            </ListItemSecondaryAction>
            <ListItemAvatar>
                <Avatar src={getThumbnail(listItem.videoUrl)}>
                    {getThumbnail(listItem.videoUrl) ? (
                        listItem.videoName.slice(0, 1)
                    ) : (
                        <Folder />
                    )}
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={listItem.videoName} />
        </ListItem>
    )
}

export default YoutubeListItem
