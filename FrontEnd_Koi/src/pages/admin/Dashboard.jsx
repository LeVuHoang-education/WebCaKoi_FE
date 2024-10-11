import React from 'react';

const Dashboard = () => {
    return (
        <div className="dashboard">
            <Navbar />
            <div className="main-content">
                <Sidebar />
                <div className="content">
                    <h1>Dashboard</h1>
                    <div className="stats">
                        <div className="stat-card">
                            <h2>Tổng Dự Án</h2>
                            <p>20</p>
                        </div>
                        <div className="stat-card">
                            <h2>Khách Hàng</h2>
                            <p>150</p>
                        </div>
                        <div className="stat-card">
                            <h2>Doanh Thu</h2>
                            <p>500,000 VNĐ</p>
                        </div>
                    </div>
                    {/* Có thể thêm biểu đồ và các thông tin khác ở đây */}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Dashboard;