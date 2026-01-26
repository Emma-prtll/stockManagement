import React, {useEffect} from 'react';
import StockInfos from "../components/StockInfos.jsx";
import {
    Button,
    ButtonGroup,
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader, IconButton, Input, Option, Select,
    Typography
} from "@material-tailwind/react";
import {Helmet} from "react-helmet";
import {useCarStore} from "../store/carStore.js";
import {useNavigate, useParams} from "react-router-dom";
import {FaArrowLeftLong, FaArrowRightLong} from "react-icons/fa6";
import {useAuthStore} from "../store/authStore.js";
import UpdateStockInfos from "../components/UpdateStockInfos.jsx";
import UpdateStockDatas from "../components/UpdateStockDatas.jsx";
import LinearChart from "../components/LinearChart.jsx";

const StockDetails = () => {

    const navigate = useNavigate();

    const car = useCarStore((state) => state.cars);
    const getACar = useCarStore((state) => state.getACar)
    const car_id = useParams().id

    useEffect(() => {
        getACar(car_id)
    }, [])

    // console.log(car)

    return (
        <>
            <Helmet>
                <title>Stock Details</title>
            </Helmet>
            <section className="fixed end-0 w-5/6 p-4 h-screen">
                <section className="h-full p-2 rounded-xl bg-blue-gray-700">
                    {/*BACK*/}
                    <section>
                        <Typography
                            as="a"
                            href="/stock"
                            color="black"
                            className="flex items-center bg-gray-300 gap-2 py-3 px-8 m-4 rounded-lg font-bold text-sm w-36"
                        >
                            <FaArrowLeftLong /> BACK
                        </Typography>
                    </section>

                    {/*MAIN*/}
                    <section className="w-full flex flex-row h-1/3 mb-12">
                        {/*CAR INFOS*/}
                        <section className=" w-8/12 h-96 px-6  ">
                            <section className="flex flex-row p-4  ">
                                <UpdateStockInfos />
                                <UpdateStockDatas />
                            </section>
                        </section>

                        {/*IMAGE*/}
                        <section className=" w-3/12 h-64 p-6    ">
                            <section className=" w-full h-full ">
                                <img
                                    src="https://media.audi.com/is/image/audi/country/ch/assets/models/r8/Audi-R8-5589-1920x1080-2.jpg"
                                    alt="card-image"
                                    className="w-full h-full object-cover rounded-xl border-2 shadow-xl shadow-blue-gray-900/50"
                                />
                            </section>
                        </section>
                    </section>

                    {/*GRAPH STOCK MOVEMENT*/}
                    <section className=" w-full h-1/2 p-8 flex">
                        <section className="bg-blue-gray-300 w-full rounded-xl p-12 ">STOCK MOVEMENT</section>
                    </section>
                </section>
            </section>
        </>
    );
};

export default StockDetails;