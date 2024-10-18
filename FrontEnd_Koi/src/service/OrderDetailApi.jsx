import axios from 'axios'

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