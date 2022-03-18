import axios from 'axios'
import { axiosConfig } from '../constants/config'
import {getToken} from "../utils/tokenManagement";

const http = axios.create(axiosConfig)

const configRequestSuccess = (config: any) => {
    const token = getToken()
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}

const configRequestError = (error: any) => {
    return Promise.reject(error)
}

http.interceptors.request.use(configRequestSuccess, configRequestError)

const validateError = (error: any) => {
    const token = getToken()
    if (token) return Promise.reject(error)
    window.location.href = 'loginUrl'
}

const enforceSecurity = (request: Promise<any>, strict: boolean) => {
    return strict ? request.catch(validateError) : request
}

const get = (path: string, strict = true) =>
    enforceSecurity(http.get(path), strict)
const del = (path: string, strict = true) =>
    enforceSecurity(http.delete(path), strict)
const put = (path: string, request: any, strict = true) =>
    enforceSecurity(http.put(path, request), strict)
const post = (path: string, request: any, strict = true) =>
    enforceSecurity(http.post(path, request), strict)

const httpClient = {
    get,
    put,
    post,
    delete: del,
}

export default httpClient
