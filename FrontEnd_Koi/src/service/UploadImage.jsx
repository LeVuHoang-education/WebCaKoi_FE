import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/Image';

export const UpLoadImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await axios.post(API_BASE_URL, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        });
        return response.data.url;
    }catch (error) {
        console.error(error);
        throw error;
    }
};
