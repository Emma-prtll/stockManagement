import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore.js";

const ProtectedRoute = ({ children, allowedRoles }) => {
    const userInfo = useAuthStore((state) => state.userInfo)
    const isLogged = !!userInfo

    //If the user is NOT logged -> redirect to the notLogged page
    if(!isLogged || !userInfo) {
        return <Navigate to="/notLogged" />
    }

    //If the user tries to go on a page but is not allowed -> redirect to the home page
    if(allowedRoles && !allowedRoles.includes(userInfo.user.role)) {
        return <Navigate to="/" />
    }

    //If there is no problem -> render the children
    return children
}

export default ProtectedRoute;