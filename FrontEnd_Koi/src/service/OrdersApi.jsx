import axiosInstance from "./axiosConfig.jsx";
const API_BASE_URL = `${import.meta.env.VITE_API_URL}/manager/orders`;

const token = localStorage.getItem('token');
export const fetchOrders = async () =>
{
    try {
    const response =  await axiosInstance.get(`${API_BASE_URL}`,{
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const fetchOrdersById = async (id) => {
    try {
        const response = await axiosInstance.get(`${API_BASE_URL}/${id}`,{
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
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

export const patchOrder = async (id, value) => {
    try {
        const response = await axiosInstance.patch(`${API_BASE_URL}/change-status/${id}`, value,{
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
