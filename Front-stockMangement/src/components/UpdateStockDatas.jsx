import React from 'react';
import {
    Button,
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader,
    IconButton,
    Input,
    Typography
} from "@material-tailwind/react";
import {useAuthStore} from "../store/authStore.js";
import {useCarStore} from "../store/carStore.js";
import {useParams} from "react-router-dom";

const UpdateStockDatas = () => {

    const car = useCarStore((state) => state.cars)
    const getACar = useCarStore((state) => state.getACar)
    const car_id = useParams().id

    //GESTION DES ROLES
    const userInfo = useAuthStore((state) => state.userInfo);
    const role = userInfo?.user.role;
    const isManager = role === "Manager";
    const isAdmin = role === "Admin";

    const [openData, setOpenData] = React.useState(false);
    const handleOpenData = () => setOpenData(!openData);

    return (
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
                    {/*MORE OR LESS STOCK UPDATE*/}
                    {/*CURRENT STOCK UPDATE*/}
                    <div className="w-80">
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className="mb-1 font-medium"
                        >
                            Current stock
                        </Typography>
                        <div className="relative w-full">
                            <Input
                                type="number"
                                value={car?.currentStock}
                                // onChange={(e) => setCurrentStock(Number(e.target.value))}
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
                                    onClick={() => setValue((cur) => (cur === 0 ? 0 : cur - 1))}
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
                                    onClick={() => setValue((cur) => cur + 1)}
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
                    <div className="w-80">
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className="mb-1 font-medium"
                        >
                            Wish stock
                        </Typography>
                        <div className="relative w-full">
                            <Input
                                type="number"
                                value={car?.wishStock}
                                // onChange={(e) => setCurrentStock(Number(e.target.value))}
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
                                    onClick={() => setValue((cur) => (cur === 0 ? 0 : cur - 1))}
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
                                    onClick={() => setValue((cur) => cur + 1)}
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
                    <div className="w-80">
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className="mb-1 font-medium"
                        >
                            Danger stock
                        </Typography>
                        <div className="relative w-full">
                            <Input
                                type="number"
                                value={car?.dangerStock}
                                // onChange={(e) => setCurrentStock(Number(e.target.value))}
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
                                    onClick={() => setValue((cur) => (cur === 0 ? 0 : cur - 1))}
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
                                    onClick={() => setValue((cur) => cur + 1)}
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
                    {/*MORE OR LESS STOCK UPDATE*/}

                    {/*<Input*/}
                    {/*    type="text"*/}
                    {/*    variant="outlined"*/}
                    {/*    label="Current stock"*/}
                    {/*    name="current"*/}
                    {/*    value={car?.currentStock}*/}
                    {/*    // onChange={(e) => setBrand(e.target.value)}*/}
                    {/*/>*/}
                    {/*<Input*/}
                    {/*    type="text"*/}
                    {/*    variant="outlined"*/}
                    {/*    label="Wish stock"*/}
                    {/*    name="wish"*/}
                    {/*    value={car?.wishStock}*/}
                    {/*    // onChange={(e) => setBrand(e.target.value)}*/}
                    {/*/>*/}
                    {/*<Input*/}
                    {/*    type="text"*/}
                    {/*    variant="outlined"*/}
                    {/*    label="Danger stock"*/}
                    {/*    name="danger"*/}
                    {/*    value={car?.dangerStock}*/}
                    {/*    // onChange={(e) => setBrand(e.target.value)}*/}
                    {/*/>*/}
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

    );
};

export default UpdateStockDatas;