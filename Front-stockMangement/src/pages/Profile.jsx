import {Button, Collapse, IconButton, Input, Typography} from "@material-tailwind/react";
import {useEffect, useState} from "react";
import {useAuthStore} from "../store/authStore.js";
import {useUserStore} from "../store/userStore.js";
import {Helmet} from "react-helmet";
import isEmail from "validator/lib/isEmail.js";
import isEmpty from "validator/es/lib/isEmpty.js";
import {MdEdit} from "react-icons/md";
import toast, {Toaster} from "react-hot-toast";

const Profile = () => {

    // State for the collaps
    const [openCollaps, setOpenCollaps] = useState(true)
    const toggleOpenCollaps = () => setOpenCollaps((openCollaps) => !openCollaps)

    // State for the inputs
    const [firstName, setFirstname] = useState("")
    const [lastName, setLastname] = useState("")
    const [email, setEmail] = useState("")
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")

    // Import of the UserInfo from "authStore"
    const userInfo = useAuthStore((state) => state.userInfo)
    const updateProfile = useUserStore((state) => state.updateProfile)
    const user = useUserStore((state) => state.user)

    // Methode to update our localStorage after modifying the user
    const setCredentials = useAuthStore((state) => state.setCredentials)

    useEffect(() => {
        if(user) {
            setCredentials({user})
        }
    }, [user, setCredentials])

    //Methode to update the user infos in the database
    const handleSubmit = async (e, data) => {
        e.preventDefault()
        if(mail===true && !isEmpty(email) && !isEmail(email)) {
            toast.error("Email invalide")
            console.log("Email invalide")
        } else {
            try {
                let update = {
                    _id: userInfo.user._id,
                    input: data
                }
                if (data.firstName !== undefined){
                    setFirstname("")
                    setOpenFirstname(!openFirstname)
                }
                if (data.lastName !== undefined) {
                    setLastname("")
                    setOpenLastname(!openLastname)
                }
                if (data.email !== undefined) {
                    setEmail("")
                    setOpenEmail(!openEmail)
                }
                if (data.oldPassword !== undefined) {
                    setOldPassword("")
                    setNewPassword("")
                    setOpenPassword(!openPassword)
                }

                const mess = await updateProfile(update)
                toast.success(mess.message)
                mail=false
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

    let mail = false;

    return (
        <section className="fixed end-0 w-5/6 p-4 h-screen overflow-y-auto">
            <Helmet>
                <title>Profile</title>
            </Helmet>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />

            <div className="p-10 rounded-l-xl border h-full rounded-xl bg-blue-gray-600 ">

                {/*Title*/}
                <Typography className="font-h1 w-full text-center text-3xl pb-12" color="white">My profile</Typography>

                <section className="flex flex-col  items-center h-2/3">
                    {/*PERSONAL INFOS*/}
                    <section className="w-4/5 bg-blue-gray-800 rounded-2xl border-2 p-8 shadow-xl mb-4">
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
                                        className="rounded-3xl bg-blue-gray-800 shadow-none"
                                        size="sm"
                                    >
                                        <MdEdit size={18}/>
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
                                            className="rounded-3xl bg-blue-gray-800 shadow-none"
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
                                            className="rounded-3xl bg-blue-gray-800 shadow-none"
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
                                        <Button className="bg-amber-900 mt-3" onClick={(e) => handleSubmit(e, {email}, mail=true)}>Save</Button>
                                    </Collapse>
                                </section>

                                {/*PASSWORD*/}
                                <section>
                                    <div className="flex items-center gap-4 ">
                                        <Typography className="font-bold text-2xl text-gray-100">Password : </Typography>
                                        <Typography className="text-2xl  text-gray-100">*******</Typography>
                                        <IconButton
                                            onClick={() => setOpenPassword(!openPassword)}
                                            className="rounded-3xl bg-blue-gray-800 shadow-none"
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
                    <section className="w-4/5 bg-blue-gray-800 rounded-2xl border-2 p-8 shadow-xl mb-4">
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
            </div>
        </section>
    );
};

export default Profile;