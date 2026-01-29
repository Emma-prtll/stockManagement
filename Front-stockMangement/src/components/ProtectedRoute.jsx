import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore.js";

const ProtectedRoute = ({ children, allowedRoles }) => {
    const userInfo = useAuthStore((state) => state.userInfo);
    const isLogged = !!userInfo

    //is logged ?
    if(!isLogged || !userInfo) {
        return <Navigate to="/notLogged" />
    }

    //is allowed ?
    if(allowedRoles && !allowedRoles.includes(userInfo.user.role)) {
        return <Navigate to="/home" />
    }

    //is ok
    return children
}

export default ProtectedRoute;