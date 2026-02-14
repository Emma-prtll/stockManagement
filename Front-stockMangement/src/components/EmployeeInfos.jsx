import { useEffect } from 'react';
import { Card, Typography } from "@material-tailwind/react";
import {useUserStore} from "../store/userStore.js";

const EmployeeInfos = () => {

    const getUsers = useUserStore((state) => state.getUsers)
    const users = useUserStore((state) => state.users)

    useEffect(() => {
        getUsers();
    }, [])

    // Construction of the table head
    const TABLE_HEAD = ["Firstname", "Lastname", "Role", "Sector", "Email", "" ]

    const safeUsers = Array.isArray(users) ? users : []

    return (
        <Card className="h-full w-full overflow-scroll">
            <table className="w-full min-w-max table-auto text-left">
                <thead>
                <tr>
                    {/*Loop through the table head and create a table header for each column*/}
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
                {/*Loop through the users array and create a table row for each object*/}
                {safeUsers.map((user, index) => (
                    <tr key={index} className="even:bg-blue-gray-50/50">
                        <td className="p-4">
                            <Typography variant="small" color="blue-gray">{user.firstName}</Typography>
                        </td>
                        <td className="p-4">
                            <Typography variant="small" color="blue-gray">{user.lastName}</Typography>
                        </td>
                        <td className="p-4">
                            <Typography variant="small" color="blue-gray">{user.role}</Typography>
                        </td>
                        <td className="p-4">
                            <Typography variant="small" color="blue-gray">{user.sector}</Typography>
                        </td>
                        <td className="p-4">
                            <Typography variant="small" color="blue-gray">{user.email}</Typography>
                        </td>
                        <td className="p-4">
                            <Typography
                                as="a"
                                href={`/employeeEdit/${user._id}`}
                                variant="small"
                                color="blue-gray"
                                className="font-medium"
                            >
                                Edit
                            </Typography>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </Card>
    );
};

export default EmployeeInfos;
