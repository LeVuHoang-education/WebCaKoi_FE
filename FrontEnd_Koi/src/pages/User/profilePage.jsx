import React, { useState } from 'react';
import Sidebar from './sidebar.jsx';
import Profile from './personalInfo.jsx';import './user.css';

const userDashboard = () => {

    return (
        <div>
            <div className="hero" style={{backgroundImage: "url('https://sgl.com.vn/wp-content/uploads/2023/10/banner-chung-chinh-1920-700-e1697443857714.png')"}}>
                <div className="content-banner">
                    <h1 className="title">Thông tin cá nhân</h1>
                    <div className="breadcrumbs">
                        <ul>
                            <li><a href="/Home">Trang chủ</a></li>
                            <li>&raquo;</li>
                            <li>Thông tin cá nhân</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="container-user-dashboard">
                <Sidebar />
                <div className="content">
                    <Profile />
                </div>
            </div>
        </div>
    );
};

export default userDashboard;