import { Plate } from '../../../types/Plate'
import Modal from '../../Modal'
import { useDispatch, useSelector } from 'react-redux'
import { PlatesActions } from '../../../store/actions/plates'
import { deletePlateInProgress } from '../../../store/selectors/plates'
import { Delete } from '@mui/icons-material'
import { useEffect, useState } from 'react'

interface DeletePlateModalProps {
    plate: Plate
    open: boolean
    onClose: () => void
}

const DeletePlateModal: React.FC<DeletePlateModalProps> = ({
    plate,
    open,
    onClose,
}) => {
    const dispatch = useDispatch()
    const deleteInProgress = useSelector(deletePlateInProgress)
    const [deleteAttempt, setDeleteAttempt] = useState(false)
    useEffect(() => {
        if (!deleteAttempt) return
        if (!deleteInProgress) {
            onClose()
            setDeleteAttempt(false)
        }
    }, [deleteAttempt, deleteInProgress, onClose])
    const onDismiss = () => {
        onClose()
    }
    const handleOnClose = () => {
        onDismiss()
    }

    const handleOnConfirm = () => {
        dispatch(PlatesActions.deletePlate(plate.id))
        setDeleteAttempt(true)
    }
    return (
        <Modal
            onClose={handleOnClose}
            isOpen={open}
            title="Delete Plate"
            onConfirm={handleOnConfirm}
            updateInProgress={deleteInProgress}
            confirmLabel="Delete"
            confirmIcon={<Delete />}
        >
            <span>Are you sure you want to delete {plate?.nombre} ?</span>
        </Modal>
    )
}

export default DeletePlateModal
