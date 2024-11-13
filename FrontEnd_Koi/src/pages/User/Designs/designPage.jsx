import React, { useState } from 'react';
import Sidebar from '../sidebar.jsx';
import Design from './design.jsx';
import '../user.css';

const designPage = () => {

    return (
        <div>
            <div className="hero" style={{backgroundImage: "url('https://sgl.com.vn/wp-content/uploads/2023/10/banner-chung-chinh-1920-700-e1697443857714.png')"}}>
                <div className="content-banner">
                    <h1 className="title">Xem thiết kế</h1>
                    <div className="breadcrumbs">
                        <ul>
                            <li><a href="/Home">Trang chủ</a></li>
                            <li>&raquo;</li>
                            <li>Xem thiết kế</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="container-user-dashboard">
                <Sidebar />
                <div className="content">
                    <Design />
                </div>
            </div>
        </div>
    );
};

export default designPage;