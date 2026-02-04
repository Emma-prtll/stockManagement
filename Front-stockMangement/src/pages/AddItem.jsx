import {
    Button,
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader,
    IconButton,
    Input,
    Option,
    Select, Step,
    Stepper,
    Typography
} from "@material-tailwind/react"
import React, {useEffect, useState} from "react";
import {useCarStore} from "../store/carStore.js";
import {Link, useNavigate} from "react-router-dom";
import {Helmet} from "react-helmet";
import toast, {Toaster} from "react-hot-toast";
import isInt from "validator/es/lib/isInt.js";
import isEmail from "validator/lib/isEmail.js";
import {CogIcon, HomeIcon, UserIcon} from "@heroicons/react/16/solid/index.js";
import {FaCar, FaCheck} from "react-icons/fa";
import {FiPackage} from "react-icons/fi";
import isEmpty from "validator/es/lib/isEmpty.js";


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
        }
            try{
                await addItem(data)
            } catch (error) {
                toast.error(error.message)
            }
        }

        const [open, setOpen] = React.useState(false);
        const handleOpen = () => setOpen(!open);

    //STEPPER
    const [activeStep, setActiveStep] = React.useState(0);
    const [isLastStep, setIsLastStep] = React.useState(false);
    const [isFirstStep, setIsFirstStep] = React.useState(false);

    const handleNext = () => {
        if(activeStep === 0) {
            if(!isEmpty(year) && !isInt(year)) {
                toast.error("There is an error ! Year must be a number")
            } else {
                !isLastStep && setActiveStep((cur) => cur + 1)
            }
        } else {
            !isLastStep && setActiveStep((cur) => cur + 1)
        }}

    const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

    return (
        <>
            <Helmet>
                <title>Add Item</title>
            </Helmet>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            <section className=" fixed end-0 w-5/6 p-4 h-screen">
                <section className="h-full p-2 rounded-xl bg-blue-gray-700">
                    {/*DIALOG*/}
                    <Dialog open={open} handler={handleOpen} className="p-4">
                        <DialogHeader>Are you sure ?</DialogHeader>
                        <DialogBody>
                            If you confirm you will lose all the informations you have entered.
                            The registration will not be saved.
                        </DialogBody>
                        <DialogFooter className="flex justify-center gap-8">
                            <Button
                                variant="outlined"
                                color="red"
                                onClick={handleOpen}
                                className="mr-1"
                            >
                                <span>Cancel</span>
                            </Button>
                            <Link to="/home">
                                <Button
                                    variant="outlined"
                                    color="green"
                                    onClick={handleOpen}>
                                    <span>Confirm</span>
                                </Button>
                            </Link>
                        </DialogFooter>
                    </Dialog>

                    {/*TITLE*/}
                    <Typography className="font-h1 p-10 w-full text-center text-3xl" color="white">Add a new car</Typography>

                    <section className="flex justify-center ">
                        {/*PART 1 - CAR INFOS*/}
                        {activeStep === 0 && (
                        <div className="h-full w-1/2 border-4 rounded-xl shadow-xl">
                            <Typography className="font-h1 text-2xl border-6 p-6 rounded-xl" color="white">Car infos</Typography>
                            <div className="flex flex-col gap-6 p-14 bg-gray-200">
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
                            </div>
                        </div>
                        )}

                        {/*PART 2 - STOCK INFOS*/}
                        {activeStep === 1 && (
                            <div className="h-full w-1/2 border-4 rounded-xl shadow-xl">
                                <Typography className="font-h1 text-2xl border-6 p-6 bg-blue-gray-700 rounded-xl" color="white">Stock infos</Typography>
                                <div className="flex flex-col p-14 bg-gray-200">
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
                            </div>
                        </div>
                        )}

                        {/*PART 3 - VALIDATION*/}
                        {activeStep === 2 && (
                            <div className="h-full w-1/2 border-4 rounded-xl shadow-xl bg-gray-200">
                                <div className="bg-blue-gray-700 rounded-t-xl">
                                    <Typography className="font-h1 text-2xl border-6 p-6 pb-2 rounded-xl" color="white">Summery and validation</Typography>
                                    <Typography className="w-4/5 border-6 pl-6 pb-6 rounded-xl" color="white">
                                        Please carefully review the information below before submitting.
                                        Ensure all required fields are completed accurately.
                                        You can navigate back to previous steps to make any necessary corrections.
                                    </Typography>
                                </div>

                                <section className="font-h1 text-2xl border-6 p-6 flex justify-evenly " color="white">
                                    <div className="flex flex-col gap-2 ">
                                        <Typography className="font-h1 pb-2">Car infos</Typography>
                                        <Typography>Brand : {brand}</Typography>
                                        <Typography>Model : {model}</Typography>
                                        <Typography>Type : {type}</Typography>
                                        <Typography>Year : {year}</Typography>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                    <Typography className="font-h1 pb-2">Stock infos</Typography>
                                        <Typography>Current stock : {currentStock}</Typography>
                                        <Typography>Wish stock : {wishStock}</Typography>
                                        <Typography>Danger stock : {dangerStock}</Typography>
                                    </div>

                                </section>
                                <div className="flex justify-center w-full my-4 gap-12 ">
                                    <Button color="red" variant="outlined" onClick={handleOpen}>Cancel</Button>
                                    <Button color="green" onClick={handleSubmit} >Validate</Button>
                                </div>
                            </div>
                        )}
                    </section>

                    {/*STEPPER*/}
                    <section className="flex justify-center w-5/6  fixed bottom-12 right-0 ">
                        <div className="w-3/5 py-4 px-8">
                            <Stepper
                                activeStep={activeStep}
                                isLastStep={(value) => setIsLastStep(value)}
                                isFirstStep={(value) => setIsFirstStep(value)}
                                lineClassName="bg-white/50"
                                activeLineClassName="bg-amber-900"
                            >
                                <Step completedClassName="!bg-amber-900" activeClassName="!bg-amber-900" onClick={() => setActiveStep(0)}>
                                    <FaCar className="h-5 w-5" />
                                </Step>
                                <Step completedClassName="!bg-amber-900" activeClassName="!bg-amber-900" onClick={() => setActiveStep(1)}>
                                    <FiPackage className="h-5 w-5"/>
                                </Step>
                                <Step  completedClassName="!bg-amber-900" activeClassName="!bg-amber-900" onClick={() => setActiveStep(2)}>
                                    <FaCheck className="h-4 w-4"  />
                                </Step>
                            </Stepper>
                            <div className="mt-8 flex justify-between">
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
            </section>
        </>
    );
};

export default AddItem;