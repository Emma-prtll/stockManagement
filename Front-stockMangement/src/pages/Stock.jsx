import StockInfos from "../components/StockInfos.jsx";

const Stock = () => {
    return (
        <>
            <section className=" fixed end-0 w-5/6 p-4 min-h-screen bg-gray-100">
                <section className="h-screen p-2 rounded-xl bg-blue-gray-300 overflow-y-auto grid grid-cols-4 gap-6">
                    <StockInfos />
                    <StockInfos />
                    <StockInfos />
                    <StockInfos />
                    <StockInfos />
                </section>
            </section>
        </>
    );
};

export default Stock;