import {useEffect, useState} from 'react';
import {deleteUser, fetchUserApi, updatePassword} from "../../service/UserApi.jsx";

const UserManage = () => {
    const [users, setUser] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [currentPage,setCurrentPage] = useState(1);
    const userPerPages = 10;

    useEffect(() => {
        const getUser = async () => {
            try{
                const UserList = await fetchUserApi();
                setUser(UserList.data);
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

    const totalPages = Math.ceil(users.length/userPerPages)
    const indexOfLastUser = currentPage * userPerPages;
    const indexOfFirstUser = indexOfLastUser - userPerPages;
    const currentData = users.slice(indexOfFirstUser, indexOfLastUser);
    const handleChangPages = (pageNumber) => {
        setCurrentPage(pageNumber);
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
                {currentData.map(user => (

                    <tr key={user.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex text-center items-center w-full">
                                <div className="flex-shrink-0 h-10 w-10">
                                    <img className="h-10 w-10 rounded-full" src="https://i.pravatar.cc/150?img=1"
                                         alt=""/>
                                </div>
                                <div className="ml-4">
                                    <div className="text-sm text-center font-medium w-full text-gray-900">
                                        {user.name}
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-center text-gray-900">{user.phone}</div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                            {user.roleName === "ROLE_MANAGER" || user.roleName === "ROLE_ADMIN" ? (
                                <span
                                    className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                </span>

                            ) : (
                                <span
                                    className=" px-2 inline-flex text-xs text-center leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    {user.roleName.replace("ROLE_", "")}
                                </span>
                            )
                            }
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                            {user.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                            <button onClick={() => handleResetPassword(user.id)}
                                    className={`ml-2 text-red-600 ${user.roleName !== "ROLE_MANAGER" || user.roleName !== "ROLE_ADMIN" ? "hover:text-red-900":""}`}>Reset password
                            </button>

                            <button
                                onClick={() => handleDeleteUser(user.id)}
                                className={`ml-2 hover:text-red-900 ${user.roleName === "ROLE_MANAGER" || user.roleName === "ROLE_ADMIN" ? "text-gray-400 hover:text-gray-400" : "text-red-600"}`}
                                disabled={user.roleName === "ROLE_MANAGER" || user.roleName === "ROLE_ADMIN"}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}

                </tbody>
            </table>

            <div className={"flex justify-center mt-4"}>
                <button disabled={currentPage === 1}
                        onClick={() => handleChangPages(currentPage - 1)}
                        className={"px-4 py-2 mx-1 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300"}
                >
                    &lt;
                </button>

                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index}
                        onClick={() => handleChangPages(index + 1)}
                        className={`px-4 py-2 mx-1 rounded-full ${currentPage === index + 1 ? 'bg-green-700 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`} >
                        {index + 1}
                    </button>
                ))}

                <button disabled={currentPage === totalPages}
                        onClick={() => handleChangPages(currentPage + 1)}
                        className={"px-4 py-2 mx-1 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300"}
                >
                    &gt;
                </button>
            </div>
        </div>

    );
};

export default UserManage;