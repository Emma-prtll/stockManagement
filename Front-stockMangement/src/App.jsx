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
import EmployeeInfos from "./components/EmployeeInfos.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import NotLogged from "./pages/notLogged.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";

function App() {
    return (
        <BrowserRouter>
            <Navigation />
            <Routes>
                {/*EVERYBODY*/}
                <Route path="/login" element={<Login />} />
                <Route path="/notLogged" element={<NotLogged />} />

                {/*IS LOGGED*/}
                <Route path="/" element={ <ProtectedRoute> <Home />  </ProtectedRoute>} />
                <Route path="/stock" element={ <ProtectedRoute> <Stock />  </ProtectedRoute>} />
                <Route path="/profile" element={ <ProtectedRoute> <Profile />  </ProtectedRoute>} />
                <Route path="/stockDetails/:id" element={ <ProtectedRoute> <StockDetails />  </ProtectedRoute>} />

                {/*IS MANAGER OR ADMIN*/}
                <Route path="/addItem" element={  <ProtectedRoute allowedRoles={["Admin", "Manager"]}> <AddItem /> </ProtectedRoute>} />

                {/*IS JUST ADMIN*/}
                <Route path="/admin" element={ <ProtectedRoute allowedRoles={["Admin"]}> <Admin /></ProtectedRoute> }/>
                <Route path="/addItem" element={ <ProtectedRoute allowedRoles={["Admin"]}> <AddItem /></ProtectedRoute> }/>
                <Route path="/register" element={ <ProtectedRoute allowedRoles={["Admin"]}> <Register /></ProtectedRoute> }/>
                <Route path="/employeeInfos" element={ <ProtectedRoute allowedRoles={["Admin"]}> <EmployeeInfos/> </ProtectedRoute> }/>
                <Route path="/employeeEdit/:id" element={ <ProtectedRoute allowedRoles={["Admin"]}> <EmployeeEdit/> </ProtectedRoute> }/>

                {/*EVERYBODY*/}
                <Route path="/*" element={<ErrorPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
