import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Plates from './pages/Plates'
import {
    baseRoute,
    customersRoute,
    loginRoute,
    platesRoute,
} from './constants/routes'
import { decodeToken, getToken } from './utils/tokenManagement'
import { useDispatch } from 'react-redux'
import { SessionActions } from './store/actions/session'
import PrivateRoute from './components/PrivateRoute'
import Customers from './pages/Customers'

const MainRouter = () => {
    const token = getToken()
    const dispatch = useDispatch()
    if (token) {
        const decodedUserData = decodeToken()
        dispatch(SessionActions.onLoginSuccess(decodedUserData))
    }
    return (
        <BrowserRouter>
            <Routes>
                <Route path={baseRoute} element={<Login />} />
                <Route path={loginRoute} element={<Login />} />
                <Route
                    path={platesRoute}
                    element={
                        <PrivateRoute>
                            <Plates />
                        </PrivateRoute>
                    }
                />
                <Route
                    path={customersRoute}
                    element={
                        <PrivateRoute>
                            <Customers />
                        </PrivateRoute>
                    }
                />
                <Route path="*" element={<span>404</span>} />
            </Routes>
        </BrowserRouter>
    )
}

export default MainRouter
