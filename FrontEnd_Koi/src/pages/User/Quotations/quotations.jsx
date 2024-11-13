import React, { useEffect, useState } from 'react';
import axiosInstance from "../axiosConfig.jsx";
import { Link } from 'react-router-dom';

const BASE_API_URL = `${import.meta.env.VITE_API_URL}/users/quotations`;

function Quotations() {
    const [quotationData, setQuotationData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchQuotationData = async () => {
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
                    setQuotationData(response.data.data);
                } else {
                    setError("No Quotations found");
                }

                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch quotation data:", error);
                setError('Failed to load Quotations');
                setLoading(false);
            }
        };

        fetchQuotationData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    // Filter out quotations with status "REJECTED"
    const filteredQuotations = quotationData.filter(quotation => quotation.status !== "REJECTED");

    return (
        <div>
            <section className="projects">
                <div className="projects-table-header">CÁC ĐƠN BÁO GIÁ</div>
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
                            <th>Xem</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredQuotations.length > 0 ? (
                            filteredQuotations.map((quotation, index) => (
                                <tr key={quotation.quotationId}>
                                    <td>{index + 1}</td>
                                    <td>{quotation.designDetails || "N/A"}</td>
                                    <td>{quotation.customerName || "N/A"}</td>
                                    <td>{quotation.quotationNumber}</td>
                                    <td>{quotation.serviceType || "N/A"}</td>
                                    <td>{quotation.status || "N/A"}</td>
                                    <td>
                                        <Link
                                            to={`/Quotations/${quotation.quotationId}`}
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
        </div>
    );
}

export default Quotations;
