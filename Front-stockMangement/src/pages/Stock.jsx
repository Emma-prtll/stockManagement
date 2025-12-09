import StockInfos from "../components/StockInfos.jsx";
import { useCarStore } from "../store/carStore"
import {useEffect} from "react";
import {Helmet} from "react-helmet";

const Stock = () => {

    const cars = useCarStore((state) => state.cars);
    const getCars = useCarStore((state) => state.getCars)

    useEffect(() => {
        getCars()
    }, [])


    // const { getCars, cars, carLoading } = useCarStore()
    //
    // useEffect(() => {
    //     getCars()
    // }, [])
    //
    // if (carLoading) return <p>Chargement...</p>
    return (
        <>
            <section className=" fixed end-0 w-5/6 p-4 min-h-screen bg-gray-100">
                <Helmet>
                    <title>Stock</title>
                </Helmet>

                <section className="h-full rounded-xl bg-blue-500 overflow-auto flex justify-center ">

                    {/*<section className="h-screen rounded-xl flex flex-row flex-wrap gap-4 w-5/6 pt-14 justify-center">*/}
                    <section className="h-screen rounded-xl gap-4 pt-14 grid grid-cols-3">
                        {cars?.map((car) => (
                            <div className="w-96 pb-16">
                                <StockInfos key={car._id} car={car} />
                            </div>
                        ))}
                    </section>
                </section>
            </section>
        </>
    );
};

export default Stock;