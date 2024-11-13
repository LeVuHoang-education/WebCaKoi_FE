import React, { useEffect, useState } from 'react';
import axiosInstance from "../axiosConfig.jsx";
import { format } from 'date-fns';

const BASE_API_URL = `${import.meta.env.VITE_API_URL}/users`;

function PersonalInfo() {
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        phone: '',
        dob: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [emailError, setEmailError] = useState(null); // Thêm state để lưu lỗi email
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setError("User is not authenticated");
                    setLoading(false);
                    return;
                }

                const response = await axiosInstance.get(`${BASE_API_URL}/me`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response && response.data && response.data.data) {
                    setUserData({
                        username: response.data.data.username || '',
                        email: response.data.data.email || '',
                        phone: response.data.data.phone || '',
                        dob: response.data.data.dob || ''
                    });
                } else {
                    setError("Invalid user data received");
                }

                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch user data:", error);
                setError('Failed to load user data');
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const updateUser = async (newInfor) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axiosInstance.put(`${BASE_API_URL}/update/me`, newInfor, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            });
            return response.data;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        // Kiểm tra định dạng email
        const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        if (!emailPattern.test(userData.email)) {
            setEmailError("Email phải có định dạng @gmail.com"); // Thiết lập lỗi nếu email sai định dạng
            setSuccess(null);
            return;
        } else {
            setEmailError(null); // Xóa lỗi nếu email đúng định dạng
        }

        try {
            const updatedUserData = { ...userData };

            if (updatedUserData.dob) {
                updatedUserData.dob = format(new Date(updatedUserData.dob), 'dd-MM-yyyy');
            }

            const response = await updateUser(updatedUserData);

            if (response && response.status === 200) {
                setSuccess("Cập nhật thông tin thành công!");
                setError(null);
            }
        } catch (error) {
            console.error("Failed to update user data:", error);
            setError('Không thể cập nhật thông tin');
            setSuccess(null);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div style={{color: 'red'}}>{error}</div>;

    return (
        <section className="personal-info">
            <div className="personal-info-header">THÔNG TIN CÁ NHÂN</div>
            <form className="form-user" onSubmit={handleUpdate} style={{boxShadow: "none", maxWidth: "none"}}>
                <div className="input-box">
                    <label>Tên</label>
                    <div className="input-container">
                        <i className="fas fa-user"></i>
                        <input
                            required
                            value={userData.username}
                            onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                            type="text"
                        />
                    </div>
                </div>
                <div className="column">
                    <div className="input-box">
                        <label>Số điện thoại</label>
                        <div className="input-container">
                            <i className="fas fa-phone"></i>
                            <input
                                required
                                value={userData.phone}
                                onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                                placeholder="Enter phone number"
                                type="tel"
                            />
                        </div>
                    </div>
                    <div className="input-box">
                        <label>Ngày sinh</label>
                        <div className="input-container">
                            <i className="fas fa-calendar-alt"></i>
                            <input
                                required
                                value={userData.dob}
                                onChange={(e) => setUserData({...userData, dob: e.target.value})}
                                placeholder="Enter birth date"
                                type="date"
                            />
                        </div>
                    </div>
                </div>
                <div className="input-box">
                    <label>Email</label>
                    <div className="input-container">
                        <i className="fas fa-envelope"></i>
                        <input
                            required
                            value={userData.email}
                            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                            placeholder="Enter email"
                            type="email"
                        />
                    </div>
                    {emailError && <div style={{color: 'red', marginTop: '5px'}}>{emailError}</div>} {/* Hiển thị lỗi email */}
                </div>
                <button type="submit" onClick={() => {
                    window.confirm("Bạn có chắc muốn cập nhật!")}}>Cập nhật</button>
            </form>

            {success && <div style={{color: 'green', marginTop: '10px'}}>{success}</div>}
        </section>
    );
}

export default PersonalInfo;
