import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from "../axiosConfig.jsx";
import Sidebar from "../sidebar.jsx";

const BASE_API_URL = `${import.meta.env.VITE_API_URL}/users/quotations`;

function QuotationDetail() {
    const { quotationId } = useParams();
    const [quotationDetail, setQuotationDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchQuotationDetail = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axiosInstance.get(`${BASE_API_URL}/${quotationId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (response && response.data && response.data.data) {
                    const data = response.data.data;
                    setQuotationDetail(data);
                } else {
                    setError("Failed to load quotation details");
                }
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch quotation details:", error);
                setError('Failed to load quotation details');
                setLoading(false);
            }
        };

        fetchQuotationDetail();
    }, [quotationId]);

    const handleAccept = async () => {
        if (window.confirm("Bạn có chắc muốn chấp nhận?")) {
            try {
                const token = localStorage.getItem('token');
                const response = await axiosInstance.post(
                    `${BASE_API_URL}/my-quo/approve/${quotationId}`,
                    { status: "APPROVED", paymentMethod: "MOMO" },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                if (response.status === 200) {
                    alert("Báo giá đã được chấp nhận.");
                    setQuotationDetail(prevDetail => ({
                        ...prevDetail,
                        status: "APPROVED",
                        paymentMethod: "MOMO"
                    }));
                }
            } catch (error) {
                console.error("Failed to approve quotation:", error);
                alert("Có lỗi xảy ra khi chấp nhận báo giá.");
            }
        }
    };

    const handleReject = async () => {
        if (window.confirm("Bạn có chắc muốn từ chối?")) {
            try {
                const token = localStorage.getItem('token');
                const response = await axiosInstance.patch(
                    `${BASE_API_URL}/my-quo/reject/${quotationId}`,
                    {},
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                if (response.status === 200) {
                    alert("Báo giá đã bị từ chối.");
                    setQuotationDetail(prevDetail => ({
                        ...prevDetail,
                        status: "REJECTED"
                    }));
                }
            } catch (error) {
                console.error("Failed to reject quotation:", error);
                alert(error.response?.data?.message || "Có lỗi xảy ra khi từ chối báo giá.");
            }
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <div className="hero"
                 style={{backgroundImage: "url('https://sgl.com.vn/wp-content/uploads/2023/10/banner-chung-chinh-1920-700-e1697443857714.png')"}}>
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
                    <div className="header">
                        <h2>Báo giá #{quotationDetail.quotationNumber}</h2>
                    </div>
                    <div className="customer-info">
                        <div>
                            <p><strong>Khách hàng</strong></p>
                            <p>{quotationDetail.customerName}</p>
                            <p>Email: {quotationDetail.email}</p>
                            <p>Địa chỉ: {quotationDetail.address}</p>
                            <p>SDT: {quotationDetail.phoneNumber}</p>
                        </div>
                        <div>
                            <p>Ngày: {quotationDetail.quotationDate}</p>
                            <p>Có giá trị đến: {quotationDetail.expirationDate}</p>
                            <p>Địa điểm: {quotationDetail.location}</p>
                            <p>Diện tích: {quotationDetail.areaSize} m2</p>
                        </div>
                    </div>
                    <table className="quotation-table">
                        <thead>
                        <tr>
                            <th>Mô tả</th>
                            <th>Số Lượng</th>
                            <th>Đơn giá</th>
                            <th>Thành tiền</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Chi phí vật liệu</td>
                            <td></td>
                            <td></td>
                            <td>{quotationDetail.materialCost}</td>
                        </tr>
                        <tr>
                            <td>Chi phí nhân công</td>
                            <td></td>
                            <td></td>
                            <td>{quotationDetail.laborCost}</td>
                        </tr>
                        <tr>
                            <td>Chi phí vận chuyển</td>
                            <td></td>
                            <td></td>
                            <td>{quotationDetail.transportationCost}</td>
                        </tr>
                        </tbody>
                        <tfoot>
                        <tr>
                            <td colSpan="3"><strong>Tổng cộng:</strong></td>
                            <td><strong>{quotationDetail.totalCost} VNĐ</strong></td>
                        </tr>
                        </tfoot>
                    </table>
                    <div className="footer">
                        <p><strong>Vui lòng xác nhận lựa chọn của bạn:</strong></p>
                        <div className="confirmation">
                            {quotationDetail.status !== 'APPROVED' && quotationDetail.status !== 'REJECTED' && (
                                <>
                                    <button
                                        className="accept"
                                        onClick={handleAccept}
                                    >
                                        <span className="sp">Chấp nhận</span>
                                    </button>
                                    <button
                                        className="reject"
                                        onClick={handleReject}
                                    >
                                        <span className="sp">Từ chối</span>
                                    </button>
                                </>
                            )}
                            {quotationDetail.status === 'APPROVED' && (
                                <p><strong>Bạn đã chấp nhận đơn báo giá</strong></p>
                            )}
                            {quotationDetail.status === 'REJECTED' && (
                                <p><strong>Bạn đã từ chối đơn giá này</strong></p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default QuotationDetail;
