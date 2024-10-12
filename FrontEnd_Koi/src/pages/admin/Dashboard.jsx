import  {useState } from 'react';
import VisitorsAnalytics from "../../components/admin/ChartBoard";
import ChartComponent from "../../components/admin/ReneuveChart";
import {Link} from "react-router-dom";

const Dashboard = () => {

    const [openMenuIndex, setOpenMenuIndex] = useState(null);
    const toggleMenu = (index) => {
        setOpenMenuIndex(openMenuIndex === index ? null : index);
    };

    // const [data, setData] = useState(initialData);
    // const [items,setItems] = React.useState([]);
    // const [loading, setLoading] = React.useState(true);
    // const [error, setError] = React.useState(null);
    //
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try{
    //             const respone = await fetch('http://localhost:8000/data');
    //             if(!respone.ok) {
    //                 throw new Error('Network response was not ok');
    //             }
    //             const data = await respone.json();
    //             setItems(data);
    //         }catch(error) {
    //             setError(error);
    //         }finally{
    //             setLoading(false);
    //         }
    //     fetchData();
    //     }
    // },[]);
    // // gia su data gom co ID, Name, Price, OrderDate, Status
    //
    //
    // if(error){
    //     return <div>Error: {error}</div>
    // }
    // if(loading) {
    //     // return <div className="">Loading...</div>
    // }
    // const handleDeleteOrders = async (id) => {
    //     if(window.confirm("Are you sure you want to delete this order?")) {
    //         try{
    //
    //             //Định nghĩa hàm DELETE trong API
    //             await DeleteUserByID(id);
    //             const updateData = data.filter(Orders => Orders.id !== id);
    //             setData(updateData);
    //         }catch (error) {
    //             console.error('Error deleting user:', error);
    //             alert('Failed to delete user. Please try again later.');
    //         }
    //     }
    //
    // };
    return (
        <div>

        <section className="grid grid-cols-2 gap-6 my-6">
            <div className="bg-white p-4 rounded-lg shadow-lg">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-gray-700">Customer</h2>
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-2">35 000 person</div>
                <div className="h-2 bg-blue-200 rounded-full">
                    <div className="h-full bg-blue-500 rounded-full" style={{width: '95%'}}></div>
                </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-lg">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-gray-700">Orders</h2>
                    <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded">This month</span>
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-2">34 orders</div>
                <div className="h-2 bg-yellow-200 rounded-full">
                    <div className="h-full bg-yellow-500 rounded-full" style={{width: '65%'}}></div>
                </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-lg">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-gray-700">Revenue</h2>
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded">This Month</span>
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-2">50.000.000đ</div>
                <div className="h-2 bg-green-200 rounded-full">
                    <div className="h-full bg-green-500 rounded-full" style={{width: '75%'}}></div>
                </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-lg">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-gray-700">Projects</h2>
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-2">100</div>
                <div className="h-2 bg-purple-200 rounded-full">
                    <div className="h-full bg-purple-500 rounded-full" style={{width: '85%'}}></div>
                </div>
            </div>
        </section>
            <div className="w-full flex justify-end mt-4 space-x-2">
                <div className="bg-white p-4 rounded-lg shadow-lg w-1/3 h-1/3">
                    <VisitorsAnalytics />
                </div>
                <div className="bg-white p-4 rounded-lg shadow-lg w-2/3 h-2/3">
                    <ChartComponent />
                </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-lg w-full h-auto my-2 overflow-x-auto">
                <table className="min-w-full border border-gray-300">
                    <thead className="bg-gray-300">
                        <tr>
                            <th className="py-2 px-4 border-b text-left text-gray-600">ID</th>
                            <th className="py-2 px-4 border-b text-left text-gray-600">Name</th>
                            <th className="py-2 px-4 border-b text-left text-gray-600">Order Date</th>
                            <th className="py-2 px-4 border-b text-left text-gray-600">Price</th>
                            <th className="py-2 px-4 border-b text-left text-gray-600">Status</th>
                            <th className="py-2 px-4 border-b text-left text-gray-600">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                    {/*{item.map((item) => (*/}
                    {/*    <tr className="hover:bg-gray-50" key={item.id}>*/}
                    {/*        <td className="py-2 px-4 border-b text-left text-gray-600">{item.ID}</td>*/}
                    {/*        <td className="py-2 px-4 border-b text-left text-gray-600">{item.Name}</td>*/}
                    {/*        <td className="py-2 px-4 border-b text-left text-gray-600">{item.OrderDate}</td>*/}
                    {/*        <td className="py-2 px-4 border-b text-left text-gray-600">{item.Price}</td>*/}
                    {/*        <td className="py-2 px-4 border-b text-left text-gray-600">{item.Status}</td>*/}
                    {/*        <td className="py-2 px-4 border-b text-left text-gray-600">*/}
                    {/*            <button onClick={toggle} className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm*/}
                    {/*             font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">*/}
                    {/*                <img src="/img/icons8-dot-100.png" alt=""/>*/}
                    {/*            </button>*/}
                    {/*        </td>*/}
                    {/*    </tr>*/}
                    {/*))}*/}
                    {Array.from({ length: 3 }, (_, index) => (
                        <tr className="" key={index}>
                            <td className="py-2 px-4 border-b text-left text-gray-600">1</td>
                            <td className="py-2 px-4 border-b text-left text-gray-600">Hoang</td>
                            <td className="py-2 px-4 border-b text-left text-gray-600"> 12/9/2024</td>
                            <td className="py-2 px-4 border-b text-left text-gray-600">150.000.000</td>
                            <td className="py-2 px-4 border-b text-left text-gray-600">Complete</td>
                                <td className="py-2 px-4 border-b text-left text-gray-600 relative">

                                            <button onClick={() => toggleMenu(index)} className="inline-flex justify-center px-4 py-2 bg-white  text-gray-700 focus:outline-none w-12 h-auto">
                                                <img className="w-full h-full" src="/img/icons8-dot-100.png" alt=""/>
                                            </button>
                            {openMenuIndex === index && (
                                <div className="absolute right-[120px] top-7 z-10 mt-2 w-48 rounded-md shadow-lg w-[100px] bg-white ring-1 ring-black ring-opacity-5">
                                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                    {/*Đường link của edit khi có db `/user/${item.ID}` */}
                                    <Link to={`/`} className="block flex items-center px-4 py-2 h-full text-center text-sm text-gray-700 hover:bg-gray-100"><img
                                        src="/img/icons8-eye-100.png" className="w-3 h-auto mx-1" alt=""/>view</Link>

                                    <Link to="/" className="block px-4 py-2 h-full flex items-center text-center text-sm text-gray-700 hover:bg-gray-100"><img
                                        src="/img/icons8-delete-100.png" className="w-3 h-auto mx-1" alt=""/>delete</Link>

                                    {/*<Button onClick={() => handleDeleteOrders(item.id)} className = "block px-4 py-2 h-full flex items-center text-center text-sm text-gray-700 hover:bg-gray-100">
                                    src="/img/icons8-delete-100.png" className="w-3 h-auto mx-1" alt=""/>delete</Button>*/}
                                </div>
                                </div>
                                )}
                                </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
    </div>
    );
};
export default Dashboard;
