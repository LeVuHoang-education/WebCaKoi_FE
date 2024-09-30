import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import './App.css'
import Admin from './pages/admin/Admin';
import Dashboard from "./pages/admin/Dashboard.jsx";


function App() {
  return (
        <div className="App">
            {/* code thanh navbar*/}



            <Routes>
                    <Route path="/"  element={<Homepages />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="Dashboard" element={<Dashboard />} />
                    <Route path="ProjectManage" element={<ProjectManage />} />
                    <Route path="SampleProjects" element={<SampleProjects />} />
                    <Route path="ServiceManage" element={<ServiceManage />} />
                    <Route path="UserManage" element={<UserManage />} />

            </Routes>
        </div>
  )
}

export default App;
