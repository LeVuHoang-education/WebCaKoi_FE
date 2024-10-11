const API_BASE_URL = 'http://localhost:3000/orders';

export const fetchOrders = async () =>
{
    try {
    const response =  await fetch(`${API_BASE_URL}`);
    if(!response.ok) {
        throw new Error(response.statusText);
    }
    const data = await response.json();
    return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const fetchOrdersById = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${id}`);
        if(!response.ok) {
            throw new Error(response.statusText);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
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
            body: JSON.stringify(newOrder)
        });
        if(!response.ok) {
            throw new Error(response.statusText);
        }
        return await response.json();
    }catch (error) {
        console.error(error);
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
        if(!response.ok) {
            throw new Error(response.statusText);
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const deleteOrder = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${id}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if(response.status === 204 ||response.status === 200) {
            console.log('Order deleted successfully');
            return true;
        } else if(response.status === 404) {
            console.error('Order is not found');
            return false;
        } else {
            throw new Error('Error deleting order');
        }
    }catch (error) {
        console.error(error);
        throw error;
    }
}


