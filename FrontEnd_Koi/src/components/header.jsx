import '../assets/css/header.css'; // Import CSS từ thư mục local
import logo from '../assets/image/logo.png'; // Import ảnh từ thư mục local
import {useState} from 'react'
import {ModalSignupForm} from "./form/modalSignupForm.jsx";
import {ModalLoginForm} from "./form/modalLoginForm.jsx";
import {Link} from "react-router-dom";

const Header = () => {
    const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
    const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
    const openSignUpModal = () => {
        setIsSignUpModalOpen(true);
    }
    const closeSignUpModal = () => {
        setIsSignUpModalOpen(false);
    }
    const openSignInModal = () => {
        setIsSignInModalOpen(true);
    }
    const closeSignInModal = () => {
        setIsSignInModalOpen(false);
    }
    const handleLogout = () => {
        localStorage.clear();
        sessionStorage.clear();
        window.location.reload();
    }

    const token = localStorage.getItem('token');
    return (
        <header>
            <div id="toggle-button">
                <i className="fas fa-bars"></i>
            </div>
            <nav>
                <img alt="Logo SGL" src={logo}/>
                <ul id="main-menu">
                    <li>
                        <Link to={`/Home`}>Trang chủ</Link>
                    </li>
                    <li>
                        <Link to={`/GioiThieu`}>Giới Thiệu</Link>
                    </li>
                    <li>
                        <Link to={`/Project`}>Dự án</Link>
                    </li>
                    <li className="has-submenu">
                        <a href="/Dichvu">
                            Dịch Vụ
                            <i
                                className="fa-solid fa-chevron-down"
                                style={{fontSize: '0.75em', marginLeft: '5px'}}
                            ></i>
                        </a>
                        <ul className="submenu">
                            <li><a href="/dichvu/1">Thiết Kế Và Thi Công Hồ Cá Koi</a></li>
                            <li><a href="/dichvu/2">Thiết Kế Và Thi Công Cảnh Quan</a></li>
                            <li><a href="/dichvu/3">Thiết Kế Và Thi Công Nhà Vườn</a></li>
                            <li><a href="/dichvu/4">Thiết Kế Và Thi Công Sân Vườn</a></li>
                            <li><a href="/dichvu/5">Thiết Kế Và Thi Công Kiến Trúc</a></li>

                        </ul>
                    </li>
                    <li><a href="/orderform">Báo Giá</a></li>
                    <li>
                        <Link to={`/Blog`}>Blog</Link>
                    </li>
                    <li><a href="#">Liên Hệ</a></li>
                    <li className="has-submenu">
                        <a href="#">
                            TÀI KHOẢN
                            <i
                                className="fa-solid fa-chevron-down"
                                style={{fontSize: '0.75em', marginLeft: '5px'}}
                            ></i>
                        </a>
                        {!token ? (
                            <ul className="submenu">
                                <li><a href="#" onClick={(e) => {
                                    e.preventDefault()
                                    openSignInModal()
                                }}>Đăng nhập</a></li>
                                <li><a href="#" onClick={(e) => {
                                    e.preventDefault()
                                    openSignUpModal()
                                }}>Đăng kí</a></li>
                            </ul>
                        ) : (
                            <ul className="submenu">
                                <li>
                                    <Link to={`/Profile`}>Thông tin cá nhân</Link>
                                </li>
                                <li>
                                    <Link to={`/MyOrders`}>Đơn hàng</Link>
                                </li>
                                <li>
                                    <a href="#" onClick={(e) => {
                                        e.preventDefault();
                                        handleLogout()
                                    }}>
                                        Đăng xuất
                                    </a>
                                </li>
                            </ul>
                        )}
                    </li>
                </ul>
            </nav>
            <ModalSignupForm isOpen={isSignUpModalOpen}
                             onRequestClose={closeSignUpModal}/>
            <ModalLoginForm isOpen={isSignInModalOpen}
                            onRequestClose={closeSignInModal}/>
        </header>
    )
        ;
};

export default Header;
