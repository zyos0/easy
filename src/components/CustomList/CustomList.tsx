import React from 'react';
import { List } from '@mui/material';

export interface ListItemInterface {
    id: number | string;
}

export interface ListItemComponent<T extends ListItemInterface> {
    item: T;
    onUpdate: (item: T) => void;
    onDelete: (item: T) => void;
}

export interface ListProps<T extends ListItemInterface> {
    collection: T[];
    renderAs: React.FC<ListItemComponent<T>>;
    onUpdate: (item: T) => void;
    onDelete: (item: T) => void;
}

const CustomList = <T extends ListItemInterface>(props: ListProps<T>) => {
    const { collection, onUpdate, onDelete, renderAs } = props;
    return (
        <List>
            {collection &&
                collection.map(function createListItem(item) {
                    return renderAs({ item, onDelete, onUpdate });
                })}
        </List>
    );
};

export default CustomList;
