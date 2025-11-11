import {Button, Card, CardBody, CardFooter, CardHeader, Input, Select, Typography, Option, Stepper, Step} from "@material-tailwind/react";
import React, {useState} from "react";


const Register = () => {

    // STEPPER
    const [activeStep, setActiveStep] = React.useState(0);
    const [isLastStep, setIsLastStep] = React.useState(false);
    const [isFirstStep, setIsFirstStep] = React.useState(false);

    const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
    const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

    // STATE INPUTS
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("")
    const [sector, setSector] = useState("")

    //SEND BUTTON
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(`Firstname: ${firstName}`)
        console.log(`Lastname: ${lastName}`)
        console.log(`Email: ${email}`)
        console.log(`Password: ${password}`)
        console.log(`Role: ${role}`)
        console.log(`Sector: ${sector}`)
    }

    return (
        <section className=" fixed end-0 w-5/6 p-4 h-screen bg-blue-100 ">
            <section className="h-full p-2 rounded-xl bg-blue-500 flex items-center gap-8">
    {/*TITLE*/}
                <div className="w-5/6 pl-40 absolute top-20 ">
                <CardHeader
                    variant="gradient"
                    color="gray"
                    className="mb-4 grid h-28 place-items-center"
                >
                    <Typography variant="h3" color="white">
                        Add a new employee
                    </Typography>
                </CardHeader>
                </div>
    {/*PERSONAL INFOS*/}
            <Card className="w-3/6">
                <CardBody className="flex flex-col gap-8">
                    <Typography variant="h3" color="blue-gray">
                        Personal informations
                    </Typography>
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

                    <Input
                        label="Password"
                        size="lg"
                        name="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />


                </CardBody>
                {/*<CardFooter className="pt-0">*/}
                {/*    <Button variant="gradient" fullWidth color="gray" type={"submit"}>*/}
                {/*        Validate*/}
                {/*    </Button>*/}
                {/*</CardFooter>*/}
            </Card>
    {/*PROFESSIONAL INFOS*/}
                <Card className="w-3/6">
                    <CardBody className="flex flex-col gap-8">
                        <Typography variant="h3" color="blue-gray">
                            Professionnel informations
                        </Typography>

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

                    </CardBody>
                    <CardFooter className="pt-0">
                        <Button variant="gradient" fullWidth color="gray" type={"submit"} onClick={handleSubmit}>
                            Validate
                        </Button>
                    </CardFooter>
                </Card>


    {/* STEPPER STATE*/}
                <div className="w-4/6 pl-96 absolute bottom-10">
                    <Stepper
                        activeStep={activeStep}
                        isLastStep={(value) => setIsLastStep(value)}
                        isFirstStep={(value) => setIsFirstStep(value)}
                    >
                        <Step onClick={() => setActiveStep(0)}>1</Step>
                        <Step onClick={() => setActiveStep(1)}>2</Step>
                        <Step onClick={() => setActiveStep(2)}>3</Step>
                    </Stepper>
                    <div className="mt-16 flex justify-between">
                        <Button onClick={handlePrev} disabled={isFirstStep}>
                            Prev
                        </Button>
                        <Button onClick={handleNext} disabled={isLastStep}>
                            Next
                        </Button>
                    </div>
                </div>
            </section>
        </section>

    );
};

export default Register;