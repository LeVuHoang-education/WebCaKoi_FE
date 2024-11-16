import '../assets/css/footer.css';
import logo from '../assets/image/logo-footer-1.png'
const Footer = () => {
    return (
        <footer>
            <div className="container-footer">
                <div className="footer-content"  >
                    <img alt="logo" height="100" src={logo}width="260"/>
                    <h3> Công ty TNHH Kiến trúc Cảnh quan SGL</h3>
                    <p><i className="fas fa-map-marker-alt"></i> Studio: 57 đường Vành Đai Tây, An Khánh, Tp. Thủ Đức,
                        Tp. HCM
                    </p>
                    <p><i className="fas fa-map-marker-alt"></i> Văn phòng: Số A-12a-1 Tầng 12a, Block A, Tòa nhà
                        Centana Thủ
                        Thiêm, 36 Mai Chí Thọ, P.An Phú, TP.Thủ Đức, TP.HCM</p>
                    <p><i className="fas fa-map-marker-alt"></i> Xưởng gỗ: Đường Vĩnh Phú 14, Vĩnh Phú, Thuận An, Bình
                        Dương</p>
                    <p><i className="fas fa-phone"></i> Điện thoại: 0903 957 033</p>
                    <p><i className="fas fa-fax"></i> Số Fax: 0964 3899</p>
                    <p><i className="fas fa-envelope"></i> Email: info@sgl.com.vn</p>
                    <p><i className="fas fa-id-card"></i> Mã số doanh nghiệp: 0316287084 cấp ngày 26/05/2020 tại Sở Kế
                        hoạch và
                        Đầu tư Thành phố Hồ Chí Minh</p>
                    <ul className="social-icons">
                        <li><a href=""><i className="fab fa-facebook"></i></a></li>
                        <li><a href=""><i className="fab fa-twitter"></i></a></li>
                        <li><a href=""><i className="fab fa-instagram"></i></a></li>
                        <li><a href=""><i className="fab fa-linkedin"></i></a></li>
                    </ul>
                </div>
                <div className="footer-content">
                    <h3>Dịch Vụ</h3>
                    <ul className="list">
                        <li><a href=""><i className="fas fa-caret-right"></i> Thiết kế & thi công kiến trúc</a></li>
                        <li><a href=""><i className="fas fa-caret-right"></i> Thiết kế biệt thự nhà vườn</a></li>
                        <li><a href=""><i className="fas fa-caret-right"></i> Thiết kế & thi công cảnh quan</a></li>
                        <li><a href=""><i className="fas fa-caret-right"></i> Thiết kế & thi công sân vườn biệt thự</a>
                        </li>
                        <li><a href=""><i className="fas fa-caret-right"></i> Thiết kế & thi công hồ cá KOI</a></li>
                        <li><a href=""><i className="fas fa-caret-right"></i> Thiết kế & thi công vườn tường đứng cây
                            xanh</a>
                        </li>
                    </ul>
                </div>
                <div className="footer-content">
                    <h3>Yêu Cầu Báo Giá</h3>
                    <h3>Hotline: 0903 957 033</h3>
                    <button><a href="/orderform">Gửi yêu cầu báo giá</a></button>
                    <p>Chứng chỉ Năng lực Hoạt động Xây dựng Cấp III. Số: HCM-00046954, cấp ngày 19/10/2020 tại Sở Kế
                        hoạch
                        và Đầu tư thành phố Hồ Chí Minh.</p>
                    <br/><a href="http://online.gov.vn/Home/WebDetails/75802" rel="nofollow" target="_blank">

                    <noscript><img alt="SGL - đã thông báo bộ công thương"
                                   className="attachment-full size-full wp-image-6804"
                                   height="68"
                                   src="https://sgl.com.vn/wp-content/uploads/2020/02/sgl-da-thong-bao-bo-cong-thuong.webp"
                                   width="180"/>
                    </noscript>
                </a>
                </div>
            </div>
            <div className="bottom-bar">
                <p>&copy; 2024 Team B - JAVA . All rights reserved</p>
            </div>
        </footer>

    );
};

export default Footer;