import {useEffect, useRef, useState} from 'react';
import {deleteUser, fetchUserApi, resetPassword, updateUser} from "../../service/UserApi.jsx";

const UserManage = () => {
    const menuRef = useRef();
    const [activeMenu, setActiveMenu] = useState(false);
    const toggleMenu = (userId) => {
        setActiveMenu((prevActiveMenu) => (prevActiveMenu === userId ? null : userId));
    }
    const closeAllMenu = () => {
        setActiveMenu(null);
    }
    const [users, setUser] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const userPerPages = 10;

    useEffect(() => {
        const getUser = async () => {
            try {
                const UserList = await fetchUserApi();
                setUser(UserList.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        getUser();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setActiveMenu(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [menuRef]);

    if (loading) {
        return <div>Loading...</div>;
    }

    const handleDeleteUser = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if (confirmDelete) {
            try {
                await deleteUser(id);
                setUser(users.filter(user => user.id !== id));
            } catch (error) {
                console.error(error);
                setError(error.message);
            }
        }
    }

    const handleResetPassword = async (userId) => {
        try {
            const updatedPassword = await resetPassword(userId);
            console.log('User password reset to "1":', updatedPassword);
        } catch (error) {
            console.error('Error resetting password:', error);
            setError(error.message);
        }
    };


    if (error) {
        return <div>Error: {error.message}</div>
    }

    const totalPages = Math.ceil(users.length / userPerPages);
    const indexOfLastUser = currentPage * userPerPages;
    const indexOfFirstUser = indexOfLastUser - userPerPages;
    const currentData = users.slice(indexOfFirstUser, indexOfLastUser);
    const handleChangPages = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    return (
        <div className="user-manage">
            <table className="min-w-full table-fixed divide-y divide-gray-200 overflow-x-auto">
                <thead className="bg-gray-50">
                <tr>
                    <th scope="col"
                        className="px-6 py-3 w-1/5 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"> Name
                    </th>
                    <th scope="col"
                        className="px-6 py-3 w-1/5 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"> Phone
                        Number
                    </th>
                    <th scope="col"
                        className="px-6 py-3 w-1/5 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"> Role
                    </th>
                    <th scope="col"
                        className="px-6 py-3 w-1/5 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"> Email
                    </th>
                    <th scope="col"
                        className="px-6 py-3 w-1/5 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 overflow-auto min-w-full">
                {currentData.map(user => (
                    user.status === "ACTIVE" ? (
                    <tr key={user.id}>
                        <td className="px-6 py-2 w-1/5 whitespace-nowrap flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                                <img className="h-10 w-10 rounded-full" src="/img/icons8-user-100-colorful.png" alt=""/>
                            </div>
                            <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{user.username}</div>
                            </div>
                        </td>
                        <td className="px-3 py-2 w-1/5 whitespace-nowrap">
                            <div
                                className={`flex items-center w-full  text-center text-sm font-medium text-gray-900 h-full justify-between`}>
                                {user.phone}
                            </div>
                        </td>
                        <td className="px-6 py-2 w-1/5 whitespace-nowrap text-center">
                                <span
                                    className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    {user.roleName.replace("ROLE_", "")}
                                </span>
                        </td>
                        <td className="px-6 py-2 w-1/5 whitespace-nowrap text-center text-sm text-gray-500">{user.email}</td>
                        <td className="px-6 py-2 w-1/5 whitespace-nowrap text-center text-sm font-medium relative">
                            <button onClick={() => toggleMenu(user.id)}
                                    className={`p-2 rounded-full group transition-all duration-500  flex item-center`}
                            >
                                <img src="/img/icons8-dot-100.png" alt="menu" width="20" height="20"/>
                            </button>
                            {activeMenu === user.id && (
                                <ul ref={menuRef}
                                    className={`absolute -left-3/4 top-10 z-10 mt-2 w-48 p-5 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5`}>
                                    <li>
                                        <button onClick={() => {
                                            closeAllMenu()
                                            handleResetPassword(user.id)
                                        }}
                                                className="text-red-500 hover:text-white hover:bg-violet-500 w-full p-2 rounded-full">Reset password
                                        </button>
                                    </li>
                                    <li>
                                        <button onClick={() => {
                                            closeAllMenu()
                                            handleDeleteUser(user.id)
                                        }}
                                                className={`${user.roleName === "ROLE_MANAGER" || user.roleName === "ROLE_ADMIN" ? "text-gray-400" : "text-red-600 hover:text-white hover:bg-violet-500 w-full p-2 rounded-full"}`}
                                                disabled={user.roleName === "ROLE_MANAGER" || user.roleName === "ROLE_ADMIN"}>Delete
                                        </button>
                                    </li>
                                    <li>
                                        <button>

                                        </button>
                                    </li>
                                </ul>
                            )}
                        </td>
                    </tr>
                    ) : null
                ))}
                </tbody>
            </table>
            <div className="flex justify-center mt-4">
                <button disabled={currentPage === 1} onClick={() => handleChangPages(currentPage - 1)}
                        className="px-4 py-2 mx-1 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300">&lt;</button>
                {[...Array(totalPages)].map((_, index) => (
                    <button key={index} onClick={() => handleChangPages(index + 1)}
                            className={`px-4 py-2 mx-1 rounded-full ${currentPage === index + 1 ? 'bg-green-700 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                        {index + 1}
                    </button>
                ))}
                <button disabled={currentPage === totalPages} onClick={() => handleChangPages(currentPage + 1)}
                        className="px-4 py-2 mx-1 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300">&gt;</button>
            </div>
        </div>
    );
};

export default UserManage;
