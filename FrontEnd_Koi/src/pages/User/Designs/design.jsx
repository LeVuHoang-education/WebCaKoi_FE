import React, { useEffect, useState } from 'react';
import axiosInstance from "../axiosConfig.jsx";
import '../user.css';

const BASE_API_URL = `${import.meta.env.VITE_API_URL}/users/designs`;
const BASE_URL = import.meta.env.VITE_API_URL.replace('/api/v1', '');

function DesignForms() {
    const [designForms, setDesignForms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [feedback, setFeedback] = useState('');

    useEffect(() => {
        const fetchDesignForms = async () => {
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
                    setDesignForms(response.data.data);
                } else {
                    setError("No design forms found");
                }

                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch design forms:", error);
                setError('Failed to load design forms');
                setLoading(false);
            }


        };

        fetchDesignForms();
    }, []);

    const handleFeedbackSubmit = async (event, designId) => {
        event.preventDefault();

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setError("User is not authenticated");
                return;
            }

            const response = await axiosInstance.post(
                `${BASE_API_URL}/feedback/${designId}`,
                { customerFeedback: feedback },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (response.status === 200) {
                alert("Feedback submitted successfully!");
                setFeedback('');
            } else {
                alert("Failed to submit feedback");
            }
        } catch (error) {
            console.error("Failed to submit feedback:", error);
            alert("An error occurred while submitting feedback.");
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="design-forms">
            <h1 className="title">Bản Thiết Kế</h1>
            {designForms.length > 0 ? (
                designForms.map((design) => (
                    <div key={design.formId} className="design-card">
                        <div className="info-section">
                            <div>
                                <p className="header">Người gửi:</p>
                                <p>{design.engineerName || "N/A"}</p>
                                <p className="header">Ghi chú:</p>
                                <p>{design.engineerNotes || "N/A"}</p>
                            </div>
                            <div>
                                <p className="header">Ngày tạo:</p>
                                <p>{design.creationDate || "N/A"}</p>
                                <p className="header">Cập nhật ngày:</p>
                                <p>{design.updateDate || "N/A"}</p>
                            </div>
                        </div>
                        <div className="image-section">
                            <img src={`${BASE_URL}/uploads/${design.drawingFile}`}
                                 alt="Design preview"/>
                        </div>
                        <div className="feedback-section">
                            <p className="header">Feedback:</p>
                            <input
                                type="text"
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                                placeholder="Your feedback"
                            />
                            <button
                                className="feedback-submit"
                                onClick={(e) => handleFeedbackSubmit(e, design.recordId)}
                            >
                                <span className="sp">Gửi</span>
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <h2>No designs found</h2>
            )}
        </div>
    );
}

export default DesignForms;
