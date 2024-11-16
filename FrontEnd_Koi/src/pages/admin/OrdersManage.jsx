import {useState, useEffect, useRef} from 'react';
import {fetchOrders,deleteOrder} from "../../service/OrdersApi.jsx";
import UpdateStatus from "../../components/admin/ModalUpdateStatus.jsx";
import OrderDetailModal from  "../../components/admin/OrderDetail.jsx";


const OrdersManage = () => {
    //Menu con
    const menuRef = useRef(null);
    const [activeMenu, setActiveMenu] = useState(null);
    const toggleMenu = (orderId,menuName) => {
        const currentMenu = `${orderId}-${menuName}`;
        setActiveMenu((prevMenu) => (prevMenu === currentMenu ? null : currentMenu));
    }
    //Modal updateStatus
    const [isModalUpdateStatusOpen, setIsModalUpdateStatusOpen] = useState(false);
    const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const openUpdateStatusModal = (order) => {
        setSelectedOrder(order);
        setIsModalUpdateStatusOpen(true);
    }

    const closeUpdateStatusModal = () => {
        setSelectedOrder(null);
        setIsModalUpdateStatusOpen(false);
    }

    const openDetailModal = (order) => {
        setSelectedOrder(order);
        setIsModalDetailOpen(true);
    }
    const closeDetailModal = () => {
        setSelectedOrder(null);
        setIsModalDetailOpen(false);
    }
    const closeAllMenu = () => {
        setActiveMenu(null);
    }
    //Lấy data từ api
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPages=10;

    const getOrders = async () => {
        try {
            const OrderList = await fetchOrders() ;
            setOrders(OrderList.data);
        }catch (error) {
            setError(error.message);
        }finally {
            setLoading(false);
        }
    };
    useEffect(() => {

        getOrders();
    },[]);

    useEffect(()=>{
        const handleClickOutside = (event) => {
            if(menuRef.current && !menuRef.current.contains(event.target)) {
                setActiveMenu(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    },[menuRef])

    if (loading) {
        return <div>Loading...</div>;
    }
    if(error) return (
        <div>
            Error: {error.message}
        </div>
    )
    //Phân trang

    const totalPages = Math.ceil(orders.length/ordersPerPages);
    const indexOfLastOrders = currentPage * ordersPerPages;
    const indexOfFirstOrders = indexOfLastOrders - ordersPerPages;
    const currentOrders = orders.slice(indexOfFirstOrders, indexOfLastOrders);

    const handdleChangePages = (pageNumber) => {
            setCurrentPage(pageNumber);
    }
    return (
        <div className="flex flex-col">
            <div className=" overflow-x-auto">
                <div className="min-w-full inline-block align-middle">
                    <div className="overflow-hidden ">
                        {/*<div className={`p-4`}>*/}
                        {/*    <input type="text" className={`p-2 rounded-full mx-2 focus:outline-none`}*/}
                        {/*           placeholder="Search..."/>*/}
                        {/*    <button*/}
                        {/*        className={`p-2 rounded-full bg-cyan-300 transition duration-[1s] hover:bg-orange-300 hover:text-white  `}>Search*/}
                        {/*    </button>*/}
                        {/*</div>*/}
                        <table className=" min-w-full rounded-xl">
                            <thead>
                            <tr className="bg-gray-50">
                                <th scope="col"
                                    className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize">Order number
                                </th>
                                <th scope="col"
                                    className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"> Start
                                    Date
                                </th>
                                <th scope="col"
                                    className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"> Status
                                </th>
                                <th scope="col"
                                    className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize rounded-t-xl"> Service Type
                                </th>
                                <th scope="col"
                                    className="p-5 text-left         text-sm leading-6 font-semibold text-gray-900 capitalize rounded-t-xl"></th>
                            </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-300 ">
                            {currentOrders.map(order => (
                                <tr className="bg-white transition-all duration-500 hover:bg-gray-50"
                                    key={order.orderId}>
                                    <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900"> {order.orderNumber}</td>
                                    <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900"> {order.startDate}</td>
                                    <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900"> {order.status}</td>
                                    <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900"> {order.serviceType}</td>
                                    <td className=" p-5 ">
                                        <div className="flex items-center gap-1">
                                            <button onClick={() => toggleMenu(order.orderId, 'menu1')}
                                                    className="p-2  rounded-full  group transition-all duration-500  flex item-center relative">
                                                <img className="cursor-pointer"
                                                     src="/img/icons8-edit-100.png"
                                                     alt="Description of the icon"
                                                     width="20"
                                                     height="20"/>
                                                {activeMenu === `${order.orderId}-menu1` && (
                                                    <ul ref={menuRef}
                                                        className="absolute right-5 top-7 z-10 mt-2 w-48 p-5 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                                        <li>
                                                            <button
                                                                className={"block flex items-center px-4 py-2 h-full w-full text-sm text-gray-700 hover:bg-gray-100 hover:text-yellow-500"}
                                                                onClick={() => {
                                                                    toggleMenu(order.orderId, 'menu1')
                                                                    closeAllMenu()
                                                                    openUpdateStatusModal(order)
                                                                }
                                                                }>Update
                                                                Status
                                                            </button>
                                                        </li>
                                                    </ul>
                                                )}
                                            </button>

                                            <button onClick={() => toggleMenu(order.orderId, 'menu2')}
                                                    className="p-2  rounded-full  group transition-all duration-500  flex item-center relative">
                                                <img className="cursor-pointer"
                                                     src="/img/icons8-menu-vertical-100.png"
                                                     alt="Description of the icon"
                                                     width="20"
                                                     height="20"/>
                                                {activeMenu === `${order.orderId}-menu2` && (
                                                    <ul ref={menuRef}
                                                        className="absolute right-5 top-7 z-10 mt-2 w-48 p-5 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                                        <li>
                                                            <button
                                                                className={`block flex items-center px-4 py-2 h-full w-full text-sm text-gray-700 hover:bg-gray-100 hover:text-yellow-500`}
                                                                onClick={() => {
                                                                    toggleMenu(order.orderId, 'menu2')
                                                                    openDetailModal(order)
                                                                }
                                                                }>Detail
                                                            </button>
                                                        </li>
                                                    </ul>
                                                )}
                                            </button>

                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <UpdateStatus
                            isOpen={isModalUpdateStatusOpen}
                            onRequestClose={closeUpdateStatusModal}
                            order={selectedOrder}
                            onUpdateSuccess={getOrders}
                        />
                        <OrderDetailModal isOpen={isModalDetailOpen}
                                          onRequestClose={closeDetailModal}
                                          order={selectedOrder}
                        />
                        <div className={"flex justify-center mt-4"}>
                            <button disabled={currentPage === 1}
                                    onClick={() => handdleChangePages(currentPage - 1)}
                                    className={"px-4 py-2 mx-1 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300"}
                            >
                                &lt;
                            </button>
                            {[...Array(totalPages)].map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => handdleChangePages(index + 1)}
                                    className={`px-4 py-2 mx-1 rounded-full ${currentPage === index + 1 ? 'bg-orange-400 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                            <button disabled={currentPage === totalPages}
                                    onClick={() => handdleChangePages(currentPage + 1)}
                                    className={"px-4 py-2 mx-1 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300"}
                            >
                                &gt;
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default OrdersManage;
