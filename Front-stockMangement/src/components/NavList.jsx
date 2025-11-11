import { Typography } from "@material-tailwind/react";

const NavList = () => {
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

            <Typography
                as="a"
                href="/profile"
                color="white"
                className="p-2 rounded-lg hover:bg-amber-700 transition-all cursor-pointer"
            >
                Profile
            </Typography>

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

            <Typography
                as="a"
                href="/login"
                color="red"
                className="p-2 rounded-lg hover:bg-amber-700 transition-all cursor-pointer bg-amber-50 text-center font-black"
            >
                Logout
            </Typography>

        </nav>
    );
};

export default NavList;
