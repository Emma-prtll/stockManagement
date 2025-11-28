import React from 'react';
import StockInfos from "../components/StockInfos.jsx";
import {Button, ButtonGroup, Typography} from "@material-tailwind/react";
import {Helmet} from "react-helmet";

const StockDetails = () => {
    return (
        <>
            <Helmet>
                <title>Stock Details</title>
            </Helmet>
            <section className="fixed end-0 w-5/6 p-4 h-screen bg-blue-100">
                <section className="h-full p-2 rounded-xl bg-blue-500">
                    <section className=" w-full h-1/2 p-4 flex">
                        <section className=" w-8/12 h-full p-6">
                            <section className=" h-1/2 flex">
                                <section className=" w-1/2 pt-3">
                                    <Typography variant="h3" color="blue-gray" className="mb-5">
                                        CarName
                                    </Typography>
                                    {/*<Typography color="white" className="text-xl pl-4">{car.data.brand}</Typography>*/}
                                    <Typography variant="h5" color="blue-gray" className="mb-2">
                                        CarModel - year
                                    </Typography>
                                    <Typography variant="h5" color="blue-gray" className="mb-2">
                                        CarType
                                    </Typography>
                                </section>
                                <section className=" w-1/2 flex justify-center items-center">
                                            <ButtonGroup size="lg">
                                                <Button className="bg-green-500">More</Button>
                                                <Button className="bg-red-500">Less</Button>
                                            </ButtonGroup>
                                </section>
                            </section>
                            <section className=" h-1/2 flex">
                                <section className=" w-full flex justify-evenly bg-gray-400 rounded-xl">
                                    <section className=" w-64 flex justify-center items-center flex-col">
                                        <Typography variant="h1" color="blue-gray" >
                                            04
                                        </Typography>
                                        <Typography variant="h4" color="blue-gray" >
                                            Current stock
                                        </Typography>
                                    </section>
                                    <section className=" w-64 flex justify-center items-center flex-col">
                                        <Typography variant="h1" color="blue-gray" >
                                            60%
                                        </Typography>
                                        <Typography variant="h4" color="blue-gray" className="text-center">
                                            Percentage of the wish
                                        </Typography>
                                    </section>
                                    <section className=" w-64 flex justify-center items-center flex-col">
                                        <Typography variant="h1" color="blue-gray" >
                                            02
                                        </Typography>
                                        <Typography variant="h4" color="blue-gray" >
                                            From danger
                                        </Typography>
                                    </section>
                                </section>
                            </section>
                        </section>
                        <section className=" w-4/12 h-full p-6 ">
                            <section className=" w-full h-full ">
                                <img
                                    src="https://media.audi.com/is/image/audi/country/ch/assets/models/r8/Audi-R8-5589-1920x1080-2.jpg"
                                    alt="card-image"
                                    className="w-full h-full object-cover rounded-xl border-2 shadow-xl shadow-blue-gray-900/50"
                                />
                            </section>
                        </section>
                    </section>

                    <section className="bg-purple-200 w-full h-1/2 p-10 flex">
                        <section className="bg-yellow-200 w-full ">STOCK MOVEMENT</section>
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