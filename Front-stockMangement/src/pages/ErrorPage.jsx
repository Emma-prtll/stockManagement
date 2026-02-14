import {Typography} from "@material-tailwind/react";

const ErrorPage = () => {
    return (
        <section className="fixed end-0 w-5/6 p-4 h-screen overflow-y-auto">
            <div className="rounded-l-xl border h-full rounded-xl bg-blue-gray-600 flex flex-col justify-center items-center gap-12">
                    <img src="/img/icons/Error404.png" alt="Logo" className="w-3/5"/>
                <Typography
                    as="a"
                    href="/"
                    color="white"
                    className="flex items-center bg-amber-900 gap-2 py-3 px-8 m-4 rounded-lg font-bold text-sm "
                >
                    BACK TO DASHBOARD
                </Typography>
            </div>
        </section>
    );
};

export default ErrorPage;