import React from 'react';
import { Plate } from '../../../types/Plate';
import { ListItemComponent } from '../../CustomList/CustomList';
import {Avatar, IconButton, ListItem, ListItemSecondaryAction, ListItemText} from "@mui/material";
import {Delete, Edit, Fastfood} from "@mui/icons-material";

const PlateListItem: React.FC<ListItemComponent<Plate>> = ({
    item,
    onUpdate,
    onDelete,
}) => {
    return (
        <ListItem key={item.id}>
            <Avatar>
                <Fastfood />
            </Avatar>
            <ListItemText
                primary={item.nombre}
                secondary={`Price: ${item.precio}`}
            />

            <ListItemSecondaryAction>
                <IconButton onClick={() => onUpdate(item)}>
                    <Edit />
                </IconButton>

                <IconButton onClick={() => onDelete(item)}>
                    <Delete />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
};

export default PlateListItem;
