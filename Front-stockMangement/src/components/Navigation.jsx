import React from "react";
import NavList from "./NavList.jsx";
import { Typography } from "@material-tailwind/react";

const Navigation = () => {
    return (
        <aside className="fixed top-0 left-0 h-screen w-1/6 bg-amber-900 shadow-lg p-4 flex flex-col rounded-r-xl">
            <Typography variant="h5" color="white" className="mb-6 text-center">
                Mon Tableau de Bord
            </Typography>

            {/* Contenu de la navigation (NavList) */}
            <NavList />
        </aside>
    );
};

export default Navigation;
