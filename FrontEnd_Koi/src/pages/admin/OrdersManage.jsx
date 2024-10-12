import {useState,useEffect} from 'react';
import {fetchOrders} from "../../service/OrdersApi.jsx";
import {Link} from "react-router-dom";

const OrdersManage = () => {
    //Menu con
    const [activeMenu, setActiveMenu] = useState(null);

    const toggleMenu = (orderId,menuName) => {
        const currentMenu = `${orderId}-${menuName}`;
        setActiveMenu((prevMenu) => (prevMenu === currentMenu ? null : currentMenu));
    }

    //Lấy data từ api
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPages=10;

    useEffect(() => {
        const getOrders = async () => {
            try {
                const OrderList = await fetchOrders() ;
                setOrders(OrderList);
            }catch (error) {
                setError(error.message);
            }finally {
                setLoading(false);
            }
        };
        getOrders();
    },[]);

    if(loading) return (
        <div>Loading ...</div>
    );


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
                        <table className=" min-w-full rounded-xl">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th scope="col"
                                        className="p-5 text-center text-sm leading-6 font-semibold text-gray-900 capitalize rounded-t-xl"> ID </th>
                                    <th scope="col"
                                        className="p-5 text-center text-sm leading-6 font-semibold text-gray-900 capitalize">Customer Name </th>
                                    <th scope="col"
                                        className="p-5 text-center text-sm leading-6 font-semibold text-gray-900 capitalize"> Order Date </th>
                                    <th scope="col"
                                        className="p-5 text-center text-sm leading-6 font-semibold text-gray-900 capitalize"> Status </th>
                                    <th scope="col"
                                        className="p-5 text-center text-sm leading-6 font-semibold text-gray-900 capitalize rounded-t-xl"> Payment Status </th>
                                    <th scope="col"
                                        className="p-5 text-center text-sm leading-6 font-semibold text-gray-900 capitalize rounded-t-xl"> Price </th>
                                    <th scope="col"
                                        className="p-5 text-center text-sm leading-6 font-semibold text-gray-900 capitalize rounded-t-xl"> </th>
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
                                            <button onClick={() => toggleMenu(order.id,'menu1')}
                                                className="p-2  rounded-full  group transition-all duration-500  flex item-center relative">
                                                <img className="cursor-pointer"
                                                     src="/img/icons8-edit-100.png"
                                                     alt="Description of the icon"
                                                     width="20"
                                                     height="20"/>
                                            {activeMenu === `${order.id}-menu1` && (
                                                <ul className="absolute right-5 top-7 z-10 mt-2 w-48 p-5 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                                    <li>
                                                        <Link className={"block flex items-center px-4 py-2 h-full text-sm text-gray-700 hover:bg-gray-100"} to={`/orders/${order.id}`}>Set status</Link>
                                                    </li>
                                                    <li>
                                                        <Link className={"block flex items-center px-4 py-2 h-full text-sm text-gray-700 hover:bg-gray-100"} to={`/orders/${order.id}`}>Set payment status</Link>
                                                    </li>
                                                </ul>
                                            )}
                                            </button>

                                            <button
                                                className="p-2  rounded-full  group transition-all duration-500  flex item-center">
                                                <img className="cursor-pointer"
                                                     src="/img/icons8-delete-100-colorful.png"
                                                     alt="Description of the icon"
                                                     width="20"
                                                     height="20"/>
                                            </button>
                                            <button onClick={() => toggleMenu(order.id,'menu2')}
                                                className="p-2  rounded-full  group transition-all duration-500  flex item-center relative">
                                                <img className="cursor-pointer"
                                                     src="/img/icons8-menu-vertical-100.png"
                                                     alt="Description of the icon"
                                                     width="20"
                                                     height="20"/>
                                            {activeMenu === `${order.id}-menu2` && (
                                                <ul className="absolute right-5 top-7 z-10 mt-2 w-48 p-5 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                                    <li>
                                                        <Link className={"block flex items-center px-4 py-2 h-full text-sm text-gray-700 hover:bg-gray-100"} to={`/orderDetail/${order.id}`}>Detail</Link>
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

                        <div className={"flex justify-center mt-4"}>
                            <button disabled = {currentPage === 1}
                            onClick = {() => handdleChangePages(currentPage - 1)}
                            className={"px-4 py-2 mx-1 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300"}
                            >
                            &lt;
                            </button>

                            {[...Array(totalPages)].map((_, index) => (
                                <button
                                key={index}
                                onClick={() => handdleChangePages(index+1)}
                                className={`px-4 py-2 mx-1 rounded-full ${currentPage === index + 1 ? 'bg-orange-400 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                                >
                                    {index+1}
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
