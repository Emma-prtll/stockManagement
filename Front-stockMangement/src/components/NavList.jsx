import { Typography } from "@material-tailwind/react";
import {useAuthStore} from "../store/authStore.js";

const NavList = () => {

    const userInfo = useAuthStore((state) => state.userInfo)

    return (
        <nav className="flex flex-col gap-2">
            <Typography
                as="a"
                href="/home"
                color="white"
                className="p-2 rounded-lg hover:bg-amber-700 transition-all cursor-pointer"
            >
                Dashboard
            </Typography>

            <Typography
                as="a"
                href="/stock"
                color="white"
                className="p-2 rounded-lg hover:bg-amber-700 transition-all cursor-pointer"
            >
                Stock
            </Typography>

            <Typography
                as="a"
                href="/addItem"
                color="white"
                className="p-2 rounded-lg hover:bg-amber-700 transition-all cursor-pointer"
            >
                Add new item
            </Typography>

            <hr className="my-3 border-amber-800" />

            {userInfo && (
            <Typography
                as="a"
                href="/profile"
                color="white"
                className="p-2 rounded-lg hover:bg-amber-700 transition-all cursor-pointer"
            >
                Profile
            </Typography>
            )}


            <Typography
                as="a"
                href="/admin"
                color="white"
                className="p-2 rounded-lg hover:bg-amber-700 transition-all cursor-pointer"
            >
                Administrator (admin only)
            </Typography>

            <Typography
                as="a"
                href="/register"
                color="white"
                className="p-2 rounded-lg hover:bg-amber-700 transition-all cursor-pointer"
            >
                Register (admin only)
            </Typography>

            {userInfo && (
                <Typography
                    color="red"
                    className="font-bold bg-gray-300 m-2 text-center rounded-lg"
                >You are connected</Typography>
            )}

        </nav>
    );
};

export default NavList;
