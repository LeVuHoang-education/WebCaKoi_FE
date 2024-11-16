import axiosInstance from "./axiosConfig.jsx";
const API_BASE_URL = `${import.meta.env.VITE_API_URL}/manager/orders`;
const API_BASE_URL = "http://localhost:3000/ordersDetail"

export const getOrderDetail = async (orderID) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${orderID}`);
        return response.data;
    }catch(error) {
        console.error(error);
        throw error;
    }
}