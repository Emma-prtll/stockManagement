import {Badge, Card, CardBody, CardFooter, CardHeader, Typography} from "@material-tailwind/react";
import {FaArrowRightLong} from "react-icons/fa6";
import {useNavigate} from "react-router-dom";
import {FaCheck} from "react-icons/fa";
import {ImCross} from "react-icons/im";
import {CgDanger} from "react-icons/cg";
import {IoAlert, IoAlertOutline} from "react-icons/io5";
const StockInfos = ({car}) => {

    const navigate = useNavigate();

    //CODE COULEURS
    const getStockColor = () => {
        if (car.currentStock >= car.wishStock) {
            return "green"
        }
        else if (car.currentStock < car.wishStock && car.currentStock >= car.dangerStock) {
            return "orange"
        } else {
            return "red"
        }
    }
    const getStockIcon = () => {
        if (car.currentStock >= car.wishStock) {
            return <FaCheck />
        }
        else if (car.currentStock < car.wishStock && car.currentStock >= car.dangerStock) {
            return <IoAlertOutline />
        } else {
            return <ImCross />
        }
    }


    return (

        <Card className="w-86 bg-gray-400">
            <CardHeader color="blue-gray" className="relative h-56 shadow-blue-gray-700">
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
                {/*<section className="w-1/3 bg-gray-400 p-2 rounded-xl">*/}
                {/*<Badge content={getStockIcon()} color={getStockColor()} withBorder>*/}
                    <Badge content={getStockIcon()} color={getStockColor()} withBorder>
                        <section className="flex flex-col justify-center p-2 rounded-xl bg-gradient-to-br from-gray-400 to-blue-gray-300 border-2">
                        <Typography color="blue-gray" className="font-h1 text-center">
                            {car?.currentStock}
                        </Typography>
                        <Typography color="blue-gray" className="text-center">
                            Current stock
                        </Typography>
                    </section>
                </Badge>
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