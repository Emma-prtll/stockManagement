import StockInfos from "../components/StockInfos.jsx";
import { useCarStore } from "../store/carStore"
import {useEffect, useMemo, useRef, useState} from "react";
import {Helmet} from "react-helmet";
import {Toaster} from "react-hot-toast";
import {FaArrowUp} from "react-icons/fa";
import {Typography} from "@material-tailwind/react";

const Stock = () => {
    const [sortBy, setSortBy] = useState("date");

    const cars = useCarStore((state) => state.cars) ?? [];
    const getCars = useCarStore((state) => state.getCars)

    useEffect(() => {
        getCars()
    }, [])

    const topRef = useRef(null);

    // Scroll to top button
    const toTop = () => {
        topRef.current?.scrollIntoView({
            behavior: "smooth",
        })
    }

    // Order cars by date or name
    const sortedCars = useMemo(() => {
        if (!Array.isArray(cars)) return [];

        const carsCopy = [...cars];

        if (sortBy === "name") {
            return carsCopy.sort((a, b) =>
                (a?.brand || "").localeCompare(b?.brand || "")
            );
        }

        if (sortBy === "date") {
            return carsCopy.sort((a, b) =>
                new Date(b?.createdAt || 0) - new Date(a?.createdAt || 0)
            );
        }

        return carsCopy;
    }, [cars, sortBy]);

    return (
        <>
            <section className=" fixed end-0 w-5/6 p-4 min-h-screen bg-gray-100">
                <Helmet>
                    <title>Stock</title>
                </Helmet>
                <Toaster
                    position="top-right"
                    reverseOrder={false}
                />

                <section className="h-dvh rounded-xl overflow-auto flex flex-col justify-center ">

                    <section className="w-full h-20 bg-blue-gray-900 flex justify-center items-center gap-4 shadow-xl shadow-blue-gray-900/40 z-20">
                        <Typography color="white">
                            Sort by :
                        </Typography>
                        <Typography
                            as="a"
                            color="white"
                            className={`p-2 rounded-lg hover:bg-gray-600 transition-all cursor-pointer font-semibold  ${sortBy === "date" ? "bg-amber-900" : "hover:bg-gray-600"}`}
                            onClick={() => setSortBy("date")}
                        >
                            Date
                        </Typography>
                        <Typography
                            as="a"
                            color="white"
                            className={`p-2 rounded-lg hover:bg-gray-600 transition-all cursor-pointer font-semibold  ${sortBy === "name" ? "bg-amber-900" : "hover:bg-gray-600"}`}
                            onClick={() => setSortBy("name")}

                        >
                            Name
                        </Typography>
                    </section>
                    <section className="bg-blue-gray-500 overflow-auto flex justify-center gap-4 p-4 ">
                        <div ref={topRef} />

                        <section className="h-screen rounded-xl gap-4 pt-14 grid grid-cols-3">
                        {sortedCars.map((car, i) => (
                            <div key={i} className="w-96 pb-16">
                                <StockInfos car={car} />
                            </div>
                        ))}
                        </section>

                        <button className="h-10 w-10 bg-amber-900 rounded-3xl absolute right-24 bottom-20 border-4 animate-bounce flex justify-center items-center" onClick={toTop}>
                            <FaArrowUp className="h-6 w-6" color="white"/>
                        </button>
                    </section>
                </section>

            </section>
        </>
    );
};

export default Stock;