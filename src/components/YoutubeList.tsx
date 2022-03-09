import {
    List,
} from '@mui/material'
import YoutubeListItem from './YoutubeListItem'
import {useList} from "./MainPage";



const YoutubeList  = () => {
    const [state, ] = useList()
    const {list}= state
    return (
        <List dense>
            {list.map((listEntry:any) => {
                return (
                    <YoutubeListItem
                        listItem={listEntry}
                    />
                )
            })}
        </List>
    )
}

export default YoutubeList
