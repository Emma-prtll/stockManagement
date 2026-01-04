import React, {useEffect} from 'react';
import StockInfos from "../components/StockInfos.jsx";
import {
    Button,
    ButtonGroup,
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader, Input, Option, Select,
    Typography
} from "@material-tailwind/react";
import {Helmet} from "react-helmet";
import {useCarStore} from "../store/carStore.js";
import {useNavigate, useParams} from "react-router-dom";
import {FaArrowLeftLong, FaArrowRightLong} from "react-icons/fa6";
import {useAuthStore} from "../store/authStore.js";

const StockDetails = () => {

    const navigate = useNavigate();

    const car = useCarStore((state) => state.cars);
    const getACar = useCarStore((state) => state.getACar)
    const car_id = useParams().id

    useEffect(() => {
        getACar(car_id)
    }, [])

    // console.log(car)

    //GESTION DES ROLES
    const userInfo = useAuthStore((state) => state.userInfo);
    const role = userInfo?.user.role;
    const isManager = role === "Manager";
    const isAdmin = role === "Admin";

    //Dialogue
    const [openCar, setOpenCar] = React.useState(false);
    const handleOpenCar = () => setOpenCar(!openCar);

    const [openData, setOpenData] = React.useState(false);
    const handleOpenData = () => setOpenData(!openData);

    return (
        <>
            <Helmet>
                <title>Stock Details</title>
            </Helmet>
            <section className="fixed end-0 w-5/6 p-4 h-screen bg-blue-100">
                <section className="h-full p-2 rounded-xl bg-blue-500">
                    <section>
                        <Typography
                            as="a"
                            href="/stock"
                            color="black"
                            className="flex items-center bg-gray-300 gap-2 py-3 px-8 rounded-lg font-bold text-sm w-36"
                        >
                            <FaArrowLeftLong />
                            BACK
                        </Typography>
                    </section>
                    <section className=" w-full  p-4 flex  flex-row">


                        <section className=" w-8/12 h-96 p-6  ">
                            <section className="  flex  p-4">
                                {/*BASIC INFOS*/}
                                <section className="w-1/2 pt-3">
                                    <Typography variant="h3" color="blue-gray" className="mb-5">
                                        {car?.brand}
                                    </Typography>
                                    <Typography variant="h5" color="blue-gray" className="mb-2">
                                        {car?.model} - {car?.year}
                                    </Typography>
                                    <Typography variant="h5" color="blue-gray" className="mb-2">
                                        {car?.type}
                                    </Typography>
                                </section>
                                {/*BUTTONS | accès unique au MANAGER + ADMIN*/}
                                {(isManager || isAdmin) && (

                                    <section className=" w-1/2 flex justify-center items-center">
                                            {/*<ButtonGroup size="lg">*/}
                                            {/*    <Button className="bg-green-500">More</Button>*/}
                                            {/*    <Button className="bg-red-500">Less</Button>*/}
                                            {/*</ButtonGroup>*/}
                                        <Button>
                                                <Typography variant="h4" color="white" className="text-center" onClick={handleOpenCar}  >
                                                    Edit car
                                                </Typography>
                                        </Button>
                                    </section>
                                )}

                                {/*DIALOG CAR*/}
                                <Dialog open={openCar} handler={handleOpenCar}>
                                <DialogHeader>Modification</DialogHeader>
                                <DialogBody className="flex flex-col gap-6">
                                    <Input
                                        type="text"
                                        variant="outlined"
                                        label="Brand"
                                        name="brand"
                                        value={car?.brand}
                                        // onChange={(e) => setBrand(e.target.value)}
                                    />
                                    <Input
                                        type="text"
                                        variant="outlined"
                                        label="Model"
                                        name="model"
                                        value={car?.model}
                                        // onChange={(e) => setBrand(e.target.value)}
                                    />
                                    <Input
                                        type="text"
                                        variant="outlined"
                                        label="Year"
                                        name="year"
                                        value={car?.year}
                                        // onChange={(e) => setBrand(e.target.value)}
                                    />
                                    <Select
                                        variant="static"
                                        label="Type"
                                        size="lg"
                                        name="type"
                                        value={car?.type}
                                        // onChange={(value) => setType(value)}
                                    >
                                        <Option value="Sport">Sport</Option>
                                        <Option value="SUV">SUV</Option>
                                        <Option value="Coupe">Coupe</Option>
                                        <Option value="Roadster">Roadster</Option>
                                        <Option value="Truck">Truck</Option>
                                    </Select>
                                </DialogBody>
                                <DialogFooter className="flex justify-center gap-8">
                                    <Button
                                        variant="gradient"
                                        color="red"
                                        onClick={handleOpenCar}
                                        className="mr-1"
                                    >
                                        <span>Cancel</span>
                                    </Button>
                                        <Button variant="text" color="green" onClick={handleOpenCar}>
                                            <span>Confirm</span>
                                        </Button>
                                </DialogFooter>
                            </Dialog>


                            </section>
                            <section className=" flex">
                                {/*STOCK INFOS*/}
                                <section className="w-full flex justify-evenly bg-gray-400 rounded-xl p-4">
                                    <section className="w-64 flex justify-center items-center flex-col">
                                        <Typography variant="h1" color="blue-gray" >
                                            {car?.currentStock}
                                        </Typography>
                                        <Typography variant="h4" color="blue-gray" >
                                            Current stock
                                        </Typography>
                                    </section>
                                    <section className="w-64 flex justify-center items-center flex-col">
                                        <Typography variant="h1" color="blue-gray" >
                                            {car?.wishStock}%
                                        </Typography>
                                        <Typography variant="h4" color="blue-gray" className="text-center">
                                            Percentage of the wish
                                        </Typography>
                                    </section>
                                    <section className="w-64 flex justify-center items-center flex-col">
                                        <Typography variant="h1" color="blue-gray" >
                                            {car?.dangerStock}
                                        </Typography>
                                        <Typography variant="h4" color="blue-gray" >
                                            From danger
                                        </Typography>
                                    </section>
                                    <Button variant="text" color="black" className="bg-red-300" onClick={handleOpenData}>
                                        EDIT
                                    </Button>
                                    {/*DIALOG DATAS*/}
                                    <Dialog open={openData} handler={handleOpenData}>
                                        <DialogHeader>Modification</DialogHeader>
                                        <DialogBody className="flex flex-col gap-6">
                                            <Input
                                                type="text"
                                                variant="outlined"
                                                label="Brand"
                                                name="brand"
                                                value={car?.currentStock}
                                                // onChange={(e) => setBrand(e.target.value)}
                                            />
                                            <Input
                                                type="text"
                                                variant="outlined"
                                                label="Brand"
                                                name="brand"
                                                value={car?.wishStock}
                                                // onChange={(e) => setBrand(e.target.value)}
                                            />
                                            <Input
                                                type="text"
                                                variant="outlined"
                                                label="Brand"
                                                name="brand"
                                                value={car?.dangerStock}
                                                // onChange={(e) => setBrand(e.target.value)}
                                            />
                                        </DialogBody>
                                        <DialogFooter className="flex justify-center gap-8">
                                            <Button
                                                variant="gradient"
                                                color="red"
                                                onClick={handleOpenData}
                                                className="mr-1"
                                            >
                                                <span>Cancel</span>
                                            </Button>
                                            <Button variant="text" color="green" onClick={handleOpenData}>
                                                <span>Confirm</span>
                                            </Button>
                                        </DialogFooter>
                                    </Dialog>
                                </section>
                            </section>
                        </section>
                        {/*IMAGE*/}
                        <section className=" w-4/12 h-96 p-6  ">
                            <section className=" w-full h-full ">
                                <img
                                    src="https://media.audi.com/is/image/audi/country/ch/assets/models/r8/Audi-R8-5589-1920x1080-2.jpg"
                                    alt="card-image"
                                    className="w-full h-full object-cover rounded-xl border-2 shadow-xl shadow-blue-gray-900/50"
                                />
                            </section>
                        </section>
                    </section>

                    <section className=" w-full h-1/2 p-6 flex">
                        <section className="bg-yellow-200 w-full rounded-xl ">STOCK MOVEMENT</section>
                    </section>



                    {/*<section className="bg-red-200 w-full h-2/5 p-10 flex">*/}
                    {/*    /!*BASIC INFOS*!/*/}
                    {/*    <section className="w-1/3 bg-green-500">*/}
                    {/*        <Typography variant="h3" color="blue-gray" className="mb-2">*/}
                    {/*            CarName*/}
                    {/*        </Typography>*/}
                    {/*        /!*<Typography color="white" className="text-xl pl-4">{car.data.brand}</Typography>*!/*/}
                    {/*        <Typography variant="h5" color="blue-gray" className="mb-2">*/}
                    {/*            CarModel - year*/}
                    {/*        </Typography>*/}
                    {/*        <Typography variant="h5" color="blue-gray" className="mb-2">*/}
                    {/*            CarType*/}
                    {/*        </Typography>*/}
                    {/*    </section>*/}
                    {/*    /!*BUTTONS*!/*/}
                    {/*    <section className="flex w-max flex-col gap-4">*/}
                    {/*        <ButtonGroup size="lg">*/}
                    {/*            <Button className="bg-green-500">More</Button>*/}
                    {/*            <Button className="bg-red-500">Less</Button>*/}
                    {/*        </ButtonGroup>*/}
                    {/*    </section>*/}
                    {/*</section>*/}

                </section>
            </section>
        </>
    );
};

export default StockDetails;