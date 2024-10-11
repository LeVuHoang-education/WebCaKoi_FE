import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css'
import AdminLayout from "./pages/admin/AdminLayout.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import Trangchu from "./pages/Trangchu/Trangchu.jsx";
import UserManage from "./pages/admin/UserManage.jsx";
import OrdersManage from "./pages/admin/OrdersManage.jsx";
import Header from "./components/header.jsx";
import Footer from "./components/footer.jsx";


function App() {
  return (
        <div className="App">

        <Router>
            <Routes>
                    <Route path="/"  element={
                        <Trangchu />
                    } />

                    <Route path="Admin/dashboard" element={
                        <AdminLayout>
                             <Dashboard />
                        </AdminLayout>
                    } />

                    <Route path="Admin/user" element={
                        <AdminLayout>
                            <UserManage />
                        </AdminLayout>
                    } />

                    <Route path="Admin/orders" element={
                        <AdminLayout>
                            <OrdersManage />
                        </AdminLayout>
                    } />
            </Routes>
        </Router>
        </div>
  )
}

export default App;
