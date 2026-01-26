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
import {MdDeleteOutline, MdEdit} from "react-icons/md";



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

    const [openUpdateRole, setOpenUpdateRole] = useState(false)
    const [openUpdateSector, setOpenUpdateSector] = useState(false)

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
                        color="deep-orange"
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
                        variant="outlined"
                        color="green"
                        onClick={handleDelete}
                        className="mr-1"
                    >
                        <span>Agree</span>
                    </Button>
                </DialogFooter>
            </Dialog>

            <section className="fixed end-0 w-5/6 p-4 h-screen">
                <section className="h-full p-2 rounded-xl bg-blue-gray-600">
                    {/*BACK BUTTON*/}
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
                    {/*TITLE*/}
                    <Typography className="font-h1 w-full text-center text-3xl pb-12" color="white">Employee infos</Typography>

                    <section className="flex flex-col items-center h-2/3">
                        {/*PERSONAL INFOS*/}
                        <section className="w-4/5 bg-blue-gray-800 rounded-2xl border-2 p-8 shadow-xl mb-4">
                            <Typography className="text-2xl font-bold text-gray-100 mb-6">
                                Personal information
                            </Typography>
                            {/*FIRSTNAME*/}
                            <section className="flex items-center pb-4">
                                <Typography className="text-xl font-bold text-gray-100">Firstname : </Typography>
                                <Typography className="text-xl pl-2 text-gray-100">{user?.firstName}</Typography>
                            </section>
                            {/*LASTNAME*/}
                            <section className="flex items-center pb-4">
                                <Typography className="text-xl font-bold text-gray-100">Lastname : </Typography>
                                <Typography className="text-xl pl-2 text-gray-100">{user?.lastName}</Typography>
                            </section>
                            {/*EMAIL*/}
                            <section className="flex items-center pb-4">
                                <Typography className="text-xl font-bold text-gray-100">Email : </Typography>
                                <Typography className="text-xl pl-2 text-gray-100">{user?.email}</Typography>
                            </section>
                        </section>

                        {/*PROFESSIONAL INFOS*/}
                        <section className="w-4/5 bg-blue-gray-800 rounded-2xl border-2 p-8 shadow-xl ">
                            <Typography className="text-2xl font-bold text-gray-100 mb-6">
                                Professional information
                            </Typography>
                            <section className="flex">

                            {/*ROLE*/}
                            <section className="w-1/2" >
                                <div className="flex items-center gap-4">
                                    <Typography className="font-bold text-2xl text-gray-100">Role : </Typography>
                                    <Typography className="text-2xl text-gray-100">{user?.role}</Typography>
                                    <IconButton
                                        onClick={() => setOpenUpdateRole(!openUpdateRole)}
                                        className="rounded-3xl bg-amber-900"
                                        size="sm"
                                    >
                                        <MdEdit size={18}  />
                                    </IconButton>
                                </div>
                                <Collapse open={openUpdateRole} className="w-96">
                                    <Select
                                        variant="static"
                                        size="lg"
                                        name="role"
                                        value={role}
                                        onChange={(value) => setRole(value)}
                                        className="text-gray-100"
                                    >
                                        <Option value="Admin">Admin</Option>
                                        <Option value="Manager">Manager</Option>
                                        <Option value="Employee">Employee</Option>
                                    </Select>
                                    <Button
                                        className="mt-8 mb-16 bg-amber-900"
                                        onClick={(e) => handleSubmit(e, { role })}
                                    >
                                        Save role
                                    </Button>
                                </Collapse>
                            </section>

                            {/*SECTOR*/}
                            <section className="w-1/2">
                                <div className="flex items-center gap-4">
                                    <Typography className="font-bold text-2xl text-gray-100">Sector : </Typography>
                                    <Typography className="text-2xl text-gray-100">{user?.sector}</Typography>
                                    <IconButton
                                        onClick={() => setOpenUpdateSector(!openUpdateSector)}
                                        className="rounded-3xl bg-amber-900"
                                        size="sm"
                                    >
                                        <MdEdit size={18}  />
                                    </IconButton>
                                </div>
                                <Collapse open={openUpdateSector} className="w-96">
                                    <Select
                                        variant="static"
                                        size="lg"
                                        name="sector"
                                        value={sector}
                                        onChange={(value) => setSector(value)}
                                        className="text-gray-100"
                                    >
                                        <Option value="Stock">Stock</Option>
                                        <Option value="Customer service">Customer service</Option>
                                        <Option value="Supplier">Supplier</Option>
                                    </Select>
                                    <Button
                                        className="mt-8 mb-16 bg-amber-900"
                                        onClick={(e) => handleSubmit(e, { sector })}
                                    >
                                        Save sector
                                    </Button>
                                </Collapse>

                        </section>
                            </section>

                        </section>

                        {/*DELETE EMPLOYEE*/}
                        <section className="fixed bottom-16 ">
                            <Button
                                variant="gradient"
                                color="red"
                                onClick={handleOpenDelete}
                                className="mr-1 flex items-center gap-2"
                            >
                                Delete employee
                            </Button>
                        </section>
                    </section>
                </section>
            </section>
        </>
    );
};

export default EmployeeEdit;

