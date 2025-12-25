import EmployeeInfos from "../components/EmployeeInfos.jsx";
import StockInfos from "../components/StockInfos.jsx";
import {Button, Card, CardBody, CardFooter, Typography} from "@material-tailwind/react";
import {FaArrowRightLong} from "react-icons/fa6";
import React, {useEffect} from "react";
import {Helmet} from "react-helmet";
import {useCarStore} from "../store/carStore.js";
import {useUserStore} from "../store/userStore.js";



const Admin = () => {

    const users = useUserStore((state) => state.users);
    const getUsers = useUserStore((state) => state.getUsers)

    useEffect(() => {
        getUsers()
    }, [])

    return (
        <>
            <Helmet>
                <title>Admin</title>
            </Helmet>

            <section className=" fixed end-0 w-5/6 p-4 min-h-screen bg-gray-100">
                <section className="h-screen p-6 rounded-xl bg-blue-gray-300 overflow-y-auto ">

                    <section className="flex justify-between px-8 mb-6 mt-4">
                        <Typography variant="h3" color="white" className="mb-2">Employee list</Typography>
                        <Button className="bg-red-200 mb-8">Add Employee</Button>
                    </section>

                    <EmployeeInfos />
                </section>

                {/*<section className="h-screen p-6 rounded-xl bg-blue-gray-300 overflow-y-auto ">*/}
                {/*    {users?.length && users.map((car, i) => (*/}
                {/*        <div key={i} className="w-96 pb-16">*/}
                {/*            <EmployeeInfos user={user}/>*/}

                {/*        </div>*/}
                {/*    ))}*/}
                {/*</section>*/}
            </section>
        </>
    );
};

export default Admin;