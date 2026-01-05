import React, {useEffect, useState} from 'react';
import {
    Button,
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader,
    Input,
    Option,
    Select,
    Typography
} from "@material-tailwind/react";
import {useAuthStore} from "../store/authStore.js";
import {useCarStore} from "../store/carStore.js";
import {useParams} from "react-router-dom";
import {useUserStore} from "../store/userStore.js";

const UpdateStockInfos = () => {

    const car = useCarStore((state) => state.cars)
    const getACar = useCarStore((state) => state.getACar)
    // const updateProfile = useUserStore((state) => state.updateProfile)
    const updateCar = useCarStore((state) => state.updateItem)
    const car_id = useParams().id

    //GESTION DES ROLES
    const userInfo = useAuthStore((state) => state.userInfo);
    const role = userInfo?.user.role;
    const isManager = role === "Manager";
    const isAdmin = role === "Admin";

    //Dialogue
    const [openCar, setOpenCar] = React.useState(false);
    const handleOpenCar = () => setOpenCar(!openCar);

    useEffect(() => {
        getACar(car_id)
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            brand,
            model,
            year,
            type
        }
        try {
            await updateCar(car_id, data)
            await getACar(car_id)

            setBrand("")
            setModel("")
            setYear("")
            setType("")

        } catch (err) {
            console.log(err);
        }
    }

    //State pour les inputs
    const [brand, setBrand] = useState("")
    const [model, setModel] = useState("")
    const [type, setType] = useState("")
    const [year, setYear] = useState("")

    return (
        <div className="flex justify-between items-center w-full">
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
                    <div className="flex gap-6  items-center">
                        <Typography className="w-28">
                            {car?.brand}
                        </Typography>
                        <Input
                            type="text"
                            variant="outlined"
                            label="Brand"
                            name="brand"
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
                        />
                    </div>

                    <div className="flex gap-6  items-center">
                        <Typography className="w-28">
                        {car?.model}
                        </Typography>
                    <Input
                        type="text"
                        variant="outlined"
                        label="Model"
                        name="model"
                        value={model}
                        onChange={(e) => setBrand(e.target.value)}
                    />
                    </div>

                    <div className="flex gap-6  items-center">
                        <Typography className="w-28">
                            {car?.year}
                        </Typography>
                    <Input
                        type="text"
                        variant="outlined"
                        label="Year"
                        name="year"
                        value={year}
                        onChange={(e) => setBrand(e.target.value)}
                    />
                    </div>

                    <div className="flex gap-6 items-center">
                        <Typography className="w-28">
                            {car?.type}
                        </Typography>
                    <Select
                        variant="static"
                        label="Type"
                        size="lg"
                        name="type"
                        value={type}
                        onChange={(value) => setType(value)}
                    >

                        <Option value="Sport">Sport</Option>
                        <Option value="SUV">SUV</Option>
                        <Option value="Coupe">Coupe</Option>
                        <Option value="Roadster">Roadster</Option>
                        <Option value="Truck">Truck</Option>
                    </Select>
                    </div>

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
                    <Button variant="text" color="green" onClick={handleSubmit}>
                        <span>Confirm</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </div>
    );
};

export default UpdateStockInfos;