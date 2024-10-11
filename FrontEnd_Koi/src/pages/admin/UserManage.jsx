import React, {useEffect, useState} from 'react';
import {deleteUser, fetchUserApi, fetchUserByID, updatePassword, updateUser} from "../../service/UserApi.jsx";

const UserManage = () => {
    const [users, setUser] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const getUser = async () => {
            try{
                const UserList = await fetchUserApi();
                setUser(UserList);
            }catch (error) {
                setError(error.message);
            }finally {
                setLoading(false);
            }
        };
        getUser();
    },[]);

    if(loading) {
        return(
            <div>Loading...</div>
        );
    }


    const handleDeleteUser = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if(confirmDelete) {
            try{
                await deleteUser(id);
                setUser(users.filter(user => user.id !== id));
            }catch (error) {
                console.error(error);
                setError(error.message);
            }
        }
    }

    const handleResetPassword = async (userId) => {
        try {
            const updatedPassword = await updatePassword(userId, "1");
            console.log('User password reset to "1":', updatedPassword);
        } catch (error) {
            console.error('Error resetting password:', error);
            setError(error.message);
        }
    };

    if(error){
        return(
            <div>
                Error: {error.message}
            </div>
        )
    }
    return (
        <div className="user-manage">
            <table className="min-w-full divide-y divide-gray-200 overflow-x-auto">
                <thead className="bg-gray-50">
                <tr>
                    <th scope="col"
                        className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                    </th>
                    <th scope="col"
                        className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Phone Number
                    </th>
                    <th scope="col"
                        className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role
                    </th>
                    <th scope="col"
                        className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                    </th>
                    <th scope="col"
                        className="px-6 py-3 text-center     text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                    </th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {users.map(user => (

                <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                                <img className="h-10 w-10 rounded-full" src="https://i.pravatar.cc/150?img=1" alt=""/>
                            </div>
                            <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                    {user.name}
                                </div>
                            </div>
                        </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{user.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                <span
                    className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {user.role}
                </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap  text-sm font-medium">
                        <button onClick={() => handleResetPassword(user.id)}
                                className="ml-2 text-red-600 hover:text-red-900">Reset password
                        </button>
                        <button onClick={() => handleDeleteUser(user.id)}
                                className="ml-2 text-red-600 hover:text-red-900">Delete
                        </button>
                    </td>
                </tr>
                ))}

                </tbody>
            </table>
        </div>
    );
};

export default UserManage;