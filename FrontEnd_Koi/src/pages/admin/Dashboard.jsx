import {useEffect, useState} from 'react';
import VisitorsAnalytics from "../../components/admin/ChartBoard";
import ChartComponent from "../../components/admin/ReneuveChart";
import {fetchUserApi} from "../../service/UserApi.jsx";
import {fetchRatings} from "../../service/RatingApi.jsx";
import OrderDetailModal from "../../components/admin/OrderDetail.jsx";
import {fetchOrders} from "../../service/OrdersApi.jsx";

const Dashboard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const openModal = (order) => {
        setSelectedOrder(order);
        setIsModalOpen(true);
    }
    const closeModal = () => {
        setSelectedOrder(null);
        setIsModalOpen(false);
    }
    const [openMenuIndex, setOpenMenuIndex] = useState(null);
    const toggleMenu = (index) => {
        setOpenMenuIndex(openMenuIndex === index ? null : index);
    };
    const [data, setData] = useState([0, 0, 0, 0]);
    const sumAllUser = async () => {
        try {
            const userList = await fetchUserApi();
            const userWithRoleUser = userList.data.filter(user => user.roleName === 'ROLE_USER');
            const totalUser = userWithRoleUser.length;
            setData((prevData) => {
                const newData = [...prevData];
                newData[0] = totalUser;
                return newData;
            });
        } catch (e) {
            console.error(e);
        }
    }
    const [ordersThisMonth1, setOrdersThisMonth1] = useState([]);
    const sumAllOrder = async () => {
        try {
            const ordersList = await fetchOrders();
            const currentMonth = new Date().getMonth();
            const currentYear = new Date().getFullYear();
            const ordersThisMonth = ordersList.data.filter(order => {
                const startDateStr = order.startDate.split('-').reverse().join('-');
                const startDate = new Date(startDateStr);
                return startDate.getMonth() === currentMonth && startDate.getFullYear() === currentYear;
            });
            const totalOrder = ordersThisMonth.length > 0 ? ordersThisMonth.length : 0;
            setOrdersThisMonth1(ordersThisMonth);
            setData((prevData) => {
                const newData = [...prevData];
                newData[1] = totalOrder;
                return newData;
            });
        } catch (e) {
            console.error(e);
        }
    }
    const sumAllRatings = async () => {
        try {
            const response = await fetchRatings();
            const RatingsList = response.data;
            const totalRating = RatingsList.length > 0 ? RatingsList.length : 0;
            setData((prevData) => {
                const newData = [...prevData];
                newData[2] = totalRating;
                return newData;
            });
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        sumAllUser();
        sumAllOrder();
        sumAllRatings();
    }, []);

    return (
        <div>

            <section className="grid grid-cols-2 gap-6 my-6">
                <div className="bg-white p-4 rounded-lg shadow-lg">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-gray-700">Khách hàng</h2>
                    </div>
                    <div className="text-3xl font-bold text-gray-800 mb-2">{data[0]} người</div>
                    <div className="h-2 bg-blue-200 rounded-full">
                        <div className="h-full bg-blue-500 rounded-full" style={{width: '95%'}}></div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-lg">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-gray-700">Đơn hàng</h2>
                        <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded">Tháng này</span>
                    </div>
                    <div className="text-3xl font-bold text-gray-800 mb-2">{data[1]} đơn</div>
                    <div className="h-2 bg-yellow-200 rounded-full">
                        <div className="h-full bg-yellow-500 rounded-full" style={{width: '65%'}}></div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-lg">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-gray-700">Doanh số</h2>
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded">Tháng này</span>
                    </div>
                    <div className="text-3xl font-bold text-gray-800 mb-2">50.000.000đ</div>
                    <div className="h-2 bg-green-200 rounded-full">
                        <div className="h-full bg-green-500 rounded-full" style={{width: '75%'}}></div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-lg">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-gray-700">Đánh giá</h2>
                    </div>
                    <div className="text-3xl font-bold text-gray-800 mb-2">{data[2]}</div>
                    <div className="h-2 bg-purple-200 rounded-full">
                        <div className="h-full bg-purple-500 rounded-full" style={{width: '85%'}}></div>
                    </div>
                </div>
            </section>
            <div className="w-full flex justify-end mt-4 space-x-2">
                <div className="bg-white p-4 rounded-lg shadow-lg w-1/3 h-1/3">
                    <VisitorsAnalytics/>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-lg w-2/3 h-2/3">
                    <ChartComponent/>
                </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-lg w-full h-auto my-2 overflow-x-auto">
                <table className="min-w-full border border-gray-300">
                    <thead className="bg-gray-300">
                    <tr>
                        <th className="py-2 px-4 border-b text-left text-gray-600">ID</th>
                        <th className="py-2 px-4 border-b text-left text-gray-600">Số điện thoại</th>
                        <th className="py-2 px-4 border-b text-left text-gray-600">Ngày bắt đầu</th>
                        <th className="py-2 px-4 border-b text-left text-gray-600">Trạng thái</th>
                        <th className="py-2 px-4 border-b text-left text-gray-600"></th>
                    </tr>
                    </thead>

                    <tbody>
                    {ordersThisMonth1.map((item, index) => (
                        <tr className="" key={index}>
                            <td className="py-2 px-4 border-b text-left text-gray-600">{item.orderNumber}</td>
                            <td className="py-2 px-4 border-b text-left text-gray-600">{item.userPhone}</td>
                            <td className="py-2 px-4 border-b text-left text-gray-600">{item.startDate}</td>
                            <td className="py-2 px-4 border-b text-left text-gray-600">{item.status}</td>
                            <td className="py-2 px-4 border-b text-left text-gray-600 relative">
                                <button onClick={() => toggleMenu(index)}
                                        className="inline-flex justify-center px-4 py-2 bg-white  text-gray-700 focus:outline-none w-12 h-auto">
                                    <img className="w-full h-full" src="/img/icons8-dot-100.png" alt=""/>
                                </button>
                                {openMenuIndex === index && (
                                    <div
                                        className="absolute right-[130px] top-[-3em] z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                        <div className="py-1" role="menu" aria-orientation="vertical"
                                             aria-labelledby="options-menu">
                                            <button
                                                className="flex items-center px-4 py-2 h-full text-center text-sm text-gray-700 hover:bg-gray-100 hover:text-yellow-500 w-full"
                                                onClick={() => {
                                                    toggleMenu(index);
                                                    openModal(item);
                                                }}>
                                                <img
                                                    src="/img/icons8-eye-100.png" className="w-3 h-auto mx-1"
                                                    alt=""/>
                                                Chi tiết
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <OrderDetailModal isOpen={isModalOpen}
                                  onRequestClose={closeModal}
                                  order={selectedOrder}
                />
            </div>
        </div>
    );
};
export default Dashboard;
