import StockInfos from "../components/StockInfos.jsx";
import { useCarStore } from "../store/carStore"
import {useEffect} from "react";
import {Helmet} from "react-helmet";

const Stock = () => {

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

                <section className="h-screen p-2 rounded-xl bg-blue-gray-300 overflow-y-auto grid grid-cols-4 gap-6">
                    <StockInfos />
                    <StockInfos />
                    <StockInfos />
                    <StockInfos />
                    <StockInfos />
                    {/*<div >*/}
                    {/*    {cars.map((car) => (*/}
                    {/*        <StockInfos key={car._id} car={car} />*/}
                    {/*    ))}*/}
                    {/*</div>*/}
                </section>
            </section>
        </>
    );
};

export default Stock;