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



function App() {

    return (
        <BrowserRouter >
            <Navigation />
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/stockDetails" element={<StockDetails />} />
                <Route path="/stock" element={<Stock />} />
                <Route path="/addItem" element={<AddItem />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
