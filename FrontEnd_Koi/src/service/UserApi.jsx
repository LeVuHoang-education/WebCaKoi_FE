``// const API_BASE_URL = 'http://localhost:8080/api/user';

const API_BASE_URL = 'http://localhost:3000/users';

//Lấy dữ liệu User
export const fetchUserApi = async () => {
    try {
    const response = await fetch(API_BASE_URL);
    if(!response.ok) {
        throw new Error(response.statusText);
    }
        const data = await response.json();
        return data;
    }catch (error) {
        console.error(error);
        throw error;
    }
};

export const fetchUserByID = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${id}`);
        if(!response.ok) {
            throw new Error(response.statusText);
        }
        const data = await response.json();
        return data;
    }catch (error) {
        console.error(error);
        throw error;
    }
}

export const addUser = async (newUser) => {
    try {
        const response = await fetch(API_BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser)
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const updateUser = async (idUser,newInfor) => {
    try{
        const response = await fetch(`${API_BASE_URL}/${idUser}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({newInfor})
        })
        if(!response.ok) {
            throw new Error(response.statusText);
        }
        return await response.json();
    }catch (error) {
        console.error(error);
        throw error;
    }
}

export const updatePassword = async (userId, newPassword) => {
    if (!userId) {
        throw new Error('User ID is required.');
    }
    if (!newPassword) {
        throw new Error('New password is required.');
    }
    try {
        const response = await fetch(`${API_BASE_URL}/${userId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password: newPassword })
        });

        if (!response.ok) {
            throw new Error(`Error updating password: ${response.statusText}`);
        }


        console.log('Password updated successfully');
        return await response.json();
    } catch (error) {
        console.error('Failed to update password:', error);
        throw error;
    }
};

export const deleteUser = async (idUser) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${idUser}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.status === 204 || response.status === 200) {
            console.log('User deleted successfully.');
            return true;
        } else if (response.status === 404) {
            console.log('User not found.');
            return false;
        } else {
            throw new Error(`Unexpected response: ${response.status} ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
};