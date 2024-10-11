import carousel from "bootstrap/js/src/carousel.js";

const API_BASE_URL = 'http://localhost:3000/orders';

export const getOrders = async () =>
{
    try {
    const response =  await fetch(API_BASE_URL);
    if(!response.ok) throw new Error(response.statusText);
    return await response.json();
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getOrdersById = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${id}`);
        if(!response.ok) throw new Error(response.statusText);
        return await response.json();
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const addOrder = async (newOrder) => {
    try {
        const response = await fetch(`${API_BASE_URL}`,{

            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
        },
            body: JSON.stringify({newOrder})
        });
        if(!response.ok) throw new Error(response.statusText);
        return await response.json();
    }catch (error) {
        console.log(error);
        throw error;
    }
}

export const updateOrder = async (id, newOrder) => {
    try{
        const response = await fetch(`${API_BASE_URL}/${id}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({newOrder})
        });
        if(!response.ok) throw new Error(response.statusText);
        return await response.json();
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const deleteOrder = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${id}`,{
            method: 'DELETE',
        });
        if(response.status === 204) {
            console.log('Order deleted successfully');
            return true;
        } else if(response.status === 404) {
            console.log('Order is not found');
            return false;
        } else {
            throw new Error('Error deleting order');
        }
    }catch (error) {
        console.log(error);
        throw error;
    }
}


