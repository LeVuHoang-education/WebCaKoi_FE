import '../assets/css/header.css'; // Import CSS từ thư mục local
import logo from '../assets/image/logo.png'; // Import ảnh từ thư mục local
const Header = () => {
    return (
        <header>
            <div id="toggle-button">
                <i className="fas fa-bars"></i>
            </div>
            <nav>
                <img alt="Logo SGL" src={logo} />
                <ul id="main-menu">
                    <li><a href="#">Trang Chủ</a></li>
                    <li><a href="#">Giới Thiệu</a></li>
                    <li><a href="#">Dự Án</a></li>
                    <li className="has-submenu">
                        <a href="#">
                            Dịch Vụ
                            <i
                                className="fa-solid fa-chevron-down"
                                style={{ fontSize: '0.75em', marginLeft: '5px' }}
                            ></i>
                        </a>
                        <ul className="submenu">
                            <li><a href="#">Thiết Kế Và Thi Công Kiến Trúc</a></li>
                            <li><a href="#">Thiết Kế Và Thi Công Cảnh Quan</a></li>
                            <li><a href="#">Thiết Kế Và Thi Công Nhà Vườn</a></li>
                            <li><a href="#">Thiết Kế Và Thi Công Sân Vườn</a></li>
                            <li><a href="#">Thiết Kế Và Thi Công Hồ Cá Koi</a></li>
                        </ul>
                    </li>
                    <li><a href="#">Báo Giá</a></li>
                    <li><a href="#">Blog</a></li>
                    <li><a href="#">Liên Hệ</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
