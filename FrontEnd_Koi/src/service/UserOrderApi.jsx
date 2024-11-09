import axiosInstance from "./axiosConfig.jsx";
const API_BASE_URL = `${import.meta.env.VITE_API_URL}/users/orders`;


export const addOrder = async (newOrder) => {
    try {
        const response = await axiosInstance.post(`${API_BASE_URL}/place`, newOrder);
        return response.data;
    }catch (error) {
        console.error(error);
        throw error;
    }
}

export const updateOrder = async (id, newOrder) => {
    try {
        const response = await axiosInstance.put(`${API_BASE_URL}/${id}`, newOrder);
        return response.data;
    }catch (error) {
        console.error(error);
        throw error;
    }
}


export const deleteOrder = async (id) => {
    try {
        const response = await axiosInstance.delete(`${API_BASE_URL}/${id}`);
        if(response.status === 204 ||response.status === 200) {
            console.log('Order deleted successfully');
            return true;
        }
    }catch (error) {
        if (error.response && error.response.status === 404) {
            console.error('Order is not found');
            return false;
        } else {
            console.error('Error deleting order:', error);
            throw error;
        }
    }
}

