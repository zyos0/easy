import Layout from '../../components/Layout/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { PlatesActions } from '../../store/actions/plates'
import { useEffect, useState } from 'react'
import {
    Avatar,
    Button,
    Dialog,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
} from '@mui/material'

import {
    getPlatesListInProgressSelector,
    plateListSelector,
} from '../../store/selectors/plates'

import LoadingState from '../../components/LoadingState'
import EmptyState from '../../components/EmptyState'
import { Delete, Edit, Fastfood } from '@mui/icons-material'
import UpdatePlateModal from '../../components/Plates/UpdatePlateModal/UpdatePlateModal'
import DeletePlateModal from '../../components/Plates/DeletePlateModal/DeletePlateModal'
import { Plate } from '../../types/Plate'
import PlateListItem from '../../components/Plates/PlateListItem'
import CustomList from '../../components/CustomList'

const Plates = () => {
    const dispatch = useDispatch()
    const [showCreateDialog, setShowCreateDialog] = useState(false)
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)
    const [updatePlate, setUpdatePlate] = useState<Plate>()

    const plateList = useSelector(plateListSelector)
    const fetchPlateListInProgress = useSelector(
        getPlatesListInProgressSelector
    )

    useEffect(() => {
        dispatch(PlatesActions.getPlates())
    }, [dispatch])

    const handleOnUpdate = (item: Plate) => {
        setUpdatePlate(item)
        setShowCreateDialog(true)
    }

    const handleOnDelete = (item: Plate) => {
        setUpdatePlate(item)
        setShowDeleteDialog(true)
    }
    const onUpdateDialogDismiss = () => {
        setShowCreateDialog(false)
        setUpdatePlate(undefined)
    }

    const onDeleteDialogDismiss = () => {
        setShowDeleteDialog(false)
        setUpdatePlate(undefined)
    }

    useEffect(() => {
        dispatch(PlatesActions.getPlates())
    }, [dispatch])

    return (
        <>
            <UpdatePlateModal
                open={showCreateDialog}
                plate={updatePlate}
                onClose={onUpdateDialogDismiss}
            />
            <DeletePlateModal
                open={showDeleteDialog}
                plate={updatePlate as Plate}
                onClose={onDeleteDialogDismiss}
            />
            <Layout>
                {fetchPlateListInProgress && (
                    <LoadingState message="Loading plates..." />
                )}

                {!fetchPlateListInProgress && (
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <h1>Plates</h1>
                            <Button
                                variant="contained"
                                onClick={() => setShowCreateDialog(true)}
                            >
                                Add new plate
                            </Button>
                        </Grid>

                        {plateList && plateList.length ? (
                            <Grid item xs={9}>
                                {plateList &&
                                    plateList.length !== 0 &&
                                    plateList.map((item: any) => (
                                        <CustomList<Plate>
                                            renderAs={PlateListItem}
                                            collection={plateList}
                                            onDelete={handleOnDelete}
                                            onUpdate={handleOnUpdate}
                                        />
                                    ))}
                            </Grid>
                        ) : (
                            <EmptyState message="No plates Available" />
                        )}
                    </Grid>
                )}
            </Layout>
        </>
    )
}

export default Plates
