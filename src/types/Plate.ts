import { ListItemInterface } from '../components/CustomList/CustomList'

export interface Plate extends ListItemInterface {
    id: number | string
    nombre: string
    precio: number
    estado?: boolean
}
