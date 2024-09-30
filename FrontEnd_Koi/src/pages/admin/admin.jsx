import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/NavbarAdmin';
import Sidebar from '../components/SidebarAdmin';
import Footer from '../components/FooterAdmin';

const Admin = () => {
    return (
        <div className="admin">
            <AdminNavbar />
            <div className="main-content">
                <AdminSidebar />
                <div className="content">
                    <Outlet />
                </div>
            </div>
            <FooterAdmin />
        </div>
    );
};

export default Admin;