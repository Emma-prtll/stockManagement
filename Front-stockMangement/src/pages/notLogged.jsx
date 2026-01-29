import {Card, CardHeader, CardBody, CardFooter, Typography, Input, Checkbox, Button, Spinner} from "@material-tailwind/react";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAuthStore} from "../store/authStore.js";
import {useUserStore} from "../store/userStore.js";
// import {toast} from "react-toastify";
import toast, { Toaster } from 'react-hot-toast';
import {Helmet} from "react-helmet";
import {FaArrowLeftLong, FaArrowRightLong} from "react-icons/fa6";


const Login = () => {

    return (
        <section className=" fixed end-0 w-5/6 p-4 h-screen">
            <Helmet>
                <title>Login</title>
            </Helmet>

            <section className="h-full p-2 rounded-xl bg-blue-gray-900 flex flex-col items-center justify-center">
                <img src="/img/GearStock_LogoDark.png" alt="Logo" className="w-56 mx-auto pb-10" />

                <div className="w-3/5 flex flex-col justify-center items-center">
                    <Typography variant="h1" color="white" className="py-8">
                        Access Restricted
                    </Typography>
                    <Typography color="white" className="text-xl py-8 text-center">
                        You must be logged in to access this application.

                        For your first login, your credentials are provided by an administrator.
                        Once connected, you are required to update your password to ensure the security of your account.

                        If you experience any issues, please contact your administrator.
                    </Typography>
                </div>

                <Typography
                    as="a"
                    href="/login"
                    color="white"
                    className="flex items-center justify-center bg-amber-900 gap-2 py-3 m-6 rounded-lg font-extrabold text-sm w-36"
                >
                    LOGIN <FaArrowRightLong />
                </Typography>

            </section>
        </section>
    );
};

export default Login;



