import axiosInstance from "./axiosConfig.jsx";
import axios from "axios";
const API_BASE_URL = `${import.meta.env.VITE_API_URL}/manager/users`;

//Lấy dữ liệu User
export const fetchUserApi = async () => {
    try {
        const token = sessionStorage.getItem('token');
        const response = await axiosInstance.get(API_BASE_URL,{
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
//Lấy dữ liệu User theo ID
export const fetchUserByID = async (id) => {
    try {
        const response = await axiosInstance.get(`${API_BASE_URL}/${id}`);
        const data = await response.json();
        return data;
    }catch (error) {
        console.error(error);
        throw error;
    }
}
//Thêm người dùng
export const addUser = async (newUser) => {
    try {
        const response = await axiosInstance.post(API_BASE_URL, newUser);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const updateUser = async (idUser,newInfor) => {
    try{
        const response = await axiosInstance.put(`${API_BASE_URL}/${idUser}`, newInfor);
        return response.data;
    }catch (error) {
        console.error(error);
        throw error;
    }
}

export const updatePassword = async (userId, newPassword) => {
    if (!userId) {
        throw new Error('User ID is required.');
    }
    if (!newPassword) {
        throw new Error('New password is required.');
    }
    try {
        const response = await axiosInstance.patch(`${API_BASE_URL}/${userId}`, {
            password: newPassword,
        });
        console.log('Password updated successfully');
        return response.data;
    } catch (error) {
        console.error('Failed to update password:', error);
        throw error;
    }
};

export const deleteUser = async (idUser) => {
    try {
        const response = await axiosInstance.delete(`${API_BASE_URL}/${idUser}`);
        if (response.status === 204 || response.status === 200) {
            console.log('User deleted successfully.');
            return true;
        } else if (response.status === 404) {
            console.log('User not found.');
            return false;
        } else {
            throw new Error(`Unexpected response: ${response.status} ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
};