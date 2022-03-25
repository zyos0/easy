import { useEffect, useState } from 'react'
import httpClient from '../services/httpClient'
import { invoicesUrl } from '../constants/servicesUrls'

interface UseInvoiceSearch {
    updateInProgress: boolean
    updateResult: any
    updateError: Error | undefined
    createNewInvoice: (invoiceData: any) => Promise<void>
}

export const useInvoiceCreate = (): UseInvoiceSearch => {
    const [updateInProgress, setLoading] = useState(false)
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

    const createNewInvoice = async (invoiceData: any) => {
        setLoading(true)
        try {
            const response = await httpClient.post(invoicesUrl, invoiceData)
            setUpdateResult(response)
        } catch (e) {
            setUpdateError(e as Error)
        }
        setLoading(false)
    }

    return { updateInProgress, updateResult, createNewInvoice, updateError }
}
