import {Card, CardHeader, CardBody, CardFooter, Typography, Input, Checkbox, Button} from "@material-tailwind/react";
import {useState} from "react";

const Login = () => {

    //Création des states pour les input du formulaire
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(`Email: ${email}`)
        console.log(`Password: ${password}`)
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



