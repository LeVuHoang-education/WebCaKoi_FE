import React from 'react';
import {Link} from "react-router-dom";

const AdminNavbar = () => {
    return (

        <header className="flex justify-between items-center p-4">
            <div></div>
            <div className="flex items-center justify-evenly w-1/12 h-auto">
                <Link to="/admin/Dashboard">
                    <img src="/img/icons8-bell-100.png" alt="" className="w-6 h-6"/>
                </Link>
                <Link to="/admin/Dashboard" className="flex items-center justify-evenly">
                    <img src="/img/icons8-letter-100.png" alt="" className="w-6 h-6 "/>
                </Link>
                <Link to="/admin/Dashboard" className="flex items-center justify-evenly">
                    <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                </Link>
            </div>
        </header>
    )
};

export default AdminNavbar;