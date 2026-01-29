import {Card, CardHeader, CardBody, CardFooter, Typography, Input, Checkbox, Button, Spinner} from "@material-tailwind/react";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAuthStore} from "../store/authStore.js";
import {useUserStore} from "../store/userStore.js";
// import {toast} from "react-toastify";
import toast, { Toaster } from 'react-hot-toast';
import {Helmet} from "react-helmet";


const Login = () => {

    //Création des states pour les input du formulaire
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    //Import des states et méthode du authSotre
    const userInfo = useAuthStore((state) => state.userInfo)
    const setCredentials = useAuthStore((state) => state.setCredentials)

    //Import des states et méthode du userStore
    const user = useUserStore((state) => state.user)
    const message = useUserStore((state) => state.message)
    const loading = useUserStore((state) => state.userLoading)
    const login = useUserStore((state) => state.login)

    //Import de méthode de navigation de react
    const navigate = useNavigate()

    useEffect(() => {
        if(userInfo) {
            navigate('/home')
        }
    }, [navigate, userInfo])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await login( {email, password})
            if(user) {
                setCredentials({user})
                navigate('/')
            } else {
                setEmail("")
                setPassword("")
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <section className=" fixed end-0 w-5/6 p-4 h-screen">
            <Helmet>
                <title>Login</title>
            </Helmet>

            <section className="h-full p-2 rounded-xl bg-blue-gray-600 flex items-center justify-center">

            <Card className="w-96  ">
                <CardHeader
                    variant="gradient"
                    color="gray"
                    className="mb-4 grid h-28 place-items-center"
                >
                    <Typography variant="h3" color="white">
                        Sign In
                    </Typography>
                </CardHeader>
                <CardBody className="flex flex-col gap-4">
                    <Input
                        label="Email"
                        size="lg"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        label="Password"
                        size="lg"
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </CardBody>
                <CardFooter className="pt-0 flex justify-center">
                    {loading ? (
                        <>
                            <Spinner className="h-8 w-8"/>
                        </>
                    ) : (
                        <Button variant="gradient" color="gray" className="focus:outline-none" fullWidth onClick={handleSubmit}>
                            Sign In
                        </Button>
                    )}

                </CardFooter>
            </Card>
                </section>
            </section>
    );
};

export default Login;



