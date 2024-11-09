import React from 'react';
import Sidebar from "./sidebar.jsx";
import './user.css';
import Orders from "./projects.jsx";

const MyOrderPage = () => {
    return (
        <div>
            <div className="hero" style={{backgroundImage: "url('https://sgl.com.vn/wp-content/uploads/2023/10/banner-chung-chinh-1920-700-e1697443857714.png')"}}>
                <div className="content-banner">
                    <h1 className="title">Đơn đặt hàng</h1>
                    <div className="breadcrumbs">
                        <ul>
                            <li><a href="/Home">Trang chủ</a></li>
                            <li>&raquo;</li>
                            <li>Đơn đặt hàng</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="container-user-dashboard">
                <Sidebar/>
                <div className="content">
                    <Orders />
                </div>
            </div>
        </div>
    );
};

export default MyOrderPage;