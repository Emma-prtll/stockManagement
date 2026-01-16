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
import {useNavigate, useParams} from "react-router-dom";
import {useUserStore} from "../store/userStore.js";
import toast from "react-hot-toast";

const UpdateStockInfos = () => {

    const car = useCarStore((state) => state.cars)
    const getACar = useCarStore((state) => state.getACar)
    const updateCar = useCarStore((state) => state.updateItem)
    const deleteCar = useCarStore((state) => state.deleteItem)
    const car_id = useParams().id

    //Suppression de la voiture
    const navigate = useNavigate();

    const handleDelete = async () => {

        if(car._id) {
            const result = await deleteCar(car._id)
            toast.success(result.message)
            navigate("/stock")

            await deleteCar(car._id)

            // toast.success(car.message)
        }
    }

    //GESTION DES ROLES
    const userInfo = useAuthStore((state) => state.userInfo);
    const role = userInfo?.user.role;
    const isManager = role === "Manager";
    const isAdmin = role === "Admin";

    //Dialogue
    const [openCar, setOpenCar] = React.useState(false);
    const handleOpenCar = () => setOpenCar(!openCar);
    const [openDelete, setOpenDelete] = React.useState(false);
    const handleOpenDelete = () => setOpenDelete(!openDelete);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            brand,
            model,
            year,
            type
        }
        try {
            const result = await updateCar(car_id, data)

            await updateCar(car_id, data)
            await getACar(car_id)
            handleOpenCar()
            toast.success(result.message)

            setBrand("")
            setModel("")
            setYear("")
            setType("")

        } catch (err) {
            console.log(err)
            handleOpenCar()
            toast.error(err.message)
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
            {(isAdmin) && (
            <section className=" w-1/2 flex justify-center items-center">
                <Button>
                    {/*<Typography variant="h4" color="white" className="text-center" onClick={() => handleDelete(car?._id)} >*/}
                    <Typography variant="h4" color="white" className="text-center" onClick={handleOpenDelete} >
                        Delete Car
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
                        onChange={(e) => setModel(e.target.value)}
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
                        onChange={(e) => setYear(e.target.value)}
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

        {/* DIALOGUE DE CONFIRMATION DE SUPPRESSION */}
            <Dialog open={openDelete} handler={handleOpenDelete}>
                <DialogHeader>You are about to delete a car ! </DialogHeader>
                <DialogBody className="flex flex-col">
                    You are currently editing this employee’s information.
                    Any change you make will be saved directly to the database.

                    <span className="font-bold">
                    Please make sure all information is correct before making changes.
                    </span>
                    This action affects the employee’s account and responsibilities.

                </DialogBody>
                <DialogFooter className="flex justify-center gap-8">
                    <Button
                        variant="gradient"
                        color="red"
                        onClick={handleOpenDelete}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button
                        variant="gradient"
                        color="red"
                        onClick={handleDelete}
                        className="mr-1"
                    >
                        <span>Agree</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </div>
    );
};

export default UpdateStockInfos;