import { YoutubeItem } from '../types/youtubeItem'
import {
    List,
} from '@mui/material'
import YoutubeListItem from './YoutubeListItem'
import {Dispatch} from "react";

interface YoutubeListProps {
    list: YoutubeItem[]
    dispatch: Dispatch<any>
}

const YoutubeList: React.FC<YoutubeListProps> = ({
    list,
   dispatch
}) => {
    return (
        <List dense>
            {list.map((listEntry) => {
                return (
                    <YoutubeListItem
                        dispatch={dispatch}
                        listItem={listEntry}
                    />
                )
            })}
        </List>
    )
}

export default YoutubeList
