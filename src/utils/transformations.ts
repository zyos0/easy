import {ListItemInterface} from "../components/CustomList/CustomList";

type indexValue = string|number

export const MapToList = <T extends ListItemInterface>(collection: T[]|null, key: indexValue='id') => {
    return collection?.reduce(function geyKeyValue(
        resultMap: { [K: indexValue]: T },
        currentEntry: T
    ) {
        return { ...resultMap, [currentEntry[key]]: currentEntry }
    },
    {})
}
