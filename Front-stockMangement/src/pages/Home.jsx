import {Helmet} from "react-helmet";
import LinearChart from "../components/LinearChart.jsx";
import {Typography} from "@material-tailwind/react";
import {useCarStore} from "../store/carStore.js";
import {useEffect} from "react";
import {IoIosAddCircle} from "react-icons/io";

const Home = () => {

    const cars = useCarStore((state) => state.cars);
    const getCars = useCarStore((state) => state.getCars);

    useEffect(() => {
        getCars();
    }, []);

    // Get the total number of cars in the database
    const totalCars = Array.isArray(cars) ? cars.length : 0;
    console.log(totalCars)

    return (
        <>
            <Helmet>
                <title>Dashboard</title>
            </Helmet>

            <section className="fixed end-0 w-5/6 p-4 h-screen bg-gray-100">
                <section className="h-full p-2 rounded-xl bg-blue-gray-900">
                    {/*TITLE*/}
                    <Typography className="w-full font-h1 p-10 text-center text-3xl" color="white">Dashboard</Typography>
                    <section className="h-2/3 py-28 rounded-xl bg-blue-gray-300 flex justify-evenly items-center">
                        <div className="h-full w-1/5 flex flex-col justify-center items-center gap-6">
                            <div className="w-full h-1/2 rounded-xl bg-blue-gray-900 flex flex-col justify-center items-center gap-4"
                                 style={{ boxShadow: "inset 0 -4px 10px rgb(0, 19, 29)" }}
                            >
                                <Typography className="text-xl font-bold" color="white">There is a total of :</Typography>
                                    <Typography className="text-3xl font-bold" color="white">{totalCars}</Typography>
                                <Typography className="text-xl font-bold" color="white">differents cars</Typography>
                            </div>
                            <div className="w-full h-1/2 rounded-xl bg-blue-gray-900 flex flex-col justify-center items-center gap-4"
                                 style={{ boxShadow: "inset 0 -4px 10px rgb(0, 19, 29)" }}
                            >
                                <Typography className="text-xl font-bold" color="white">Add a new car</Typography>
                                <Typography
                                    as="a"
                                    href="/addItem"
                                    color="white"
                                    className="w-14 text-center p-3 rounded-lg bg-amber-900 hover:bg-gray-400 transition-all cursor-pointer font-semibold shadow-2xl"
                                >
                                    <IoIosAddCircle size={30}/>
                                </Typography>
                            </div>
                        </div>

                        <div className="h-full flex justify-center items-center w-2/3 p-4 rounded-xl bg-blue-gray-900 border-2"
                             style={{ boxShadow: "inset 0 -4px 10px rgb(0, 19, 29)" }}
                        >
                                <LinearChart/>
                        </div>
                    </section>
                    <section className="flex justify-center items-center gap-4 py-16">
                        <Typography
                            as="a"
                            href="/stock"
                            color="white"
                            className="w-64 text-center p-3 rounded-lg bg-amber-900 hover:bg-gray-400 transition-all cursor-pointer font-bold shadow-2xl"
                        >
                            View stock
                        </Typography>
                    </section>

                </section>
            </section>
        </>
    );
};

export default Home;