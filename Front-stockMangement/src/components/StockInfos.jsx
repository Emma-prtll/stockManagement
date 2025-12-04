import {Card, CardBody, CardFooter, CardHeader, Typography} from "@material-tailwind/react";
import {FaArrowRightLong} from "react-icons/fa6";
import {useNavigate} from "react-router-dom";

const StockInfos = ({car}) => {

    const navigate = useNavigate();


    return (

        <Card className="w-86 bg-gray-600">
            <CardHeader color="blue-gray" className="relative h-56">
                <img
                    src="https://media.audi.com/is/image/audi/country/ch/assets/models/r8/Audi-R8-5589-1920x1080-2.jpg"
                    alt="card-image"
                    className="w-full h-full object-cover"
                />
            </CardHeader>
            <CardBody className="flex flex-row">
                <section className="w-2/3">
                    <Typography variant="h3" color="blue-gray" className="mb-2">
                        {car?.brand}
                    </Typography>
                    {/*<Typography color="white" className="text-xl pl-4">{car.data.brand}</Typography>*/}
                    <Typography variant="h5" color="blue-gray" className="mb-2">
                        {car?.model} - {car?.year}
                    </Typography>
                    <Typography variant="h5" color="blue-gray" className="mb-2">
                        {car?.type}
                    </Typography>
                </section>
                <section className="w-1/3">
                    <Typography variant="h1" color="blue-gray" >
                        {car?.currentStock}
                    </Typography>
                    <Typography variant="h4" color="blue-gray" >
                        Current stock
                    </Typography>
                </section>
            </CardBody>
            <CardFooter className="pt-0">
                <section className="flex items-center justify-center">
                    <Typography
                        as="button"
                        onClick={() => navigate(`/stockDetails/${car._id}`)}
                        color="black"
                        className="flex items-center bg-gray-300 gap-2 py-3 px-8 rounded-lg font-bold text-sm">
                        MORE INFOS
                        <FaArrowRightLong />
                    </Typography>
                </section>
            </CardFooter>
        </Card>
    );
};

export default StockInfos;