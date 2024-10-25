import React from 'react';
import {Link} from "react-router-dom";

const AdminNavbar = () => {
    return (
            <div className={`w-auto flex justify-between mx-8 p-4`}>
            <div></div>
            <div className="flex items-center justify-evenly w-auto h-auto">
                <Link to="/admin/Dashboard" className={`mx-2`}>
                    <img src="/img/icons8-bell-100.png" alt="" className="w-6 h-6"/>
                </Link>
                <Link to="/admin/Dashboard" className="flex mx-2  items-center justify-evenly">
                    <img src="/img/icons8-letter-100.png" alt="" className="w-6 h-6 "/>
                </Link>
                <Link to="/admin/Dashboard" className="flex mx-2 items-center justify-evenly">
                    <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                </Link>
            </div>
            </div>
    )
};

export default AdminNavbar;