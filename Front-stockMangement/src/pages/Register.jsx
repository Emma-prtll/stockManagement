import {Button, Input, Select, Typography, Option, Dialog, DialogHeader, DialogBody, DialogFooter, Tooltip} from "@material-tailwind/react";
import {useEffect, useState} from "react";
import {useUserStore} from "../store/userStore.js";
import {Link, useNavigate} from "react-router-dom";
import {Helmet} from "react-helmet";
import toast, { Toaster } from 'react-hot-toast';
import isEmail from 'validator/lib/isEmail';

const Register = () => {

    // State for the inputs
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("")
    const [sector, setSector] = useState("")
    const register = useUserStore((state) => state.register)
    const user = useUserStore((state) => state.user)
    const navigate = useNavigate()


    useEffect(() => {
        //If the user has been created, redirect to the admin page
        if(user) {
            toast.success(user.message)
            navigate(`/admin`)
        }
    }, [user, navigate])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const data = {
            firstName,
            lastName,
            email,
            password,
            role,
            sector
        };
        // Call the store and the function | Catch the error if there is one
        if(!isEmail(email)) {
            toast.error("Email invalide")
        } else {
            try {
                await register(data) // Send the data to the store
            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }
    }

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(!open);

    return (
        <section className=" fixed end-0 w-5/6 p-4 h-screen">
            <Helmet>
                <title>Register</title>
            </Helmet>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            {/*DIALOG*/}
            <Dialog open={open} handler={handleOpen} className="p-4">
                <DialogHeader>Are you sure ?</DialogHeader>
                <DialogBody>
                    If you confirm you will lose all the informations you have entered.
                    The registration will not be saved.
                </DialogBody>
                <DialogFooter className="flex justify-center gap-8">
                    <Button
                        variant="outlined"
                        color="red"
                        onClick={handleOpen}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Link to="/admin">
                        <Button
                            variant="outlined"
                            color="green"
                            onClick={handleOpen}>
                            <span>Confirm</span>
                        </Button>
                    </Link>
                </DialogFooter>
            </Dialog>

            <section className="h-full p-2 rounded-xl bg-blue-gray-700 flex items-center flex-col gap-8 ">
                {/*TITLE*/}
                <Typography className="font-h1 p-10 w-full mb-4 text-center text-3xl" color="white">Add a new employee</Typography>

                {/*FORM*/}
                <section className="gap-2 w-full px-16 rounded-xl ">
                    <section className="gap-3 w-full flex rounded-xl ">
                    {/*PERSONAL INFOS*/}
                    <div className="bg-gray-200 rounded-tl-xl w-1/2 py-10 px-14 flex flex-col gap-4">
                        <Typography variant="h3" color="blue-gray">Personal informations</Typography>
                        <Input
                            label="Firstname"
                            size="lg"
                            name="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />

                        <Input
                            label="Lastname"
                            size="lg"
                            name="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />

                        <Input
                            label="Email"
                            size="lg"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <div className="flex items-center gap-2">
                        <Input
                            label="Password"
                            size="lg"
                            name="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Tooltip
                            content={
                                <div className="w-80">
                                    <Typography color="white" className="font-medium">
                                        Please enter a temporary, simple password.
                                    </Typography>
                                    <Typography
                                        variant="small"
                                        color="white"
                                        className="font-normal opacity-80"
                                    >
                                        This password must be shared with the user and will be changed by them after their first login.
                                    </Typography>
                                </div>
                            }
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                                className="h-5 w-5 cursor-pointer text-blue-gray-700"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                                />
                            </svg>
                        </Tooltip>
                        </div>

                    </div>
                    {/*PROFESSIONAL INFOS*/}
                    <div className="bg-gray-200 rounded-tr-xl w-1/2 py-10 px-14 flex flex-col gap-4">
                        <Typography variant="h3" color="blue-gray">Professionnel informations</Typography>
                        <Select
                            label="Role"
                            size="lg"
                            name="roleSelect"
                            value={role}
                            onChange={(value) => setRole(value)}
                        >
                            <Option value="Admin">Admin</Option>
                            <Option value="Manager">Manager</Option>
                            <Option value="Employee">Employee</Option>
                        </Select>

                        <Select
                            label="Sector"
                            size="lg"
                            name="sectorSelect"
                            value={sector}
                            onChange={(value) => setSector(value)}
                        >
                            <Option value="Stock">Stock</Option>
                            <Option value="Customer service">Customer service</Option>
                            <Option value="Supplier">Supplier</Option>
                        </Select>
                    </div>
                    </section>
                    {/*VALIDATION*/}
                    <div className="bg-gray-200 rounded-b-xl p-8 flex justify-center w-full my-3 gap-12 ">
                         <Button color="red" variant="outlined" onClick={handleOpen}>Cancel</Button>
                         <Button color="green" onClick={handleSubmit} >Validate</Button>
                    </div>
                </section>
            </section>
        </section>

    );
};

export default Register;