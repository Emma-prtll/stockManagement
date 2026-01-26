import Home from "./pages/Home.jsx";
import Navigation from "./components/Navigation.jsx";
import Profile from "./pages/Profile.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Stock from "./pages/Stock.jsx";
import AddItem from "./pages/AddItem.jsx";
import Admin from "./pages/Admin.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import StockDetails from "./pages/StockDetails.jsx";
import EmployeeEdit from "./pages/EmployeeEdit.jsx";
import {ToastContainer} from "react-toastify"
import EmployeeInfos from "./components/EmployeeInfos.jsx";
import {useAuthStore} from "./store/authStore.js";



function App() {

    return (
        <BrowserRouter >
            <Navigation />
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/stockDetails/:id" element={<StockDetails />} />
                <Route path="/stock" element={<Stock />} />
                <Route path="/addItem" element={<AddItem />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/employeeInfos" element={<EmployeeInfos/>} />
                <Route path="/employeeEdit/:id" element={<EmployeeEdit/>} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
            {/*<ToastContainer theme="dark"/>*/}

        </BrowserRouter>
    )
}

export default App
