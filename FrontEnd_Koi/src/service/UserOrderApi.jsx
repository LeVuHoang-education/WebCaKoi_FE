import axiosInstance from "./axiosConfig.jsx";
const API_BASE_URL = `${import.meta.env.VITE_API_URL}/users`;


export const addOrder = async (newOrder) => {
    try {
        const response = await axiosInstance.post(`${API_BASE_URL}/orders/place`, newOrder);
        return response.data;
    }catch (error) {
        console.error(error);
        throw error;
    }
}

export const fetchOrders = async () => {
    try {
        const response = await axiosInstance.get(`${API_BASE_URL}/orders`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};



