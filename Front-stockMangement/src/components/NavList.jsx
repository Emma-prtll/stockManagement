import React from "react";
import { Typography } from "@material-tailwind/react";
import {useAuthStore} from "../store/authStore.js";

const NavList = () => {
    const userInfo = useAuthStore((state) => state.userInfo);

    const isLogged = !!userInfo
    const role = userInfo?.user.role

     // let userRole = ""
    // if(role === "Admin") {
    //      userRole = "Admin"
    // }else if (role === "Manager") {
    //     userRole = "Manager"
    // }else if (role === "Employee") {
    //     userRole = "Employee"
    // }

    // const isEmployee = role === "Employee";
    const isManager = role === "Manager";
    const isAdmin = role === "Admin";

    return (
        <nav className="flex flex-col gap-2">
            <Typography className="font-extrabold text-2xl pb-8 text-center" color="white" >
                Hey, {userInfo?.user.firstName} !
            </Typography>

            {/*USER CONNECTED*/}
            {isLogged && (
                <>
                    {/* COMMUN À TOUS */}
                    <Typography
                        as="a"
                        href="/home"
                        color="white"
                        className="p-2 rounded-lg hover:bg-amber-700 transition-all cursor-pointer font-semibold"
                    >
                        Dashboard
                    </Typography>

                    <Typography
                        as="a"
                        href="/stock"
                        color="white"
                        className="p-2 rounded-lg hover:bg-amber-700 transition-all cursor-pointer font-semibold"
                    >
                        Stock
                    </Typography>

                    {/* MANAGER + ADMIN */}
                    {(isManager || isAdmin) && (
                        <Typography
                            as="a"
                            href="/addItem"
                            color="white"
                            className="p-2 rounded-lg hover:bg-amber-700 transition-all cursor-pointer font-semibold"
                        >
                            Add new item
                        </Typography>

                    )}

                    {/* ADMIN SEUL */}
                    {(isAdmin) && (
                        <Typography
                            as="a"
                            href="/admin"
                            color="white"
                            className="p-2 rounded-lg hover:bg-amber-700 transition-all cursor-pointer font-semibold"
                        >
                            Administrator
                        </Typography>
                    )}

                    {/* COMMUN */}
                    <Typography
                        as="a"
                        href="/profile"
                        color="white"
                        className="p-2 rounded-lg hover:bg-amber-700 transition-all cursor-pointer font-black"
                    >
                        Profile
                    </Typography>

                </>
            )}
        </nav>
    );
};

export default NavList;
