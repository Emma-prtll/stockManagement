import React, {useEffect} from 'react';
import StockInfos from "../components/StockInfos.jsx";
import {
    Button,
    ButtonGroup,
    Card,
    CardBody,
    Collapse, Dialog, DialogBody, DialogFooter, DialogHeader,
    IconButton,
    Input, Option,
    Select,
    Typography
} from "@material-tailwind/react";
import {Helmet} from "react-helmet";
import {useUserStore} from "../store/userStore.js";
import {useNavigate, useParams} from "react-router-dom";
import {FaArrowLeftLong, FaArrowRightLong} from "react-icons/fa6";
import {useState} from "react";
import { RiEditLine } from "react-icons/ri";
import {useAuthStore} from "../store/authStore.js";
// import {toast} from "react-toastify";
import toast, {Toaster} from "react-hot-toast";



const EmployeeEdit = () => {

    // //State pour les collapse
    // const navigate = useNavigate();
    // const [openRole, setOpenRole] = useState(false)
    // const toggleOpenRole= () => setOpenRole((openRole) => !openRole)
    // const [openSector, setOpenSector] = useState(false)
    // const toggleOpenSector= () => setOpenSector((openSector) => !openSector)

    //State pour les inputs
    const [role, setRole] = useState("")
    const [sector, setSector] = useState("")


    const user = useUserStore((state) => state.users);
    const userInfo = useAuthStore((state) => state.userInfo)
    const getAUser = useUserStore((state) => state.getAUser)
    const updateUser = useUserStore((state) => state.updateUser)
    const deleteUser = useUserStore((state) => state.deleteUser)
    const message = useUserStore((state) => state.message)
    const user_id = useParams().id

    useEffect(() => {
        getAUser(user_id)
    }, [])

    //Suppression du user
    const navigate = useNavigate();

    const handleDelete = async () => {
        // if(user._id) {
        //     await deleteUser(user._id)
        //     navigate("/admin")
        //     toast.success(user.message)
        // }

        try {
            await deleteUser(user._id)
            navigate("/admin")
            toast.success(user.message)
        } catch (err) {
            toast.error(err.message);
        }
    }

    const [openDelete, setOpenDelete] = React.useState(false);
    const handleOpenDelete = () => setOpenDelete(!openDelete);

    //  changer de role et sector
    const handleSubmit = async (e, data) => {
        e.preventDefault();
        try {
            const res = await updateUser(user_id, data);
            toast.success(res.message);
            await getAUser(user_id);

            setRole("");
            setSector("")

        } catch (err) {
            toast.error(err.message)
        }
    }

    const [open, setOpen] = React.useState(true);
    const handleOpen = () => setOpen(!open);

    return (
        <>
            <Helmet>
                <title>Admin - Employee infos</title>
            </Helmet>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />

            {/*DIALOG*/}
            <Dialog open={open} handler={handleOpen}>
                <DialogHeader>Edit mode</DialogHeader>
                <DialogBody className="flex flex-col">
                    You are currently editing this employee’s information.
                    Any change you make will be saved directly to the database.

                    <span className="font-bold">
                    Please make sure all information is correct before making changes.
                    </span>
                    This action affects the employee’s account and responsibilities.

                </DialogBody>
                <DialogFooter className="flex justify-center gap-8">
                    <Button
                        variant="gradient"
                        color="red"
                        onClick={handleOpen}
                        className="mr-1"
                    >
                        <span>Agree</span>
                    </Button>
                </DialogFooter>
            </Dialog>
            {/* DIALOGUE DE CONFIRMATION DE SUPPRESSION */}
            <Dialog open={openDelete} handler={handleOpenDelete}>
                <DialogHeader>You are about to delete an employee ! </DialogHeader>
                <DialogBody className="flex flex-col">
                    You are currently editing this employee’s information.
                    Any change you make will be saved directly to the database.

                    <span className="font-bold">
                    Please make sure all information is correct before making changes.
                    </span>
                    This action affects the employee’s account and responsibilities.

                </DialogBody>
                <DialogFooter className="flex justify-center gap-8">
                    <Button
                        variant="gradient"
                        color="red"
                        onClick={handleOpenDelete}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button
                        variant="gradient"
                        color="red"
                        onClick={handleDelete}
                        className="mr-1"
                    >
                        <span>Agree</span>
                    </Button>
                </DialogFooter>
            </Dialog>

            <section className="fixed end-0 w-5/6 p-4 h-screen bg-blue-100">
                <section className="h-full p-2 rounded-xl bg-blue-500">
                    <section className="pt-6 pl-6">
                        <Typography
                            as="a"
                            href="/admin"
                            color="black"
                            className="flex items-center bg-gray-300 gap-2 py-3 px-8 rounded-lg font-bold text-sm w-36"
                        >
                            <FaArrowLeftLong />
                            BACK
                        </Typography>
                    </section>

                    <section className="w-full h-5/6 p-4 flex flex-col  mt-8 justify-evenly bg-red-200 ">
                        <section className="text-center">
                            <Typography variant="h1" color="blue-gray" className="mb-5">
                                Employee infos
                            </Typography>
                        </section>
                        <section className="flex h-5/6">
                            {/*PERSONAL INFOS*/}
                            <section className="w-1/2 p-6 bg-green-500 ">
                                {/*FIRSTNAME*/}
                                <section className="w-1/2 pt-3">
                                    <section className="flex items-center gap-6">
                                        <Typography variant="h3" color="blue-gray" className="">
                                            {user?.firstName}
                                        </Typography>
                                    </section>
                                </section>
                                {/*LASTNAME*/}
                                <section className="w-1/2 pt-3">
                                    <section className="flex items-center gap-6">
                                        <Typography variant="h3" color="blue-gray" className="">
                                            {user?.lastName}
                                        </Typography>
                                    </section>
                                </section>
                                {/*EMAIL*/}
                                <section className="w-1/2 pt-3">
                                    <section className="flex items-center gap-6">
                                        <Typography variant="h3" color="blue-gray" className="">
                                            {user?.email}
                                        </Typography>
                                    </section>
                                </section>
                                <section>
                                    <Button>
                                        <Typography variant="h4" color="white" className="text-center" onClick={handleOpenDelete} >
                                            Delete employee
                                        </Typography>
                                    </Button>
                                </section>
                            </section>
                            {/*PROFESSIONAL INFOS*/}
                            <section className="w-1/2 p-6 bg-amber-400 flex gap-10 flex-col">
                                <Typography color="white" className="font-bold text-xl">Role : {user?.role}</Typography>
                                <Select
                                    variant="static"
                                    label="Role"
                                    size="lg"
                                    name="role"
                                    value={role}
                                    onChange={(value) => setRole(value)}
                                >
                                    <Option value="Admin">Admin</Option>
                                    <Option value="Manager">Manager</Option>
                                    <Option value="Employee">Employee</Option>
                                </Select>
                                {/*<Button color="orange" onClick={(e) => handleSubmit(e, {role})}>Save</Button>*/}
                                <Button color="orange" onClick={(e) => handleSubmit(e, { role })}>
                                    Save role
                                </Button>


                                <Typography color="white" className="font-bold text-xl">Sector : {user?.sector}</Typography>
                                <Select
                                    variant="static"
                                    label="Sector"
                                    size="lg"
                                    name="sector"
                                    value={sector}
                                    onChange={(value) => setSector(value)}
                                >
                                    <Option value="Stock">Stock</Option>
                                    <Option value="Customer service">Customer service</Option>
                                    <Option value="Supplier">Supplier</Option>
                                </Select>
                                <Button color="orange" onClick={(e) => handleSubmit(e, { sector })}>
                                    Save sector
                                </Button>
                            </section>
                        </section>

                    </section>

                </section>
            </section>
        </>
    );
};

export default EmployeeEdit;

