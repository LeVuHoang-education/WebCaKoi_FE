import React from 'react';
import Sidebar from "../sidebar.jsx";
import '../user.css';
import Quotations from "./quotations.jsx";

const quotationsPage = () => {
    return (
        <div>
            <div className="hero" style={{backgroundImage: "url('https://sgl.com.vn/wp-content/uploads/2023/10/banner-chung-chinh-1920-700-e1697443857714.png')"}}>
                <div className="content-banner">
                    <h1 className="title">Xem báo giá</h1>
                    <div className="breadcrumbs">
                        <ul>
                            <li><a href="/Home">Trang chủ</a></li>
                            <li>&raquo;</li>
                            <li>Xem báo giá</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="container-user-dashboard">
                <Sidebar/>
                <div className="content">
                    <Quotations />
                </div>
            </div>
        </div>
    );
}

export default quotationsPage;