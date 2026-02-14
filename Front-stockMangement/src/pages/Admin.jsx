import EmployeeInfos from "../components/EmployeeInfos.jsx";
import {Typography} from "@material-tailwind/react";
import {useEffect} from "react";
import {Helmet} from "react-helmet";
import {useUserStore} from "../store/userStore.js";
import { useLocation } from "react-router-dom";
import {Toaster} from "react-hot-toast";

const Admin = () => {

    const getUsers = useUserStore((state) => state.getUsers)

    useEffect(() => {
        getUsers()
    }, [])

    return (
        <>
            <Helmet>
                <title>Admin</title>
            </Helmet>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            <section className=" fixed end-0 w-5/6 p-4 min-h-screen bg-gray-100">
                <section className="h-screen p-6 rounded-xl bg-blue-gray-500 overflow-y-auto ">

                    <section className="flex justify-between px-8 mb-6 mt-4">
                        <Typography color="white" className="font-h1 text-3xl mb-2">Employee list</Typography>
                        <Typography
                            as="a"
                            href="/register"
                            color="black"
                            className="p-3 rounded-lg bg-gray-400 hover:bg-amber-900 transition-all cursor-pointer font-semibold shadow-2xl"
                        >
                            Add Employee
                        </Typography>
                    </section>

                    <EmployeeInfos />

                </section>
            </section>
        </>
    );
};

export default Admin;