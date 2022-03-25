import { useEffect, useState } from 'react'
import httpClient from '../services/httpClient'
import { invoicesUrl } from '../constants/servicesUrls'

interface UseCreateInvoiceReturnType {
    updateInProgress: boolean
    updateResult: any
    updateError: Error | undefined
    createInvoice: (invoiceData: any) => Promise<void>
}
export const useCreateInvoice = (): UseCreateInvoiceReturnType => {
    const [updateInProgress, setUpdateInProgress] = useState(false)
    const [updateResult, setUpdateResult] = useState()
    const [updateError, setUpdateError] = useState<Error>()

    useEffect(() => {
        if (updateError) {
            setUpdateResult(undefined)
        }
    }, [updateError])

    useEffect(() => {
        if (updateResult) {
            setUpdateError(undefined)
        }
    }, [updateResult])

    const createInvoice = async (invoiceDate: any) => {
        setUpdateInProgress(true)
        try {
            const response = await httpClient.post(invoicesUrl, invoiceDate)
            setUpdateResult(response)
        } catch (e) {
            setUpdateError(e as Error)
        }
        setUpdateInProgress(false)
    }

    return { updateInProgress, updateResult, updateError, createInvoice }
}
