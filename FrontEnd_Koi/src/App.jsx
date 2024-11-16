import {Routes, Route} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import './App.css'
import Dashboard from "./pages/admin/Dashboard.jsx";
import Trangchu from "./pages/Trangchu/Trangchu.jsx";
import UserManage from "./pages/admin/UserManage.jsx";
import OrdersManage from "./pages/admin/OrdersManage.jsx";
import AdminRoute from "./components/admin/AdminRoute.jsx";
import RatingManage from "./pages/admin/RatingManage.jsx";
import ProjectManage from "./pages/admin/ProjectManage.jsx";
import UserRoute from "./components/UserRoute.jsx";
import VerifyOTP from "./pages/Confirm/VerifyOTP.jsx";
import ProjectPage from "./pages/Duan/ProjectPage.jsx";
import ProjectDetail from "./pages/Duan/ProjectDetail.jsx";
import BlogPage from "./pages/Blog/Blog_page.jsx";
import BlogDetail from "./pages/Blog/Blog_detail.jsx";
import BlogCategory from "./pages/Blog/Blog_category.jsx";
import Dichvu from "./pages/Dichvu/Dichvu.jsx";
import DichvuDetail from "./pages/Dichvu/DichvuDetail.jsx";
import OrderForm from "./pages/Dathang/OrderForm.jsx";
import {useEffect} from "react";
import {jwtDecode} from "jwt-decode";
import {useNavigate} from "react-router-dom";
import GioiThieu from "./pages/gioithieu/gioithieu.jsx";
import DesignStaffPage from "./pages/nhanvienthietke/DesignStaffPage.jsx";
import Csbm from "./pages/csbm/csbm.jsx";
import Profile from "./pages/User/profile/profilePage.jsx";
import MyOrders from "./pages/User/MyOrder/MyOrderPage.jsx";
import OrderDetail from "./pages/User/MyOrder/projectDetail.jsx";
import Quotations from "./pages/User/Quotations/quotationsPage.jsx";
import QuotationDetail from "./pages/User/Quotations/quotationDetail.jsx";
import Designs from "./pages/User/Designs/designPage.jsx";
import {useState} from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");
function App() {
    const navigate = useNavigate();
    const [isFirstLoad, setIsFirstLoad] = useState(true);
    useEffect(() => {
        const FirstLoad = sessionStorage.getItem('FirstLoad');

        if (!FirstLoad) {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const decoded = jwtDecode(token);
                    const userRole = decoded.role;
                    const currentPath = window.location.pathname;

                    if (userRole === 'ROLE_MANAGER' && currentPath !== '/Admin/dashboard') {
                        navigate('/Admin/dashboard');
                    } else if (userRole === 'ROLE_USER' && currentPath !== '/Home') {
                        navigate('/Home');
                    }
                } catch (error) {
                    console.error("Token decoding failed:", error);
                }
            } else {
                navigate('/Home');
            }

            sessionStorage.setItem('FirstLoad', 'true');
            const currentPath = window.location.pathname;
            if(currentPath === '/blog/:blogName') {
                navigate('/blog/:blogName');
            }
            setIsFirstLoad(false);
        }
    }, [navigate, isFirstLoad]);
        return (
            <div className="App">
                <ToastContainer/>

                    <Routes>
                        {/*Phần route dành cho user*/}
                        <Route path="/" element={<UserRoute element={<Trangchu/>}/>}/>
                        <Route path="/Home" element={<UserRoute element={<Trangchu/>}/>}/>
                        <Route path="/Project" element={<UserRoute element={<ProjectPage/>}/>}/>
                        <Route path="/project/:projectName" element={<UserRoute element={<ProjectDetail/>}/>}/>
                        <Route
                            path="/GioiThieu"
                            element={<UserRoute element={<GioiThieu/>} />}
                        />
                        <Route path="/nhanvien" element={<DesignStaffPage />} />
                        <Route path="/csbm" element={<UserRoute element={<Csbm/>} />} />

                        <Route path={"/VerifyOTP"} element={<VerifyOTP/>}/>

                        <Route path="/Blog" element={<UserRoute element={<BlogPage/>}/>}/>
                        <Route path="/blog/:blogName" element={<UserRoute element={<BlogDetail/>}/>}/>
                        <Route path="/category/:categoryName" element={<UserRoute element={<BlogCategory/>}/>}/>

                        <Route path="/Dichvu" element={<UserRoute element={<Dichvu/>}/>}/>
                        <Route path="/dichvu/:id" element={<UserRoute element={<DichvuDetail/>}/>}/>

                        <Route path="/OrderForm" element={<UserRoute element={<OrderForm/>}/>}/>

                        <Route path="/Profile" element={<UserRoute element={<Profile/>} />} />
                        <Route path="/MyOrders" element={<UserRoute element={<MyOrders/>} />} />
                        <Route path="/MyOrders/:orderId" element={<UserRoute element={<OrderDetail/>} />} />
                        <Route path="/Quotations" element={<UserRoute element={<Quotations/>} />} />
                        <Route path="/Quotations/:quotationId" element={<UserRoute element={<QuotationDetail/>} />}/>
                        <Route path="/Designs" element={<UserRoute element={<Designs/>} />}/>
                        {/*Phần route dành cho admin*/}
                        <Route path="/Admin/dashboard" element={<AdminRoute element={<Dashboard />}/>}/>
                        <Route path="/Admin/user" element={<AdminRoute element={ <UserManage />}/>}/>
                        <Route path="/Admin/orders" element={<AdminRoute element={<OrdersManage/>}/>}/>
                        <Route path="/Admin/ProjectManage" element={<AdminRoute element={<ProjectManage/>}/>}/>
                        <Route path="/Admin/RatingManage" element={<AdminRoute element={<RatingManage/>}/>}/>
                    </Routes>
            </div>
    )
}

export default App;
