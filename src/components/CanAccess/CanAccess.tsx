import { getToken } from '../../utils/tokenManagement'
import { Navigate } from 'react-router-dom'
import { loginRoute } from '../../constants/routes'

const CanAccess = (
    ComponentToRender: React.FunctionComponent | React.ComponentClass
) => {
    const token = getToken()
    return (props: any) => {
        if (token) {
            return <ComponentToRender {...props} />
        }
        return <Navigate to={loginRoute} />
    }
}

export default CanAccess
