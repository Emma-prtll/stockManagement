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

                <section className="h-screen p-2 rounded-xl overflow-auto bg-yellow-700 flex flex-row flex-wrap gap-4 pl-6 py-8">
                        {cars?.map((car) => (
                            <div className="w-96">
                                <StockInfos key={car._id} car={car} />
                            </div>
                        ))}
                </section>
            </section>
        </>
    );
};

export default Stock;