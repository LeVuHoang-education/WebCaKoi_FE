import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css'
import AdminLayout from "./pages/admin/AdminLayout.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import Trangchu from "./pages/Trangchu/Trangchu.jsx";
import UserManage from "./pages/admin/UserManage.jsx";
import OrdersManage from "./pages/admin/OrdersManage.jsx";
import Header from "./components/header.jsx";
import Footer from "./components/footer.jsx";
import ProjectPage from "./pages/Duan/ProjectPage.jsx";
import ProjectDetail from "./pages/Duan/ProjectDetail.jsx";
import PaymentStatus from "./components/admin/SetPaymentStatus.jsx";
import OrdersStatus from "./components/admin/SetOrdersStatus.jsx";
import OrderDetail from "./components/admin/OrderDetail.jsx";
import ProjectManagePages from "./pages/admin/ProjectManage.jsx";



function App() {
  return (
        <div className="App">
        <Router>
            <Routes>
                <Route path="/"  element={
                    <Trangchu />
                } />
                <Route path="/Trangchu" element={
                    <Trangchu />
                } />
                <Route path="/Project" element={
                    <ProjectPage/>
                } />
                <Route path="/project/:projectName" element={<ProjectDetail />} />

                    {/*Phần route dành cho admin*/}
                    <Route path="/Admin/dashboard" element={
                        <AdminLayout>
                             <Dashboard />
                        </AdminLayout>
                    } />

                    <Route path="/Admin/user" element={
                        <AdminLayout>
                            <UserManage />
                        </AdminLayout>
                    } />

                    <Route path="/Admin/orders" element={
                        <AdminLayout>
                            <OrdersManage />
                        </AdminLayout>
                    } />

                    <Route path="/Admin/Projects" element={
                        <AdminLayout>
                            <ProjectManagePages/>
                        </AdminLayout>
                    }/>

                    <Route path="/Admin/PaymentStatus/:id" element={
                        <AdminLayout>
                            <PaymentStatus />
                        </AdminLayout>
                    }/>

                    <Route path="/Admin/OrderStatus/:id" element={
                        <AdminLayout>
                            <OrdersStatus />
                        </AdminLayout>
                    }/>

                    <Route path="/Admin/OrderDetail/:id" element={
                        <AdminLayout>
                            <OrderDetail/>
                        </AdminLayout>
                    }/>

                    <Route path = "/Admin/ProjectManage" element={
                        <AdminLayout>
                            <ProjectManagePages/>
                        </AdminLayout>
                    }/>


            </Routes>
        </Router>

        </div>
  )
}

export default App;
