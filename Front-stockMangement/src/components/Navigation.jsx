import React from "react";
import NavList from "./NavList.jsx";
import {Button, Typography} from "@material-tailwind/react";
import {useNavigate} from "react-router-dom";
import {useAuthStore} from "../store/authStore.js";
import {useUserStore} from "../store/userStore.js";

const Navigation = () => {

    let userInfo = useAuthStore((state) => state.userInfo)
    let logoutLocalStorage = useAuthStore((state) => state.logout)
    const logout = useUserStore((state) => state.userLogout)

    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            await logout()
            logoutLocalStorage()
            navigate('/')
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <aside className="fixed top-0 left-0 h-screen w-1/6 bg-amber-900 shadow-lg p-4 flex flex-col rounded-r-xl">
            {/*<img src="/img/GearStock_LogoLight.png" alt="Logo" className="w-24 mx-auto pb-10" />*/}
            <img src="/img/GearStock_LogoDark.png" alt="Logo" className="w-24 mx-auto pb-10" />

            {/*<Typography variant="h5" color="white" className="mb-6 text-center">*/}
            {/*    Mon Tableau de Bord*/}
            {/*</Typography>*/}

            {/* Contenu de la navigation (NavList) */}
            <NavList />

            {userInfo ? (
                <Button variant="text" className="p-2 mt-6 rounded-lg hover:bg-amber-700 transition-all cursor-pointer bg-amber-50 text-center font-black" onClick={handleLogout}>Logout</Button>
            ) : (
                <Button variant="text" className="p-2 rounded-lg hover:bg-amber-700 transition-all cursor-pointer bg-amber-50 text-center font-black" onClick={handleLogout}>
                    <a href="/login">Login</a>
                </Button>
            )}


            {/*<Typography*/}
            {/*    as="a"*/}
            {/*    href="/login"*/}
            {/*    color="red"*/}
            {/*    className="p-2 rounded-lg hover:bg-amber-700 transition-all cursor-pointer bg-amber-50 text-center font-black"*/}
            {/*>*/}
            {/*    Logout*/}
            {/*</Typography>*/}
        </aside>
    );
};

export default Navigation;
