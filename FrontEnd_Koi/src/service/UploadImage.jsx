import axios from 'axios';

const API_BASE_URL = 'http://api.cloudinary.com/v1_1/dhn7dk33o/image/upload';

export const UpLoadImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    formData.append('upload_preset', 'omdptkjt');
    try {
        const response = await axios.post(API_BASE_URL, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        });
        return response.data.secure_url;
    }catch (error) {
        console.error(error);
        throw error;
    }
};
