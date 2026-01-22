import {
    Button,
    Card,
    CardBody,
    Collapse,
    IconButton,
    Input,
    Option,
    Select,
    Typography
} from "@material-tailwind/react";
import {FaRegEdit} from "react-icons/fa";
import React, {useEffect, useState} from "react";
import {useAuthStore} from "../store/authStore.js";
import {useUserStore} from "../store/userStore.js";
import {Helmet} from "react-helmet";
import {toast} from "react-toastify";
import {Toaster} from "react-hot-toast";
import isEmail from "validator/lib/isEmail.js";
import isEmpty from "validator/es/lib/isEmpty.js";
import {MdEdit} from "react-icons/md";


const Profile = () => {

    // //State pour les collapse
    // const [openFirstName, setOpenFirstName] = useState(true)
    // const [openLastName, setOpenLastName] = useState(true)
    // const [openEmail, setOpenEmail] = useState(true)
    // const [openPassword, setOpenPassword] = useState(true)
    const [openCollaps, setOpenCollaps] = useState(true)

    //Méthode pour ouvrir ou fermer les collapse
    // const toggleOpenFirstName = () => setOpenFirstName((openFirstName) => !openFirstName)
    // const toggleOpenLastName = () => setOpenLastName((openLastName) => !openLastName)
    // const toggleOpenEmail = () => setOpenEmail((openEmail) => !openEmail)
    // const toggleOpenPassword = () => setOpenPassword((openPassword) => !openPassword)
    const toggleOpenCollaps = () => setOpenCollaps((openCollaps) => !openCollaps)

    //State pour les inputs
    const [firstName, setFirstname] = useState("")
    const [lastName, setLastname] = useState("")
    const [email, setEmail] = useState("")
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")

    //Import des UserInfo depuis "authStore"
    const userInfo = useAuthStore((state) => state.userInfo)
    const updateProfile = useUserStore((state) => state.updateProfile)
    const user = useUserStore((state) => state.user)

    //Import des UserInfo depuis "userStore"
    const message = useUserStore((state) => state.message)

    //Méthode pour modifier notre localStorage après modification de l'utilisateur
    const setCredentials = useAuthStore((state) => state.setCredentials)

    //Utilisé pour mettre à jour le composant si l'utilisateur est modifié
    useEffect(() => {
        if(user) {
            setCredentials({user})
        }
    }, [user, setCredentials])

    //Méthode pour gérer l'update des infos de l'utilisateur
    const handleSubmit = async (e, data) => {
        e.preventDefault()
        if(!isEmpty(email) && !isEmail(email)) {
            toast.error("Email invalide")
            console.log("Email invalide")
        } else {
            try {
                let update = {
                    _id: userInfo.user._id,
                    input: data
                }
                toast.success("fe")
                // toast.success(user.message)

                setFirstname("")
                setLastname("")
                setEmail("")
                setOldPassword("")
                setNewPassword("")
                await updateProfile(update)
            } catch (e) {
                console.log(e)
                toast.error(e.message)
            }
        }
    }

    const [openFirstname, setOpenFirstname] = useState(false)
    const [openLastname, setOpenLastname] = useState(false)
    const [openEmail, setOpenEmail] = useState(false)
    const [openPassword, setOpenPassword] = useState(false)

    return (
        <section className="fixed end-0 w-5/6 p-4 h-screen  overflow-y-auto">
            <Helmet>
                <title>Profile</title>
            </Helmet>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />

            {/*background*/}
            <div className="p-10 rounded-l-xl border  h-full rounded-xl bg-blue-gray-600 ">
                {/*Title*/}
                <Typography className="font-h1 w-full text-center text-3xl pb-12" color="white">My profile</Typography>

                <section className="flex flex-col items-center h-2/3">

                    {/*PERSONAL INFOS*/}
                    <section className="w-3/5 bg-blue-gray-800 rounded-2xl border-2 p-8 shadow-xl mb-4">
                        <Typography className="text-2xl font-bold text-gray-100 mb-6 ">
                            Personal informations
                        </Typography>
                        <section className="flex">
                            <section className="w-1/2 flex flex-col gap-6">
                                {/*FIRSTNAME*/}
                                <section>
                                    <div className="flex items-center gap-4 ">
                                    <Typography className="font-bold text-2xl text-gray-100">Firstname : </Typography>
                                    <Typography className="text-2xl  text-gray-100">{userInfo.user.firstName}</Typography>
                                    <IconButton
                                        onClick={() => setOpenFirstname(!openFirstname)}
                                        className="rounded-3xl bg-amber-900"
                                        size="sm"
                                    >
                                        <MdEdit size={18}  />
                                    </IconButton>
                                    </div>
                                    <Collapse open={openFirstname} className="w-96 pt-3">
                                        <Input
                                            type="text"
                                            variant="outlined"
                                            label="Firstname"
                                            name="firstName"
                                            value={firstName}
                                            onChange={(e) => setFirstname(e.target.value)}
                                            color="white"
                                        />
                                            <Button className="bg-amber-900 mt-3" onClick={(e) => handleSubmit(e, {firstName})}>Save</Button>
                                        </Collapse>
                                </section>

                                {/*LASTNAME*/}
                                <section>
                                    <div className="flex items-center gap-4 ">
                                        <Typography className="font-bold text-2xl text-gray-100">Lastname : </Typography>
                                        <Typography className="text-2xl  text-gray-100">{userInfo.user.lastName}</Typography>
                                        <IconButton
                                            onClick={() => setOpenLastname(!openLastname)}
                                            className="rounded-3xl bg-amber-900"
                                            size="sm"
                                        >
                                            <MdEdit size={18}  />
                                        </IconButton>
                                    </div>
                                    <Collapse open={openLastname} className="w-96 pt-3">
                                        <Input
                                            type="text"
                                            variant="outlined"
                                            label="Lastname"
                                            name="lastName"
                                            value={lastName}
                                            onChange={(e) => setLastname(e.target.value)}
                                            className="text-gray-100"
                                            color="white"
                                        />
                                        <Button className="bg-amber-900 mt-3" onClick={(e) => handleSubmit(e, {lastName})}>Save</Button>
                                    </Collapse>
                                </section>
                            </section>

                            <section className="w-1/2 flex flex-col gap-6">
                                {/*EMAIL*/}
                                <section>
                                    <div className="flex items-center gap-4">
                                        <Typography className="font-bold text-2xl text-gray-100">Email : </Typography>
                                        <Typography className="text-2xl  text-gray-100">{userInfo.user.email}</Typography>
                                        <IconButton
                                            onClick={() => setOpenEmail(!openEmail)}
                                            className="rounded-3xl bg-amber-900"
                                            size="sm"
                                        >
                                            <MdEdit size={18}  />
                                        </IconButton>
                                    </div>
                                    <Collapse open={openEmail} className="w-96 pt-3">
                                        <Input
                                            type="text"
                                            variant="outlined"
                                            label="Email"
                                            name="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="text-gray-100"
                                            color="white"
                                        />
                                        <Button className="bg-amber-900 mt-3" onClick={(e) => handleSubmit(e, {email})}>Save</Button>
                                    </Collapse>
                                </section>

                                {/*PASSWORD*/}
                                <section>
                                    <div className="flex items-center gap-4 ">
                                        <Typography className="font-bold text-2xl text-gray-100">Password : </Typography>
                                        <Typography className="text-2xl  text-gray-100">{userInfo.user.password}</Typography>
                                        <IconButton
                                            onClick={() => setOpenPassword(!openPassword)}
                                            className="rounded-3xl bg-amber-900"
                                            size="sm"
                                        >
                                            <MdEdit size={18}  />
                                        </IconButton>
                                    </div>
                                    <Collapse open={openPassword} className="w-96 pt-3">
                                        <div className="flex flex-col gap-3">
                                        <Input
                                            type="password"
                                            variant="outlined"
                                            label="Old password"
                                            name="old_password"
                                            value={oldPassword}
                                            onChange={(e) => setOldPassword(e.target.value)}
                                            className="text-gray-100"
                                            color="white"
                                        />
                                        <Input
                                            type="password"
                                            variant="outlined"
                                            label="New password"
                                            name="new_password"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            className="text-gray-100"
                                            color="white"
                                        />
                                        </div>
                                        <Button className="bg-amber-900 mt-3" onClick={(e) => handleSubmit(e, {oldPassword, newPassword})}>Save</Button>
                                    </Collapse>
                                </section>
                            </section>
                        </section>
                    </section>

                    {/*PROFESSIONAL INFOS*/}
                    <section className="w-3/5 bg-blue-gray-800 rounded-2xl border-2 p-8 shadow-xl mb-4">
                        <Typography className="text-2xl font-bold text-gray-100 mb-6">
                            Professional informations
                        </Typography>
                        {/*ROLE*/}
                        <section className="flex items-center pb-4">
                            <Typography className="text-xl font-bold text-gray-100">Role : </Typography>
                            <Typography className="text-xl pl-2 text-gray-100">{userInfo.user.role}</Typography>
                        </section>
                        {/*SECTOR*/}
                        <section className="flex items-center pb-4">
                            <Typography className="text-xl font-bold text-gray-100">Sector : </Typography>
                            <Typography className="text-xl pl-2 text-gray-100">{userInfo.user.sector}</Typography>
                        </section>
                    </section>

                </section>

                    {/*from section*/}
                <div className="my-10 flex flex-col items-center border-8 rounded-2xl bg-gray-500 ">
                    {/*firstname et lastname section*/}
                    <div className="flex items-center gap-6  p-2 ">
                        {/*firstname*/}
                        <div className="w-96 ">

                            <div className=" w-full h-12 flex items-center justify-center">
                                <Typography color="white" className="font-bold text-xl">Firstname :</Typography>
                                <Typography color="white" className="text-xl pl-4">{userInfo.user.firstName}</Typography>
                            </div>

                            <Collapse open={openCollaps}>

                            {/*<div className=" w-full ">*/}
                                <Card className="my-4 mx-auto bg-gray-300 shadow-none">
                                    <CardBody className=" flex gap-4">
                                        <Input
                                            type="text"
                                            variant="outlined"
                                            label="Firstname"
                                            name="firstName"
                                            value={firstName}
                                            onChange={(e) => setFirstname(e.target.value)}
                                        />
                                        <Button color="orange" onClick={(e) => handleSubmit(e, {firstName})}>Save</Button>
                                    </CardBody>
                                </Card>
                            {/*</div>*/}
                                </Collapse>
                        </div>

                        {/*lastname*/}
                        <div className="w-96 ">

                            <div className=" w-full h-12 flex items-center justify-center">
                                <Typography color="white" className="font-bold text-xl">Lastname :</Typography>
                                <Typography color="white" className="text-xl pl-4">{userInfo.user.lastName}</Typography>
                            </div>

                            <Collapse open={openCollaps}>
                                <Card className="my-4 mx-auto bg-gray-300 shadow-none">
                                    <CardBody className=" flex gap-4">
                                        <Input
                                            type="text"
                                            variant="outlined"
                                            label="Lastname"
                                            name="lastName"
                                            value={lastName}
                                            onChange={(e) => setLastname(e.target.value)}
                                        />
                                        <Button color="orange" onClick={(e) => handleSubmit(e, {lastName})}>Save</Button>
                                    </CardBody>
                                </Card>
                            </Collapse>

                        </div>
                    </div>

                    {/*email et password section*/}
                    <div className="flex  gap-6  p-2 ">
                        {/*email*/}
                        <div className="w-96 ">

                            <div className=" w-full h-12 flex items-center justify-center">
                                <Typography color="white" className="font-bold text-xl">Email :</Typography>
                                <Typography color="white" className="text-xl pl-4">{userInfo.user.email}</Typography>
                            </div>

                            <Collapse open={openCollaps}>
                                <Card className="my-4 mx-auto bg-gray-300 shadow-none">
                                    <CardBody className=" flex gap-4">
                                        <Input
                                            type="text"
                                            variant="outlined"
                                            label="Email"
                                            name="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                        <Button color="orange" onClick={(e) => handleSubmit(e, {email})}>Save</Button>
                                    </CardBody>
                                </Card>
                            </Collapse>
                        </div>

                        {/*password*/}
                        <div className="w-96 ">

                            <div className=" w-full h-12 flex items-center justify-center">
                                <Typography color="white" className="font-bold text-xl">Password :</Typography>
                                <Typography color="white" className="text-xl pl-4">****</Typography>
                            </div>

                            <Collapse open={openCollaps}>
                                <Card className="my-4 mx-auto bg-gray-300 shadow-none">
                                    <CardBody className=" flex flex-col gap-4">
                                        <Input
                                            type="password"
                                            variant="outlined"
                                            label="Old password"
                                            name="old_password"
                                            value={oldPassword}
                                            onChange={(e) => setOldPassword(e.target.value)}
                                        />
                                        <Input
                                            type="password"
                                            variant="outlined"
                                            label="New password"
                                            name="new_password"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                        />
                                        <Button color="orange" onClick={(e) => handleSubmit(e, {oldPassword, newPassword})}>Save</Button>
                                    </CardBody>
                                </Card>
                            </Collapse>
                        </div>

                    </div>
                </div>
                <div className="flex justify-center items-center gap-6 ">
                    <Button onClick={toggleOpenCollaps} className="bg-red-500">Edit</Button>
                </div>
            </div>
        </section>

    );
};

export default Profile;