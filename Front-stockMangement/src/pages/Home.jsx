import {Helmet} from "react-helmet";
import LinearChart from "../components/LinearChart.jsx";
import {Typography} from "@material-tailwind/react";
import React from "react";
import {useCarStore} from "../store/carStore.js";


const Home = () => {


    return (
        <>
            <Helmet>
                <title>Dashboard</title>
            </Helmet>

            <section className="fixed end-0 w-5/6 p-4 h-screen bg-gray-100">
                <section className="h-full p-2 rounded-xl bg-blue-gray-900">
                    {/*TITLE*/}
                    <Typography className="font-h1 p-10 w-full text-center text-3xl" color="white">Dashboard</Typography>
                    <section className="py-28 rounded-xl bg-blue-gray-300 flex justify-center items-center">
                        {/*<div className="flex flex-col justify-center items-center w-1/3 pl-12">*/}
                        {/*    <div className="w-full h-1/2 border-4 rounded-xl"></div>*/}
                        {/*    <div className="w-full h-1/2 border-4 rounded-xl"></div>*/}
                        {/*</div>*/}

                        {/*<div className="flex justify-center items-center w-2/3">*/}
                                <LinearChart/>
                        {/*</div>*/}
                    </section>


                </section>
            </section>
        </>
    );
};

export default Home;