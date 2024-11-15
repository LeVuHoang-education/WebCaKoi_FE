import React, { useEffect, useState } from 'react';
import axiosInstance from "../axiosConfig.jsx";
import { Link } from 'react-router-dom';

const BASE_API_URL = `${import.meta.env.VITE_API_URL}`;

function Projects() {
    const [projectData, setProjectData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [currentOrder, setCurrentOrder] = useState(null);
    const [feedback, setFeedback] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchProjectData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setError("User is not authenticated");
                    setLoading(false);
                    return;
                }

                const response = await axiosInstance.get(`${BASE_API_URL}/users/orders`, {
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

    const submitReview = async () => {
        if (!currentOrder || currentOrder.rating === 0 || feedback.trim() === '') {
            alert("Vui lòng chọn số sao và nhập nội dung đánh giá.");
            return;
        }

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert("Bạn chưa đăng nhập.");
                return;
            }

            const apiEndpoint = isEditing
                ? `${BASE_API_URL}/orders/${currentOrder.orderId}/change-feedback`
                : `${BASE_API_URL}/orders/${currentOrder.orderId}/new-rate`;

            const response = await axiosInstance({
                method: isEditing ? 'PUT' : 'POST',
                url: apiEndpoint,
                headers: { Authorization: `Bearer ${token}` },
                data: { rating: currentOrder.rating, feedback: feedback },
            });

            if (response.status === 200) {
                alert(isEditing ? "Chỉnh sửa đánh giá thành công!" : "Gửi đánh giá thành công!");
                setShowPopup(false); // Đóng popup
                setCurrentOrder(null);
                setFeedback('');
            }
        } catch (error) {
            console.error("Lỗi khi gửi đánh giá:", error);
            alert("Không thể gửi đánh giá. Vui lòng thử lại.");
        }
    };

    const handleRateOrder = async (order) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert("Bạn chưa đăng nhập.");
                return;
            }

            const response = await axiosInstance.get(
                `${BASE_API_URL}/rating/${order.orderId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.data && response.data.data) {
                const { rating, feedback } = response.data.data;
                // Hien du lieu danh gia hien co
                setCurrentOrder({ ...order, rating });
                setFeedback(feedback);
                setIsEditing(true);
            } else {
                setCurrentOrder({ ...order, rating: 0 });
                setFeedback('');
                setIsEditing(false);
            }
            setShowPopup(true);
        } catch (error) {
            console.error("Lỗi khi tải đánh giá:", error);
            alert("Không thể tải đánh giá. Vui lòng thử lại.");
        }
    };

    const closePopup = () => {
        setShowPopup(false);
        setCurrentOrder(null); // Xóa thông tin đơn hàng khi đóng pop-up
    };

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
                        <th>Dịch vụ</th>
                        <th>Trạng thái</th>
                        <th>Hành động</th>
                    </tr>
                    </thead>
                    <tbody>
                    {projectData.length > 0 ? (
                        projectData.map((order, index) => (
                            <tr key={order.orderId}>
                                <td>{index + 1}</td>
                                <td>{order.title || "N/A"}</td>
                                <td>{order.userName || "N/A"}</td>
                                <td>{order.orderNumber}</td>
                                <td>{order.serviceType || "N/A"}</td>
                                <td>{order.status || "N/A"}</td>
                                <td>
                                    <div className="action-buttons">
                                        <Link
                                            to={`/MyOrders/${order.orderId}`}
                                            className="action-button detail-button"
                                            title="Chi tiết đơn hàng"
                                        >
                                            🛈
                                        </Link>
                                        {order.status === "COMPLETED" && (
                                            <button
                                                className="action-button rate-button"
                                                title="Đánh giá đơn hàng"
                                                onClick={() => handleRateOrder(order)}
                                            >
                                                ⭐
                                            </button>
                                        )}
                                    </div>
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

            {/* Pop-up hiển thị khi nhấn nút "Đánh giá" */}
            {showPopup && currentOrder && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <div className="header">
                            {isEditing ? "Chỉnh sửa đánh giá" : "Đánh giá đơn hàng"}
                        </div>
                        <p>Mã đơn: {currentOrder.orderNumber}</p>
                        <div className="rating-stars">
                            {Array.from({ length: 5 }, (_, index) => (
                                <span
                                    key={index}
                                    className={`star ${index < currentOrder.rating ? "selected" : ""}`}
                                    onClick={() => setCurrentOrder({ ...currentOrder, rating: index + 1 })}
                                >
                        ★
                    </span>
                            ))}
                        </div>

                        <textarea
                            placeholder="Nhập đánh giá của bạn tại đây..."
                            rows="5"
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                        ></textarea>

                        <div className="popup-actions">
                            <button onClick={closePopup} className="close-popup">
                                Hủy
                            </button>
                            <button className="submit-review" onClick={submitReview}>
                                {isEditing ? "Cập nhật đánh giá" : "Gửi đánh giá"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

export default Projects;
