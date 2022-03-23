import React from 'react';
import { Customer } from '../../../types/Customer';
import { ListItemComponent } from '../../CustomList/CustomList';
import {
    Avatar,
    IconButton,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
} from '@mui/material';
import { Delete, Edit, Fastfood } from '@mui/icons-material';

const CustomerListItem: React.FC<ListItemComponent<Customer>> = ({
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
                primary={`${item.nombres} ${item.apellidos}`}
                secondary={`Birthdate: ${item.fechaNac}`}
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

export default CustomerListItem;
