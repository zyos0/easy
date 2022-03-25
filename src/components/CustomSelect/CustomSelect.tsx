import { List, Button, Popper } from '@mui/material'
import SelectUnstyled from '@mui/base/SelectUnstyled'
import React, { ElementType } from 'react'

export const CustomSelect: React.FC<any> = (props) => {
    const components = {
        Root: Button,
        Listbox: List,
        Popper: Popper,
        ...props.components,
    }

    return <SelectUnstyled {...props} components={components} />
}
