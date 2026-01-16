import {Button, Dialog, DialogBody, DialogFooter, DialogHeader, IconButton, Input, Option, Select, Typography} from "@material-tailwind/react"
import React, {useEffect, useState} from "react";
import {useCarStore} from "../store/carStore.js";
import {useNavigate} from "react-router-dom";
import {Helmet} from "react-helmet";
import toast, {Toaster} from "react-hot-toast";

const AddItem = () => {
    const [currentStock, setCurrentStock] = useState(0)
    const [wishStock, setWishStock] = useState(0)
    const [dangerStock, setDangerStock] = useState(0)
    const [brand, setBrand] = useState("")
    const [model, setModel] = useState("")
    const [type, setType] = useState("")
    const [year, setYear] = useState("")
    // const [image, setImage] = useState("")
    const addItem = useCarStore((state) => state.addItem)
    const car = useCarStore((state) => state.car)

    //Import de méthode de navigation de react
    const navigate = useNavigate()

    useEffect(() => {
        //Si on a une voiture
        if(car) {
            //Naviguer vers une autre page
            navigate(`/stockDetails/${car.car._id}`)
        }
    }, [car, navigate])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const data = {
            brand, model, type, year, currentStock, wishStock, dangerStock
        };

        try{
            await addItem(data)
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

        // navigate(`/stockDetails/${car._id}`)}
    }

        const [open, setOpen] = React.useState(false);

        const handleOpen = () => setOpen(!open);


    return (
        <>
            <Helmet>
                <title>Add Item</title>
            </Helmet>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            <section className=" fixed end-0 w-5/6 p-4 h-screen bg-blue-100">
                <section className="h-full p-2 rounded-xl bg-blue-100">
                    {/*DIALOG*/}
                    <Dialog open={open} handler={handleOpen}>
                        <DialogHeader>Are you sure ?</DialogHeader>
                        <DialogBody>
                            If you confirm you will lose all the informations you have entered.
                            The registration will not be saved.
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
                            <a href="/home">
                                <Button variant="text" color="green" onClick={handleOpen}>
                                    <span>Confirm</span>
                                </Button>
                            </a>
                        </DialogFooter>
                    </Dialog>

                    {/*TITLE*/}
                    <Typography color="black" className="p-10 w-full mb-4 font-bold text-center text-3xl">Add a new car</Typography>

                    <section className="flex h-2/3 justify-between">
                        {/*PART 1*/}
                        <div className="p-10  h-full w-1/2">
                            <Typography color="black" className="text-2xl font-black pb-6">Car infos</Typography>
                            <div className="flex flex-col gap-6">
                                <Input
                                    variant="static"
                                    label="Brand"
                                    size="lg"
                                    name="brand"
                                    value={brand}
                                    onChange={(e) => setBrand(e.target.value)}
                                />
                                <Input
                                    variant="static"
                                    label="Model"
                                    size="lg"
                                    name="model"
                                    value={model}
                                    onChange={(e) => setModel(e.target.value)}
                                />
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

                                <Input
                                    variant="static"
                                    maxLength={4}
                                    pattern="\d{4}"
                                    label="Year"
                                    size="lg"
                                    name="year"
                                    value={year}
                                    onChange={(e) => setYear(e.target.value)}
                                />
                                <Input
                                    label="Image (disable)"
                                    size="lg"
                                    name="image"
                                    disabled
                                    // value={image}
                                    // onChange={(e) => setImage(e.target.value)}
                                />
                            </div>

                        </div>

                        {/*PART 2*/}
                        <div className="p-10 h-full w-1/2">
                            <Typography color="black" className="text-2xl font-black pb-6">Stock infos</Typography>
                            <div className="flex flex-col">
                                {/*CURRENT STOCK*/}
                                <Typography color="black" className="pb-2">Current stock</Typography>
                                <div className="relative w-full pb-8">
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
                                            variant="text"
                                            className="rounded"
                                            onClick={() => setCurrentStock((cur) => (cur === 0 ? 0 : cur - 1))}
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
                                            variant="text"
                                            className="rounded"
                                            onClick={() => setCurrentStock((cur) => cur + 1)}
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
                                {/*----------------------*/}
                                {/*WISH LIMIT*/}
                                <Typography color="black" className="pb-2">Wish stock</Typography>
                                <div className="relative w-full pb-8">
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
                                            variant="text"
                                            className="rounded"
                                            onClick={() => setWishStock((cur) => (cur === 0 ? 0 : cur - 1))}
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
                                            variant="text"
                                            className="rounded"
                                            onClick={() => setWishStock((cur) => cur + 1)}
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
                                {/*----------------------*/}
                                {/*DANGER LIMIT*/}
                                <Typography color="black" className="pb-2">Danger stock</Typography>
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
                                            variant="text"
                                            className="rounded"
                                            onClick={() => setDangerStock((cur) => (cur === 0 ? 0 : cur - 1))}
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
                                            variant="text"
                                            className="rounded"
                                            onClick={() => setDangerStock((cur) => cur + 1)}
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
                                {/*----------------------*/}
                            </div>
                        </div>
                    </section>
                    <div className="p-4 flex justify-center w-full mt-8 gap-12">
                        <Button color="green" onClick={handleSubmit} >Validate</Button>
                        <Button color="red" onClick={handleOpen}>Cancel</Button>
                    </div>
                </section>
            </section>
        </>
    );
};

export default AddItem;