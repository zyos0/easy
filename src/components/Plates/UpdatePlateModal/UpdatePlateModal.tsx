import Modal from '../../Modal'
import { TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import {
    createPlateInProgressSelector,
    updatePlateInProgressSelector,
} from '../../../store/selectors/plates'
import { useDispatch, useSelector } from 'react-redux'
import { Plate } from '../../../types/Plate'
import { Save } from '@mui/icons-material'
import { PlatesActions } from '../../../store/actions/plates'
interface UpdatePlateModalProps {
    plate?: Plate
    open: boolean
    onClose: () => void
}

const UpdatePlateModal: React.FC<UpdatePlateModalProps> = ({
    plate,
    open,
    onClose,
}) => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [dirty, setDirty] = useState(false)
    const updateInProgress = useSelector(updatePlateInProgressSelector)
    const createInProgress = useSelector(createPlateInProgressSelector)
    const create = !plate
    const confirmLabel = create ? 'Create' : 'Update'
    const title = `${confirmLabel} Plate`
    const dispatch = useDispatch()

    useEffect(() => {
        if (!dirty) return
        if (!(updateInProgress || createInProgress)) {
            onClose()
            setDirty(false)
            setName('')
            setPrice('')
        }
    }, [createInProgress, dirty, onClose, updateInProgress])

    useEffect(() => {
        if (!plate) {
            setName('')
            setPrice('')
            return
        }
        setName(plate.nombre)
        setPrice(plate.precio.toString())
    }, [plate])

    const handleConfirm = (
        payload: Partial<Plate>,
        currentPlate: Plate | undefined
    ) => {
        const payloadCandidate: Plate = !create
            ? ({ ...currentPlate, ...payload } as Plate) // Object.assign({}, currentPlate, payload)
            : ({ ...payload, estado: true } as Plate)

        const dispatchAction = !create
            ? PlatesActions.updatePlate
            : PlatesActions.createPlate

        dispatch(dispatchAction(payloadCandidate))
        setDirty(true)
    }

    return (
        <Modal
            title={title}
            isOpen={open}
            onClose={onClose}
            confirmLabel={confirmLabel}
            confirmIcon={<Save />}
            updateInProgress={updateInProgress || createInProgress}
            onConfirm={() =>
                handleConfirm({ nombre: name, precio: Number(price) }, plate)
            }
        >
            <TextField
                type="text"
                fullWidth
                margin="dense"
                label='Plate Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <TextField
                type="text"
                fullWidth
                margin="dense"
                label="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />
        </Modal>
    )
}

export default UpdatePlateModal
