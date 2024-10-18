import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/Project';

export const getAllProjects = async () => {
    try {
        const response = await axios.get(API_BASE_URL);
        return response.data;
    }catch (error) {
        console.error(error);
        throw error;
    }
}

export const getProjectById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${id}`);
        return response.data;
    }catch(error) {
        console.error(error);
        throw error;
    }
}

export const updateProject = async (id,newProject) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/${id}`, newProject, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    }catch (error){
        console.error(error);
        throw error;
    }
}

export const addProject = async (newProject) => {
    try {
        const response = await axios.post(API_BASE_URL, newProject);
        return response.data;
    }catch (error) {
        console.error(error);
        throw error;
    }
}

export const deleteProject = async (id) => {
    try{
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
