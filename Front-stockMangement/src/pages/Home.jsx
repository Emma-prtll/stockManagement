import {Helmet} from "react-helmet";
import LinearChart from "../components/LinearChart.jsx";


const Home = () => {


    return (
        <>
            <Helmet>
                <title>Dashboard</title>
            </Helmet>

            <section className="fixed end-0 w-5/6 p-4 h-screen bg-blue-100">
                <section className="h-full p-2 rounded-xl bg-blue-500">
                    <section className="font-h1 p-10 bg-amber-200 rounded-xl">HOME</section>
                    <section className="flex h-full">
                        <div className="bg-red-200 w-1/3 mb-24"></div>

                        <div className="bg-green-200 w-2/3 mb-24">
                            <div className="bg-amber-400 w-full h-1/2 flex ">
                                <div className="bg-amber-800 w-1/2">fe</div>
                                <div className="bg-red-500 w-1/2">ht</div>
                            </div>
                            <div className="bg-gray-300 w-full h-1/2 flex justify-center items-center"><LinearChart/></div>
                        </div>
                    </section>


                </section>
            </section>
        </>
    );
};

export default Home;