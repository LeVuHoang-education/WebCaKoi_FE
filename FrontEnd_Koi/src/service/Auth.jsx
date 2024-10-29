import axios from "axios";
import axiosInstance from "./axiosConfig.jsx";

const BASE_API_URL = `${import.meta.env.VITE_API_URL}/auth`;

export const Login = async (values) => {
    try {
        const response = await axiosInstance.post(`${BASE_API_URL}/login`, values);
        return response.data;
    } catch (error) {
        console.error('Login failed: ', error);
        throw new Error('Đăng nhập không thành công. Vui lòng kiểm tra lại thông tin!');
    }
}

export const Register = async (values) => {
    try {
        const response = await axiosInstance.post(`${BASE_API_URL}/register`, values);
        return response.data;
    } catch (e) {
        console.error('Register failed: ', e.message);
        throw new Error('Đăng ký không thành công. Vui lòng kiểm tra lại thông tin!');
    }
}

export const ConfirmAccount = async (userID, otp) => {
    try {
        const response = await axiosInstance.post(`${BASE_API_URL}/confirm/${userID}`, {
            otpCode: otp
        });
        return response.data;
    } catch (e) {
        console.error('Verify OTP failed: ', e);
        throw new Error('Xác nhận OTP không thành công. Vui lòng kiểm tra lại mã OTP!');
    }
}