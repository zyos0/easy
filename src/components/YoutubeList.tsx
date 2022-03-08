import { YoutubeItem } from '../types/youtubeItem'
import {
    List,
} from '@mui/material'
import YoutubeListItem from './YoutubeListItem'

interface YoutubeListProps {
    list: YoutubeItem[]
    onUpdate: (updatePayload: YoutubeItem) => void
    onDelete: (deletePayload: YoutubeItem) => void
}

const YoutubeList: React.FC<YoutubeListProps> = ({
    list,
    onDelete,
    onUpdate,
}) => {
    return (
        <List dense>
            {list.map((listEntry) => {
                return (
                    <YoutubeListItem
                        onUpdate={onUpdate}
                        onDelete={onDelete}
                        listItem={listEntry}
                    />
                )
            })}
        </List>
    )
}

export default YoutubeList
