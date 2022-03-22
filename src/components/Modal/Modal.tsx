import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import {
    Breakpoint,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@mui/material'
import { LoadingButton } from '@mui/lab'

interface ModalProps {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
    title: string
    confirmIcon?: ReactJSXElement
    updateInProgress?: boolean
    cancelLabel?: string
    confirmLabel?: string
    size?: Breakpoint
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    children,
    onConfirm,
    title,
    confirmIcon,
    updateInProgress = false,
    cancelLabel = 'Cancel',
    confirmLabel = 'Accept',
    size = 'sm',
}) => {
    return (
        <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth={size}>
            <DialogTitle> {title}</DialogTitle>
            <DialogContent>{children}</DialogContent>
            <DialogActions>
                <Button color="error" variant="outlined" onClick={onConfirm}>
                    {cancelLabel}
                </Button>

                <LoadingButton
                    onClick={onConfirm}
                    loading={updateInProgress}
                    loadingPosition="start"
                    startIcon={confirmIcon}
                    variant="outlined"
                >
                    {confirmLabel}
                </LoadingButton>
            </DialogActions>
        </Dialog>
    )
}

export default Modal
