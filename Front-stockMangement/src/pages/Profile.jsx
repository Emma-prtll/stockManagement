import {Button, Card, CardBody, Collapse, IconButton, Input, Typography} from "@material-tailwind/react";
import {FaRegEdit} from "react-icons/fa";
import {useEffect, useState} from "react";
import {useAuthStore} from "../store/authStore.js";
import {useUserStore} from "../store/userStore.js";

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
    const updateUser = useUserStore((state) => state.updateUser)
    const user = useUserStore((state) => state.user)

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
        try {
            let update = {
                _id: userInfo.user._id,
                input: data
            }
            await updateUser(update)
        } catch (e) {
            console.log(e)
        }
    }

    return (

        // <section className="fixed end-0 w-5/6 p-4 h-screen bg-blue-100 overflow-y-auto">
        //     <div
        //         className="p-10 rounded-l-xl border border-purple-100 rounded-xl bg-gradient-to-b from-blue-gray-700 to-black">
        //         <div className="flex justify-center items-center gap-6">
        //             <Typography
        //                 variant="h1"
        //                 color="white"
        //             >
        //                 Mon profil
        //             </Typography>
        //         </div>
        //         <div className="my-10 flex flex-col items-center">
        //             <div className="flex items-center gap-6 border p-2">
        //                 <div className="flex flex-wrap gap-6 justify-between items-center w-96">
        //                     <Typography color="white">Firstname :</Typography>
        //                     <Typography color="white">{userInfo.user.firstName}</Typography>
        //                     <IconButton variant="text" color="yellow" onClick={toggleOpenFirstName}>
        //                         <FaRegEdit size={24}/>
        //                     </IconButton>
        //                     <Collapse open={openFirstName}>
        //                         <Card className="my-4 mx-auto">
        //                             <CardBody className=" flex gap-4">
        //                                 <Input
        //                                     type="text"
        //                                     variant="outlined"
        //                                     label="Firstname"
        //                                     name="firstName"
        //                                     value={firstname}
        //                                     onChange={(e) => setFirstname(e.target.value)}
        //                                 />
        //                                 <Button color="green" onClick={handleSubmit}>Modifier</Button>
        //                             </CardBody>
        //                         </Card>
        //                     </Collapse>
        //                 </div>
        //             </div>
        //             <div className="flex items-center gap-6 border p-2">
        //                 <div className="flex flex-wrap gap-6 justify-between items-center w-96">
        //                     <Typography color="white">Lastname :</Typography>
        //                     <Typography color="white">{userInfo.user.lastName}</Typography>
        //                     <IconButton variant="text" color="yellow" onClick={toggleOpenLastName}>
        //                         <FaRegEdit size={24}/>
        //                     </IconButton>
        //                     <Collapse open={openLastName}>
        //                         <Card className="my-4 mx-auto">
        //                             <CardBody className=" flex gap-4">
        //                                 <Input
        //                                     type="text"
        //                                     variant="outlined"
        //                                     label="Lastname"
        //                                     name="lastname"
        //                                     value={lastname}
        //                                     onChange={(e) => setLastname(e.target.value)}
        //                                 />
        //                                 <Button color="green">Modifier</Button>
        //                             </CardBody>
        //                         </Card>
        //                     </Collapse>
        //                 </div>
        //             </div>
        //             <div className="flex items-center gap-6 border p-2">
        //                 <div className="flex flex-wrap gap-6 justify-between items-center w-96">
        //                     <Typography color="white">Email :</Typography>
        //                     <Typography color="white">{userInfo.user.email}</Typography>
        //                     <IconButton variant="text" color="yellow" onClick={toggleOpenEmail}>
        //                         <FaRegEdit size={24}/>
        //                     </IconButton>
        //                     <Collapse open={openEmail}>
        //                         <Card className="my-4 mx-auto">
        //                             <CardBody className=" flex gap-4">
        //                                 <Input
        //                                     type="email"
        //                                     variant="outlined"
        //                                     label="Email"
        //                                     name="email"
        //                                     value={email}
        //                                     onChange={(e) => setEmail(e.target.value)}
        //                                 />
        //                                 <Button color="green">Modifier</Button>
        //                             </CardBody>
        //                         </Card>
        //                     </Collapse>
        //                 </div>
        //             </div>
        //             <div className="flex items-center gap-6 border p-2">
        //                 <div className="flex flex-wrap gap-6 justify-between items-center w-96">
        //                     <Typography color="white">Password :</Typography>
        //                     <Typography color="white">*******</Typography>
        //                     <IconButton variant="text" color="yellow" onClick={toggleOpenPassword}>
        //                         <FaRegEdit size={24}/>
        //                     </IconButton>
        //                     <Collapse open={openPassword}>
        //                         <Card className="my-4 mx-auto">
        //                             <CardBody className=" flex flex-col gap-4">
        //                                 <Input
        //                                     type="password"
        //                                     variant="outlined"
        //                                     label="Odl password"
        //                                     name="old_password"
        //                                     value={oldPassword}
        //                                     onChange={(e) => setOldPassword(e.target.value)}
        //                                 />
        //                                 <Input
        //                                     type="password"
        //                                     variant="outlined"
        //                                     label="New password"
        //                                     name="new_password"
        //                                     value={newPassword}
        //                                     onChange={(e) => setNewPassword(e.target.value)}
        //                                 />
        //                                 <Button color="green">Modifier</Button>
        //                             </CardBody>
        //                         </Card>
        //                     </Collapse>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </section>

        <section className="fixed end-0 w-5/6 p-4 h-screen  overflow-y-auto">
            {/*background*/}
            <div className="p-10 rounded-l-xl border  h-full rounded-xl bg-gray-300 ">

                {/*Title*/}
                <div className="flex justify-center items-center gap-6 ">
                    <Typography
                        variant="h1"
                        color="black"
                    >
                        Mon profil
                    </Typography>
                </div>

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