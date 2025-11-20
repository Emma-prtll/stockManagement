import {Button, Card, CardBody, CardFooter, CardHeader, Typography} from "@material-tailwind/react";
import React from 'react';
import {FaArrowRightLong} from "react-icons/fa6";

const StockInfos = () => {
    return (
        <Card className="my-6 w-86 bg-gray-600">
            <CardHeader color="blue-gray" className="relative h-56">
                <img
                    src="https://media.audi.com/is/image/audi/country/ch/assets/models/r8/Audi-R8-5589-1920x1080-2.jpg"
                    alt="card-image"
                    className="w-full h-full object-cover"
                />
            </CardHeader>
            <CardBody className="flex flex-row">
                <section className="w-2/3">
                    <Typography variant="h3" color="blue-gray" className="mb-2">
                        CarName
                    </Typography>
                    <Typography variant="h5" color="blue-gray" className="mb-2">
                        CarModel - year
                    </Typography>
                    <Typography variant="h5" color="blue-gray" className="mb-2">
                        CarType
                    </Typography>
                </section>
                <section className="w-1/3">
                    <Typography variant="h1" color="blue-gray" >
                        04
                    </Typography>
                    <Typography variant="h4" color="blue-gray" >
                        Current stock
                    </Typography>
                </section>
            </CardBody>
            <CardFooter className="pt-0">
                <section className="flex items-center justify-center">
                    <Typography
                        as="a"
                        href="/stockDetails"
                        color="black"
                        className="flex items-center bg-gray-300 gap-2 py-3 px-8 rounded-lg font-bold text-sm">
                        MORE INFOS
                        <FaArrowRightLong />
                    </Typography>
                </section>
            </CardFooter>
        </Card>
    );
};

export default StockInfos;