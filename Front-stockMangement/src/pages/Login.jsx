import {Card, CardHeader, CardBody, CardFooter, Typography, Input, Checkbox, Button} from "@material-tailwind/react";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAuthStore} from "../store/authStore.js";
import {useUserStore} from "../store/userStore.js";

const Login = () => {

    //Création des states pour les input du formulaire
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    //Import des states et méthode du authSotre
    const userInfo = useAuthStore((state) => state.userInfo)
    const setCredentials = useAuthStore((state) => state.setCredentials)

    //Import des states et méthode du userStore
    const user = useUserStore((state) => state.user)
    const loading = useUserStore((state) => state.userLoading)
    const login = useUserStore((state) => state.login)

    //Import de méthode de navigation de react
    const navigate = useNavigate()

    useEffect(() => {
        if(userInfo) {
            navigate('/')
        }
    }, [navigate, userInfo])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await login( {email, password})
            if(user) {
                setCredentials({user})
                navigate('/')
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <section className=" fixed end-0 w-5/6 p-4 h-screen bg-blue-100">
            <section className="h-full p-2 rounded-xl bg-blue-500 flex items-center justify-center">


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
                <CardFooter className="pt-0">
                    <Button variant="gradient" fullWidth onClick={handleSubmit}>
                        Sign In
                    </Button>
                </CardFooter>
            </Card>
                </section>
            </section>
    );
};

export default Login;



