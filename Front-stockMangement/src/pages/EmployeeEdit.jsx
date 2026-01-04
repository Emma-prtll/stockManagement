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
import {toast} from "react-toastify";


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
    const user_id = useParams().id



    useEffect(() => {
        getAUser(user_id)
    }, [])



    //Méthode pour gérer l'update des infos de l'utilisateur
    // const handleSubmit = async (e, data) => {
    //     e.preventDefault()
    //     try {
    //         let update = {
    //             _id: userInfo.user._id,
    //             input: data
    //         }
    //         await updateUser(update)
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }
    const handleSubmit = async (e, data) => {
        e.preventDefault();
        try {
            await updateUser(user_id, data)
            await getAUser(user_id)

            setRole("")
            setSector("")

        } catch (err) {
            console.log(err);
        }
    }

    // const handleSubmit = async (e, data) => {
    //     e.preventDefault()
    //     try {
    //         let update = {
    //             _id: userInfo.user._id,
    //             input: data
    //         }
    //         await updateProfile(update)
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }
    const [open, setOpen] = React.useState(true);
    const handleOpen = () => setOpen(!open);

    return (
        <>
            <Helmet>
                <title>Admin - Employee infos</title>
            </Helmet>

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

// {/*ROLE*/}
// <section className="w-1/2 pt-3 bg-amber-400    ">
//     <section className="flex items-center gap-6">
//         <Typography variant="h3" color="blue-gray" className="">
//             {user?.role}
//         </Typography>
//         <IconButton variant="text" color="blue-gray" onClick={toggleOpenRole}>
//             <RiEditLine size={24}/>
//         </IconButton>
//     </section>
//     <Collapse open={openRole}>
//         <Card className="my-4 mx-auto bg-gray-300 shadow-none">
//             <CardBody className=" flex gap-4">
//                 <Select
//                     variant="static"
//                     label="Role"
//                     size="lg"
//                     name="roleSelect"
//                     value={role}
//                     onChange={(value) => setRole(value)}
//                 >
//                     <Option value="Admin">Admin</Option>
//                     <Option value="Manager">Manager</Option>
//                     <Option value="Employee">Employee</Option>
//                 </Select>
//                 {/*<Button color="orange" onClick={(e) => handleSubmit(e, {firstName})}>Save</Button>*/}
//             </CardBody>
//         </Card>
//     </Collapse>
// </section>
// {/*SECTOR*/}
// <section className="w-1/2 pt-3 bg-amber-400    ">
//     <section className="flex items-center gap-6">
//         <Typography variant="h3" color="blue-gray" className="">
//             {user?.sector}
//         </Typography>
//         <IconButton variant="text" color="blue-gray" onClick={toggleOpenSector}>
//             <RiEditLine size={24}/>
//         </IconButton>
//     </section>
//     <Collapse open={openSector}>
//         <Card className="my-4 mx-auto bg-gray-300 shadow-none">
//             <CardBody className=" flex gap-4">
//                 <Select
//                     variant="static"
//                     label="Sector"
//                     size="lg"
//                     name="sectorSelect"
//                     value={sector}
//                     onChange={(value) => setSector(value)}
//                 >
//                     <Option value="Stock">Stock</Option>
//                     <Option value="Customer service">Customer service</Option>
//                     <Option value="Supplier">Supplier</Option>
//                 </Select>
//                 {/*<Button color="orange" onClick={(e) => handleSubmit(e, {firstName})}>Save</Button>*/}
//             </CardBody>
//         </Card>
//     </Collapse>
// </section>