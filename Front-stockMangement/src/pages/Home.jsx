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
                    <div className=" p-10 bg-amber-200 rounded-xl">HOME</div>
                    <LinearChart/>
                </section>
            </section>
        </>
    );
};

export default Home;