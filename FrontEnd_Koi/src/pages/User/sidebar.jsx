import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar({ showSection }) {
    const handleLogout = () => {
        localStorage.clear();
        sessionStorage.clear();
        window.location.reload();
    }
    return (
        <aside className="sidebar">
            <ul>
                <li><Link to="/Profile">Thông tin cá nhân</Link></li>
                <li><Link to="/MyOrders">Đơn đặt hàng</Link></li>
            </ul>
            <div className="logout">
                <button href="#" onClick={(e) => {
                    e.preventDefault();
                    handleLogout()
                }}>
                    Đăng xuất
                </button>
            </div>
        </aside>
    );
}

export default Sidebar;
