import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css'
import Dashboard from "./pages/admin/Dashboard.jsx";
import Trangchu from "./pages/Trangchu/Trangchu.jsx";
import UserManage from "./pages/admin/UserManage.jsx";
import OrdersManage from "./pages/admin/OrdersManage.jsx";
import AdminRoute from "./components/admin/AdminRoute.jsx";
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



function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    {/*Phần route dành cho user*/}
                    <Route path="/" element={<UserRoute element={Trangchu} />} />
                    <Route path="/Home" element={<UserRoute element={Trangchu} />} />
                    <Route path="/Project" element={<UserRoute element={ProjectPage} />}/>
                    <Route path="/project/:projectName" element={<UserRoute element={ProjectDetail} />} />
                    <Route path={"/VerifyOTP"} element={<VerifyOTP />} />

                    <Route path="/Blog" element={<UserRoute element={BlogPage}/>} />
                    <Route path="/blog/:blogName" element={<UserRoute element={BlogDetail} />}/>
                    <Route path="/category/:categoryName" element={<UserRoute element={BlogCategory} />} />

                    <Route path="/Dichvu" element={<UserRoute element={Dichvu} />} />
                    <Route path="/dichvu/:id" element={<UserRoute element={DichvuDetail} />} />

                    <Route path="/OrderForm" element={<UserRoute element={OrderForm} />} />

                    {/*Phần route dành cho admin*/}
                    <Route path="/Admin/dashboard" element={<AdminRoute element={Dashboard} />} />
                    <Route path="/Admin/user" element={<AdminRoute element={UserManage} />}/>
                    <Route path="/Admin/orders" element={<AdminRoute element={OrdersManage} />}/>
                    <Route path="/Admin/ProjectManage" element={<AdminRoute element={ProjectManage} />}/>
                </Routes>
            </Router>
        </div>
    )
}

export default App;
