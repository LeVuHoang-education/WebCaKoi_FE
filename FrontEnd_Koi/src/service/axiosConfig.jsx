import axios from "axios";
import {toast} from "react-toastify";


const BASE_URL = import.meta.env.VITE_API_URL;
console.log('BASE_API_URL:', BASE_URL);
const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    localStorage.removeItem('token');
                    window.location.href = '/';
                    toast.error('Phiên làm việc hết hạn. Vui lòng đăng nhập lại!');
                    break;
                case 403:
                    toast.error('Bạn không có quyền truy cập!');
                    break;
                case 404:
                    if (!error.config.url.includes('/auth/profile')) {
                        toast.error('Không tìm thấy dữ liệu!');
                    }
                    break;
                case 500:
                    toast.error('Lỗi server! Vui lòng thử lại sau.');
                    break;
                default:
                    toast.error(error.response.data?.message || 'Something went wrong');
            }
        }else if(error.request) {
            toast.error('Không thể kết nối đến server. Vui lòng kiểm tra lại kết nối mạng!');
        }else {
            toast.error('Có lỗi xảy ra. Vui lòng thử lại sau!');
        }
        return Promise.reject(error);
    }
);
export default axiosInstance;