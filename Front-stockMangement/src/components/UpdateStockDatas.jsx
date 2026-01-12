import React, {useEffect, useState} from 'react';
import {
    Button,
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader,
    IconButton,
    Input, Tooltip,
    Typography
} from "@material-tailwind/react";
import {useAuthStore} from "../store/authStore.js";
import {useCarStore} from "../store/carStore.js";
import {useParams} from "react-router-dom";
import {FaInfoCircle} from "react-icons/fa";

const UpdateStockDatas = () => {

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
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(!open);

    //MORE AND LESS BUTTONS
    useEffect(() => {
        if (car) {
            setCurrentStock(car.currentStock || 0);
            setWishStock(car.wishStock || 0);
            setDangerStock(car.dangerStock || 0);
        }
    }, [car]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            currentStock,
            wishStock,
            dangerStock
        }
        try {
            await updateCar(car_id, data)
            await getACar(car_id)
            handleOpen()

        } catch (err) {
            console.log(err);
        }
    }

    //State pour les inputs
    const [currentStock, setCurrentStock] = useState("")
    const [wishStock, setWishStock] = useState("")
    const [dangerStock, setDangerStock] = useState("")

    //Math
    //WishStock
    const mathWish = car?.currentStock / car?.wishStock
    const percentageWish = Math.floor(mathWish * 100)

    return (
        <section className="w-full flex justify-evenly bg-gray-400 rounded-xl p-4">
            <section className="w-64 flex justify-center items-center flex-col">
                <Typography variant="h1" color="blue-gray" >
                    {car?.currentStock}
                </Typography>
                <Typography variant="h4" color="blue-gray" >
                    Available Units
                </Typography>
            </section>
            <section className="w-64 flex justify-center items-center flex-col">
                <Typography variant="h1" color="blue-gray" >
                    {percentageWish}%
                </Typography>
                <Typography variant="h4" color="blue-gray" className="text-center">
                    Stock Fulfillment
                </Typography>
                <Typography>
                    ({car?.wishStock} is your wish)
                </Typography>
            </section>
            <section className="w-64 flex justify-center items-center flex-col">
                <Typography variant="h1" color="blue-gray" >
                    {car?.dangerStock}
                </Typography>
                <Typography variant="h4" color="blue-gray" >
                    Minimum Safety Stock
                </Typography>
            </section>
            {(isManager || isAdmin) && (
            <Button variant="text" color="black" className="bg-red-300" onClick={handleOpen}>
                Edit Stock Levels
            </Button>
            )}

            {/*DIALOG DATAS*/}
            <Dialog open={open} handler={handleOpen}>
                <DialogHeader>Update Stock Information</DialogHeader>
                <DialogBody className="flex flex-col gap-6">
                    {/*MORE OR LESS STOCK UPDATE*/}
                    {/*CURRENT STOCK UPDATE*/}
                    <div className="w-80 flex flex-wrap">
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className="mb-1 font-medium"
                        >
                            Available Units

                        </Typography>
                        <Tooltip content="Current number of units available in stock" placement="right" className="z-[9999]">
                            <span className="pl-2" ><FaInfoCircle /></span >
                        </Tooltip>

                        <div className="relative w-full">
                            <Input
                                type="number"
                                value={currentStock}
                                onChange={(e) => setCurrentStock(Number(e.target.value))}
                                className="!border-t-blue-gray-200 placeholder:text-blue-gray-300 placeholder:opacity-100  focus:!border-t-gray-900 appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                labelProps={{
                                    className: "before:content-none after:content-none",
                                }}
                                containerProps={{
                                    className: "min-w-0",
                                }}
                            />
                            <div className="absolute right-1 top-1 flex gap-0.5">
                                <IconButton
                                    size="sm"
                                    className="rounded"
                                    onClick={() => setCurrentStock((prev) => Math.max(0, prev - 1))}

                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 16 16"
                                        fill="currentColor"
                                        className="h-4 w-4"
                                    >
                                        <path d="M3.75 7.25a.75.75 0 0 0 0 1.5h8.5a.75.75 0 0 0 0-1.5h-8.5Z" />
                                    </svg>
                                </IconButton>

                                <IconButton
                                    size="sm"
                                    className="rounded"
                                    onClick={() => setCurrentStock((prev) => prev + 1)}

                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 16 16"
                                        fill="currentColor"
                                        className="h-4 w-4"
                                    >
                                        <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
                                    </svg>
                                </IconButton>
                            </div>
                        </div>
                    </div>
                    {/*WISH STOCK UPDATE*/}
                    <div className="w-80 flex flex-wrap">
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className="mb-1 font-medium"
                        >
                            Target Stock Level
                        </Typography>
                        <Tooltip content="Desired stock level used as a reference" placement="right" className="z-[9999]">
                            <span className="pl-2" ><FaInfoCircle /></span >
                        </Tooltip>

                        <div className="relative w-full">
                            <Input
                                type="number"
                                value={wishStock}
                                onChange={(e) => setWishStock(Number(e.target.value))}
                                className="!border-t-blue-gray-200 placeholder:text-blue-gray-300 placeholder:opacity-100  focus:!border-t-gray-900 appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                labelProps={{
                                    className: "before:content-none after:content-none",
                                }}
                                containerProps={{
                                    className: "min-w-0",
                                }}
                            />
                            <div className="absolute right-1 top-1 flex gap-0.5">
                                <IconButton
                                    size="sm"
                                    className="rounded"
                                    onClick={() => setWishStock((prev) => Math.max(0, prev - 1))}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 16 16"
                                        fill="currentColor"
                                        className="h-4 w-4"
                                    >
                                        <path d="M3.75 7.25a.75.75 0 0 0 0 1.5h8.5a.75.75 0 0 0 0-1.5h-8.5Z" />
                                    </svg>
                                </IconButton>

                                <IconButton
                                    size="sm"
                                    className="rounded"
                                    onClick={() => setWishStock((prev) => prev + 1)}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 16 16"
                                        fill="currentColor"
                                        className="h-4 w-4"
                                    >
                                        <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
                                    </svg>
                                </IconButton>
                            </div>
                        </div>
                    </div>

                    {/*DANGER STOCK UPDATE*/}
                    <div className="w-80 flex flex-wrap">
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className="mb-1 font-medium"
                        >
                            Minimum Safety Stock
                        </Typography>
                        <Tooltip content="Minimum quantity required to avoid stock shortages" placement="right" className="z-[9999]">
                            <span className="pl-2" ><FaInfoCircle /></span >
                        </Tooltip>

                        <div className="relative w-full">
                            <Input
                                type="number"
                                value={dangerStock}
                                onChange={(e) => setDangerStock(Number(e.target.value))}
                                className="!border-t-blue-gray-200 placeholder:text-blue-gray-300 placeholder:opacity-100  focus:!border-t-gray-900 appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                labelProps={{
                                    className: "before:content-none after:content-none",
                                }}
                                containerProps={{
                                    className: "min-w-0",
                                }}
                            />
                            <div className="absolute right-1 top-1 flex gap-0.5">
                                <IconButton
                                    size="sm"
                                    className="rounded"
                                    onClick={() => setDangerStock((prev) => Math.max(0, prev - 1))}

                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 16 16"
                                        fill="currentColor"
                                        className="h-4 w-4"
                                    >
                                        <path d="M3.75 7.25a.75.75 0 0 0 0 1.5h8.5a.75.75 0 0 0 0-1.5h-8.5Z" />
                                    </svg>
                                </IconButton>

                                <IconButton
                                    size="sm"
                                    className="rounded"
                                    onClick={() => setDangerStock((prev) => prev + 1)}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 16 16"
                                        fill="currentColor"
                                        className="h-4 w-4"
                                    >
                                        <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
                                    </svg>
                                </IconButton>
                            </div>
                        </div>
                    </div>
                </DialogBody>
                <DialogFooter className="flex justify-center gap-8">
                    <Button
                        variant="gradient"
                        color="red"
                        onClick={handleOpen}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button variant="text" color="green" onClick={handleSubmit}>
                        <span>Save Changes</span>
                    </Button>
                </DialogFooter>
            </Dialog>

        </section>

    );
};

export default UpdateStockDatas;