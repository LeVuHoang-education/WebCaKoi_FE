import axios from 'axios'

const API_BASE_URL = 'http://localhost:3000/orders';

export const fetchOrders = async () =>
{
    try {
    const response =  await axios.get(`${API_BASE_URL}`);
    return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const fetchOrdersById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const addOrder = async (newOrder) => {
    try {
        const response = await axios.post(`${API_BASE_URL}`, newOrder , {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    }catch (error) {
        console.error(error);
        throw error;
    }
}

export const updateOrder = async (id, newOrder) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/${id}`, newOrder , {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    }catch (error) {
        console.error(error);
        throw error;
    }
}


export const deleteOrder = async (id) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/${id}`,{
            headers: {
                'Content-Type': 'application/json',
            }
        });
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

export const updateStatusOrders = async (id, status) => {
    try{
        const response = await axios.patch(`${API_BASE_URL}/${id}`, status , {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    }catch (error) {
        console.error(error);
        throw error;
    }
}
