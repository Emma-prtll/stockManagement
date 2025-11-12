import React from 'react';
import {Button, Card, CardBody, CardFooter, Typography} from "@material-tailwind/react";
import {FaArrowRightLong} from "react-icons/fa6";

const EmployeeInfos = () => {
    const TABLE_HEAD = ["Firstname", "Lastname", "Role", "Sector", "Email", "" ];

    const TABLE_ROWS = [
        {
            firstName: "John",
            lastName: "Michael",
            role: "Manager",
            sector: "Stock",
            email: "Michael@gmail.com",
        },
        {
            firstName: "John",
            lastName: "Michael",
            role: "Manager",
            sector: "Stock",
            email: "Michael@gmail.com",
        },
        {
            firstName: "John",
            lastName: "Michael",
            role: "Manager",
            sector: "Stock",
            email: "Michael@gmail.com",
        },
        {
            firstName: "John",
            lastName: "Michael",
            role: "Manager",
            sector: "Stock",
            email: "Michael@gmail.com",
        },
        {
            firstName: "John",
            lastName: "Michael",
            role: "Manager",
            sector: "Stock",
            email: "Michael@gmail.com",
        },
        {
            firstName: "John",
            lastName: "Michael",
            role: "Manager",
            sector: "Stock",
            email: "Michael@gmail.com",
        },
        {
            firstName: "John",
            lastName: "Michael",
            role: "Manager",
            sector: "Stock",
            email: "Michael@gmail.com",
        },
        {
            firstName: "John",
            lastName: "Michael",
            role: "Manager",
            sector: "Stock",
            email: "Michael@gmail.com",
        },
        {
            firstName: "John",
            lastName: "Michael",
            role: "Manager",
            sector: "Stock",
            email: "Michael@gmail.com",
        },
        {
            firstName: "John",
            lastName: "Michael",
            role: "Manager",
            sector: "Stock",
            email: "Michael@gmail.com",
        },
    ];
    return (
        <>
            <Card className="h-full w-full overflow-scroll">
                <table className="w-full min-w-max table-auto text-left">
                    <thead>
                    <tr>
                        {TABLE_HEAD.map((head) => (
                            <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal leading-none opacity-70"
                                >
                                    {head}
                                </Typography>
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {TABLE_ROWS.map(({ firstName, lastName, role, sector, email }, index) => (
                        <tr key={name} className="even:bg-blue-gray-50/50">
                            <td className="p-4">
                                <Typography variant="small" color="blue-gray" className="font-normal">
                                    {firstName}
                                </Typography>
                            </td>
                            <td className="p-4">
                                <Typography variant="small" color="blue-gray" className="font-normal">
                                    {lastName}
                                </Typography>
                            </td>
                            <td className="p-4">
                                <Typography variant="small" color="blue-gray" className="font-normal">
                                    {role}
                                </Typography>
                            </td>
                            <td className="p-4">
                                <Typography variant="small" color="blue-gray" className="font-normal">
                                    {sector}
                                </Typography>
                            </td>
                            <td className="p-4">
                                <Typography variant="small" color="blue-gray" className="font-normal">
                                    {email}
                                </Typography>
                            </td>
                            <td className="p-4">
                                <Typography as="a" href="/employeeEdit" variant="small" color="blue-gray" className="font-medium">
                                    Edit
                                </Typography>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </Card>
        </>
    );
};

export default EmployeeInfos;