import React, { useEffect, useState } from 'react';
import axiosInstance from "./API/axiosConfig.jsx";
import { Link } from 'react-router-dom';

const BASE_API_URL = `${import.meta.env.VITE_API_URL}/users/orders`;

function Projects() {
    const [projectData, setProjectData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProjectData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setError("User is not authenticated");
                    setLoading(false);
                    return;
                }

                const response = await axiosInstance.get(BASE_API_URL, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response && response.data && response.data.data) {
                    setProjectData(response.data.data);
                } else {
                    setError("No orders found");
                }

                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch project data:", error);
                setError('Failed to load orders');
                setLoading(false);
            }
        };

        fetchProjectData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <section className="projects">
            <div className="projects-table-header">CÁC ĐƠN ĐẶT HÀNG</div>
            <div className="projects-table">
                <table>
                    <thead>
                    <tr>
                        <th>STT</th>
                        <th>Title</th>
                        <th>Tên KH</th>
                        <th>Mã đơn</th>
                        <th>Địa chỉ</th>
                        <th>Trạng thái</th>
                        <th>Xem</th>
                    </tr>
                    </thead>
                    <tbody>
                    {projectData.length > 0 ? (
                        projectData.map((order, index) => (
                            <tr key={order.orderId}>
                                <td>{index + 1}</td>
                                <td>{order.title || "N/A"}</td>
                                <td>{order.username || "N/A"}</td>
                                <td>{order.orderNumber}</td>
                                <td>{order.address || "N/A"}</td>
                                <td>{order.status || "N/A"}</td>
                                <td>
                                    <Link
                                        to={`/MyOrders/${order.orderId}`}
                                        className="projects-detail"
                                    >
                                        Chi tiết
                                    </Link>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8">No orders found</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

export default Projects;
