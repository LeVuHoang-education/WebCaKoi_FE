import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from "./API/axiosConfig.jsx";
import Sidebar from "./sidebar.jsx";

const BASE_API_URL = `${import.meta.env.VITE_API_URL}/users/orders`;

function formatDateToISO(date) {
    if (!date) return '';
    const [day, month, year] = date.split('-');
    return `${year}-${month}-${day}`;
}

function ProjectDetail() {
    const { orderId } = useParams();
    const [projectDetail, setProjectDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProjectDetail = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axiosInstance.get(`${BASE_API_URL}/${orderId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log("API response:", response.data);
                if (response && response.data && response.data.data) {
                    const data = response.data.data;
                    const formattedData = {
                        ...data,
                        startDate: formatDateToISO(data.startDate),
                        endDate: formatDateToISO(data.endDate),
                    };
                    setProjectDetail(formattedData);
                } else {
                    setError("Failed to load project details");
                }
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch project details:", error);
                setError('Failed to load project details');
                setLoading(false);
            }
        };

        fetchProjectDetail();
    }, [orderId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

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
                    <section className="project-detail">
                        <div className="project-detail-form">
                            <form>
                                <div className="projects-detail-header">Chi Tiết Dự Án</div>
                                <div className="form-group-user-dashboard">
                                    <label htmlFor="name">Họ Tên KH:</label>
                                    <input className="input" type="text" id="name" value={projectDetail?.username || ''} readOnly/>
                                </div>
                                <div className="form-group-user-dashboard">
                                    <label htmlFor="address">Địa Chỉ KH:</label>
                                    <input className="input" type="text" id="address" value={projectDetail?.address || ''} readOnly/>
                                </div>
                                <div className="project-detail-column">
                                    <div className="form-group-user-dashboard half-width">
                                        <label htmlFor="phone">Số Điện Thoại:</label>
                                        <input type="tel" id="phone" value={projectDetail?.userPhone || ''} readOnly/>
                                    </div>
                                    <div className="form-group-user-dashboard half-width">
                                        <label htmlFor="email">Email:</label>
                                        <input type="email" id="email" value={projectDetail?.email || ''} readOnly/>
                                    </div>
                                </div>
                                <div className="project-detail-column">
                                    <div className="form-group-user-dashboard half-width">
                                        <label htmlFor="orderNumber">Order Number:</label>
                                        <input id="orderNumber" value={projectDetail?.orderNumber || ''} readOnly/>
                                    </div>
                                    <div className="form-group-user-dashboard half-width">
                                        <label htmlFor="service">Dịch Vụ:</label>
                                        <input id="service" value={projectDetail?.serviceType || ''} readOnly/>
                                    </div>
                                </div>
                                <div className="form-group-user-dashboard">
                                    <label htmlFor="designDetails">Chi tiết thiết kế:</label>
                                    <textarea id="designDetails" value={projectDetail?.designDetails || ''} readOnly/>
                                </div>
                                <div className="project-detail-column">
                                    <div className="form-group-user-dashboard half-width">
                                        <label htmlFor="start-date">Ngày Khởi Công:</label>
                                        <input type="date" id="start-date" value={projectDetail?.startDate || ''} readOnly/>
                                    </div>
                                    <div className="form-group-user-dashboard half-width">
                                        <label htmlFor="end-date">Ngày Hoàn Thành:</label>
                                        <input type="date" id="end-date" value={projectDetail?.endDate} readOnly/>
                                    </div>
                                </div>
                                <div className="form-group-user-dashboard">
                                    <label htmlFor="status">Trạng Thái Đơn Hàng:</label>
                                    <input className="input" type="text" id="status" value={projectDetail?.status || ''} readOnly/>
                                </div>
                            </form>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default ProjectDetail;
