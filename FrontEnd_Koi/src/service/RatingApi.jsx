import axiosInstance from "./axiosConfig.jsx";
const API_BASE_URL = `${import.meta.env.VITE_API_URL}/manager/rating`;

const token = localStorage.getItem('token');

export const fetchRatings = async () =>{
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

export const deleteRatings = async (ratingId) =>{
    try{
        const response = await axiosInstance.delete(`${API_BASE_URL}/delete/${ratingId}`,{
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    }catch (e){
        console.error(e);
        throw e;
    }
}