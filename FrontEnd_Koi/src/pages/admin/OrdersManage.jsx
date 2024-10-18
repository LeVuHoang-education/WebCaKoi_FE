import {useState, useEffect, useRef} from 'react';
import {fetchOrders,deleteOrder} from "../../service/OrdersApi.jsx";
import UpdateStatus from "../../components/admin/ModalUpdateStatus.jsx";
import UpdatePaymentStatus from "../../components/admin/ModalUpdatePaymentStatus.jsx";
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
    const [isModalUpdatePaymentOpen, setIsModalUpdatePaymentOpen] = useState(false);
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

    const openUpdatePaymentModal = (order) => {
        setSelectedOrder(order);
        setIsModalUpdatePaymentOpen(true);
    }
    const closeUpdatePaymentModal = () => {
        setSelectedOrder(null);
        setIsModalUpdatePaymentOpen(false);
    }
    const openDetailModal = (order) => {
        setSelectedOrder(order);
        setIsModalDetailOpen(true);
    }
    const closeDetailModal = () => {
        setSelectedOrder(null);
        setIsModalDetailOpen(false);
    }
    //Lấy data từ api
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPages=10;

    useEffect(() => {
        setLoading(true);
        const getOrders = async () => {
            try {
                const OrderList = await fetchOrders() ;
                setOrders(OrderList);
                setLoading(false)
            }catch (error) {
                setError(error.message);
            }finally {
                setLoading(false);
            }
        };
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
    const handleDelete = async (orderId) => {
        if (window.confirm("Are you sure you want to delete this order?")) {
            try {
                await deleteOrder(orderId); // Gọi API để xóa đơn hàng
                setOrders(orders.filter(order => order.id !== orderId)); // Cập nhật lại danh sách đơn hàng
                alert("Order deleted successfully."); // Thông báo thành công
            } catch (error) {
                alert("Failed to delete order: " + error.message); // Thông báo thất bại
            }
        }
    };

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
                        <div className={`p-4`}>
                            <input type="text" className={`p-2 rounded-full mx-2 focus:outline-none`}
                                   placeholder="Search..."/>
                            <button
                                className={`p-2 rounded-full bg-cyan-300 transition duration-[1s] hover:bg-orange-300 hover:text-white  `}>Search
                            </button>
                        </div>
                        <table className=" min-w-full rounded-xl">
                            <thead>
                            <tr className="bg-gray-50">
                                <th scope="col"
                                    className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize rounded-t-xl"> ID
                                </th>
                                <th scope="col"
                                    className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize">Customer
                                    Name
                                </th>
                                <th scope="col"
                                    className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"> Order
                                    Date
                                </th>
                                <th scope="col"
                                    className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"> Status
                                </th>
                                <th scope="col"
                                    className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize rounded-t-xl"> Payment
                                    Status
                                </th>
                                <th scope="col"
                                    className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize rounded-t-xl"> Price
                                </th>
                                <th scope="col"
                                    className="p-5 text-left         text-sm leading-6 font-semibold text-gray-900 capitalize rounded-t-xl"></th>
                            </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-300 ">
                            {currentOrders.map(order => (

                                <tr className="bg-white transition-all duration-500 hover:bg-gray-50" key={order.id}>
                                    <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900 ">{order.id} </td>
                                    <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900"> {order.customer_name}</td>
                                    <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900"> {order.order_date}</td>
                                    <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900"> {order.status}</td>
                                    <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900"> {order.payment_status}</td>
                                    <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900"> {order.total_mount}</td>
                                    <td className=" p-5 ">
                                        <div className="flex items-center gap-1">
                                            <button onClick={() => toggleMenu(order.id, 'menu1')}
                                                    className="p-2  rounded-full  group transition-all duration-500  flex item-center relative">
                                                <img className="cursor-pointer"
                                                     src="/img/icons8-edit-100.png"
                                                     alt="Description of the icon"
                                                     width="20"
                                                     height="20"/>
                                                {activeMenu === `${order.id}-menu1` && (
                                                    <ul ref={menuRef} className="absolute right-5 top-7 z-10 mt-2 w-48 p-5 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                                        <li>
                                                            <button
                                                                className={"block flex items-center px-4 py-2 h-full w-full text-sm text-gray-700 hover:bg-gray-100 hover:text-yellow-500"}
                                                                onClick={() =>
                                                                {
                                                                    toggleMenu(order.id,'menu1')
                                                                    openUpdateStatusModal(order)}
                                                                }>Update
                                                                Status
                                                            </button>
                                                        </li>
                                                        <li>
                                                            <button
                                                                className={`block flex items-center px-4 py-2 h-full w-full text-sm text-gray-700 hover:bg-gray-100 hover:text-yellow-500`}
                                                                onClick={() =>{
                                                                    toggleMenu(order.id,'menu1')
                                                                    openUpdatePaymentModal(order)}
                                                                }>Update
                                                                payment
                                                            </button>
                                                        </li>
                                                    </ul>
                                                )}
                                            </button>
                                            <button onClick={()=>
                                            {
                                                handleDelete(order.id)}
                                            }
                                                className="p-2  rounded-full  group transition-all duration-500  flex item-center">
                                                <img className="cursor-pointer"
                                                     src="/img/icons8-delete-100-colorful.png"
                                                     alt="Description of the icon"
                                                     width="20"
                                                     height="20"/>
                                            </button>
                                            <button onClick={() => toggleMenu(order.id, 'menu2')}
                                                    className="p-2  rounded-full  group transition-all duration-500  flex item-center relative">
                                                <img className="cursor-pointer"
                                                     src="/img/icons8-menu-vertical-100.png"
                                                     alt="Description of the icon"
                                                     width="20"
                                                     height="20"/>
                                                {activeMenu === `${order.id}-menu2` && (
                                                    <ul ref={menuRef} className="absolute right-5 top-7 z-10 mt-2 w-48 p-5 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                                        <li>
                                                            <button
                                                                className={`block flex items-center px-4 py-2 h-full w-full text-sm text-gray-700 hover:bg-gray-100 hover:text-yellow-500`}
                                                                onClick={() =>
                                                                {
                                                                    toggleMenu(order.id, 'menu2')
                                                                    openDetailModal(order)}
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
                        />
                        <UpdatePaymentStatus isOpen={isModalUpdatePaymentOpen}
                                             onRequestClose={closeUpdatePaymentModal}
                                             order={selectedOrder}
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
