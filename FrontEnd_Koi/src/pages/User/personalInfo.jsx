import React, { useEffect, useState } from 'react';
import axiosInstance from "./API/axiosConfig.jsx";
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

        try {
            const updatedUserData = { ...userData };

            if (updatedUserData.dob) {
                updatedUserData.dob = format(new Date(updatedUserData.dob), 'dd-MM-yyyy');
            }

            console.log("Data to be sent:", updatedUserData);

            const response = await updateUser(updatedUserData);

            if (response && response.status === 200) {
                setSuccess("Profile updated successfully!");
                setError(null);
            }
        } catch (error) {
            console.error("Failed to update user data:", error);
            setError('Failed to update user data');
            setSuccess(null);
        }
    };


    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

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
                </div>
                <button type="submit">Update</button>
            </form>

            {success && <div style={{color: 'green', marginTop: '10px'}}>{success}</div>}
        </section>
    );
}

export default PersonalInfo;
