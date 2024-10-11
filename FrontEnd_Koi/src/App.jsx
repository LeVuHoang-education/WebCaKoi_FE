import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import './App.css'
import AdminLayout from "./pages/admin/AdminLayout.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import Trangchu from "./pages/Trangchu/Trangchu.jsx";
import EditUser from "./pages/admin/EditUser.jsx";
import UserManage from "./pages/admin/UserManage.jsx";


function App() {
  return (
        <div className="App">
            {/* code thanh navbar*/}


        <Router>

            <Routes>
                    <Route path="/"  element={<Trangchu />} />
                    <Route path="Admin/Dashboard" element={
                        <AdminLayout>
                             <Dashboard />
                        </AdminLayout>
                    } />

                    <Route path="Admin/User/:id" element={
                        <AdminLayout>
                            <EditUser />
                        </AdminLayout>
                    } />

                    <Route path="admin/user" element={
                        <AdminLayout>
                            <UserManage />
                        </AdminLayout>
                    } />


                    {/*<Route path="ProjectManage" element={<ProjectManage />} />*/}
                    {/*<Route path="SampleProjects" element={<SampleProjects />} />*/}
                    {/*<Route path="ServiceManage" element={<ServiceManage />} />*/}
                    {/*<Route path="UserManage" element={<UserManage />} />*/}

            </Routes>
        </Router>
        </div>
  )
}

export default App;
