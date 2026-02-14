import { Typography } from "@material-tailwind/react";
import {useAuthStore} from "../store/authStore.js";

const NavList = () => {
    const userInfo = useAuthStore((state) => state.userInfo)

    // Set all the variables needed to display the nav list
    const isLogged = !!userInfo
    const role = userInfo?.user.role
    const isManager = role === "Manager"
    const isAdmin = role === "Admin"

    return (
        <nav className="flex flex-col gap-2">

            {/*USER IS CONNECTED*/}
            {isLogged && (
                <>
                    <Typography className="font-extrabold text-2xl pb-8 text-center" color="white" >
                        Hey, {userInfo?.user.firstName} !
                    </Typography>
                    {/* COMMON TO ALL */}
                    <Typography
                        as="a"
                        href="/"
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

                    {/* ADMIN ONLY */}
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

                    {/* COMMON TO ALL */}
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
