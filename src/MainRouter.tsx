import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Plates from './components/Plates'

const MainRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/plates" element={<Plates />} />
            </Routes>
        </BrowserRouter>
    )
}

export default MainRouter
