import '../../assets/css/trangchu.css';
import slide1 from '../../assets/image/banner-trang-chu-1.jpg';
import slide2 from '../../assets/image/banner-trang-chu-2.jpg';
import slide3 from '../../assets/image/banner-trang-chu-3.jpg';
import trantrieuvy from '../../assets/image/tran-trieu-vy-avatar (1).png';
import langthongdong from '../../assets/image/lang-thong-dong-masterplan.jpg';
import pj1 from '../../assets/image/pj1.png';
import pj2 from '../../assets/image/pj2.jpg';
import pj3 from '../../assets/image/pj3.jpg';
import pj4 from '../../assets/image/pj4.jpg';
import pj5 from '../../assets/image/pj5.jpg';
import pj6 from '../../assets/image/pj6.jpg';
import pj7 from '../../assets/image/pj7.jpg';
import so1 from '../../assets/image/1.png';
import so2 from '../../assets/image/2.png';
import so3 from '../../assets/image/3.png';
import so4 from '../../assets/image/4.png';
import so5 from '../../assets/image/5.png';
import so6 from '../../assets/image/6.png';
import bannerfront from '../../assets/image/banner-front-page.jpg';
import blog1 from '../../assets/image/blog1.jpg';
import blog2 from '../../assets/image/blog2.jpg';
import blog3 from '../../assets/image/blog3.jpg';
import blog4 from '../../assets/image/blog4.jpg';
import blog5 from '../../assets/image/blog5.jpg';
import blog6 from '../../assets/image/blog6.jpg';
import Header from "../../components/header.jsx";
import Footer from "../../components/footer.jsx";


const Trangchu = () => {
    return (
        <div> <Header/>
        <div id="wrapper">
            <div className="slider">
                <div className="list">
                    <div className="item">
                        <img alt="slide-1" src={slide1}/>
                        <div className="text-banner">
                            <h1>KIẾN TẠO CUỘC SỐNG</h1>
                            <p>
                                Những không gian trở về, chữa lành luôn là điểm cuối cùng của mỗi sự
                                lựa chọn, khi bạn đã vất vả ngần ấy thời gian. Bây giờ hãy để cho
                                chúng tôi tạo cho bạn một không gian mà bạn mong đợi.
                            </p>
                            <button>Chi tiết</button>
                        </div>
                    </div>
                    <div className="item">
                        <img alt="slide2" src={slide2}/>
                        <div className="text-banner">
                            <h1>DESIGN &amp; BUILD</h1>
                            <p>
                                Chúng tôi tạo ra những khu vườn chỉnh chu từ thiết kế đến thi công,
                                các khu vườn triệu đô, thể hiện được vị thế và đẳng cấp của chủ đầu
                                tư. Nhưng trên hết hiệu quả và kiến tạo nơi chốn luôn được đặt lên
                                hàng đầu.
                            </p>
                            <button>Chi tiết</button>
                        </div>
                    </div>
                    <div className="item">
                        <img alt="" src={slide3}/>
                        <div className="text-banner">
                            <h1>
                                THIẾT KẾ <br/> KIẾN TRÚC CẢNH QUAN
                            </h1>
                            <p>
                                Chúng tôi tự hào là những người thiết kế kiến trúc cảnh quan và xây
                                dựng các giải pháp sáng tạo để giúp mọi người thực hiện tầm nhìn của
                                họ và biến chúng thành hiện thực. Thú vị đấy chứ?
                            </p>
                            <button>Chi tiết</button>
                        </div>
                    </div>
                </div>
                <div className="buttons">
                    <button id="prev">&lt;</button>
                    <button id="next">&gt;</button>
                </div>
                <ul className="dots">
                    <li className="active"/>
                    <li/>
                    <li/>
                </ul>
            </div>
            <div className="content">
                <div className="text-content">
                    <h3>
                        Tôi luôn ám ảnh việc biến những công trình cảnh quan thành những tác
                        phẩm nghệ thuật, phản ánh sự thành công và phong cách sống của khách
                        hàng.
                    </h3>
                </div>
                <div className="author">

                    <div id="text-author">
                        <img src={trantrieuvy} alt="Chữ ký" />
                        <h3>Trần Triệu Vỹ</h3>
                        <p>Founder & CEO</p>
                    </div>
                </div>
            </div>
            <div className="about-company">
                <div className="about-image">
                    <img alt="About Company" src={langthongdong}/>
                </div>
                <div className="about-content">
                    <span>[ ABOUT COMPANY ]</span>
                    <h2>SGL Vietnam</h2>
                    <div>
                        <p>
                            Chúng tôi hoạt động trong lĩnh vực tư vấn thiết kế kiến trúc, thiết kế
                            cảnh quan,...
                        </p>{" "}
                        <br/>
                        <ul>
                            <li>Thiết kế kiến trúc biệt thự, nhà vườn,...</li>
                            <li>Tư vấn quy hoạch và thiết kế cảnh quan</li>
                            <li>Quản lý dự án, giám sát thi công kiến trúc, cảnh quan</li>
                            <li>
                                Thi công công trình kiến trúc, cảnh quan, sân vườn biệt thự cao cấp
                            </li>
                        </ul>
                        <br/>
                        <p>
                            Với nhiều năm kinh nghiệm về thiết kế và thi công cảnh quan &amp; kiến
                            trúc đặc biệt là thiết kế nhà vườn, thiết kế sân vườn biệt thự, thiết
                            kế vườn phong cách Nhật, thiết kế hồ cá Koi,… chúng tôi đã thiết kế,
                            thi công kiến trúc và cảnh quan cho nhiều dự án lớn trên khắp cả nước.
                        </p>
                    </div>
                </div>
            </div>
            <div className="our-services">
                <span>[ Our Services ]</span>
                <h2>Dịch vụ chúng tôi cung cấp</h2>
                <div id="service-list">
                    <div className="service-item">
                        <div className="service-number">1</div>
                        <div className="service-name">Thiết kế thi công cảnh quan</div>
                    </div>
                    <div className="service-item">
                        <div className="service-number">2</div>
                        <div className="service-name">Thiết kế thi công nhà vườn</div>
                    </div>
                    <div className="service-item">
                        <div className="service-number">3</div>
                        <div className="service-name">Thiết kế thi công sân vườn</div>
                    </div>
                    <div className="service-item">
                        <div className="service-number">4</div>
                        <div className="service-name">Thiết kế thi công hồ cá koi</div>
                    </div>
                </div>
            </div>
            <div id="our-project">
                <div>
                    <span>[ OUR PROJECT ]</span>
                    <h2>Dự án nổi bật</h2>
                </div>
                <div>
                    <button>Chi Tiết</button>
                </div>
            </div>
            <div id="project-grid">
                <div className="project-item">
                    <img alt="Project 1" src={pj1}/>
                    <div className="overlay-text">VIEN LE JARDIN</div>
                </div>
                <div className="project-item">
                    <img alt="Project 2" src={pj2}/>
                    <div className="overlay-text">ONSEN GÒ VẤP</div>
                </div>
                <div className="project-item">
                    <img alt="Project 3" src={pj3}/>
                    <div className="overlay-text">DAKNONG FARMSTAY</div>
                </div>
                <div className="project-item">
                    <img alt="Project 4" src={pj4}/>
                    <div className="overlay-text">NHÀ MẪU LÀNG THONG DONG</div>
                    &lt;
                </div>
                <div className="project-item">
                    <img alt="Project 5" src={pj5}/>
                    <div className="overlay-text">PENTHOUSE OPAL TOWER</div>
                </div>
                <div className="project-item">
                    <img alt="Project 6" src={pj6}/>
                    <div className="overlay-text">
                        Vườn Tự Tại – Thiết kế khu tổ hợp chuyên đề Thiền tại Tp.Hồ Chí Minh
                    </div>
                </div>
                <div className="item-7 project-item">
                    <img alt="Project 7" src={pj7}/>
                    <div className="overlay-text">The Retreat Garden – Vườn Nhật Bản</div>
                </div>
            </div>
            <div id="our-process">
                <div id="process-title">
                    <span>[ OUR PROCESS ]</span>
                    <br/>
                    <h2>Quy trình thực hiện dự án</h2>
                </div>
            </div>
            <div id="process">
                <div id="process-list">
                    <div className="process-item">
                        <img alt="Process 1" src={so1}/>
                        <h3>Lập Nhiệm vụ và Báo giá</h3>
                        <p>
                            Bao gồm: NVTK &amp; moodboard - Tiến độ dự kiến - Báo giá &amp; hợp
                            đồng thiết kế
                        </p>
                    </div>
                    <div className="process-item">
                        <img alt="Process 2" src={so2}/>
                        <h3>Lập hồ sơ thiết kế ý tưởng</h3>
                        <p>
                            Bao gồm: Hình ảnh diễn họa 2D &amp; 3D - Thuyết minh, spec - Mô hình
                            mô phỏng
                        </p>
                    </div>
                    <div className="process-item">
                        <img alt="Process 3" src={so3}/>
                        <h3>Lập hồ sơ thiết kế cơ sở đến thi công</h3>
                        <p>Bao gồm hồ sơ thiết kế cơ sở và hồ sơ thiết kế thi công</p>
                    </div>
                    <div className="process-item">
                        <img alt="Process 4" src={so4}/>
                        <h3>Lập báo giá thi công</h3>
                        <p>
                            Bao gồm các công tác: BOQ, Khái toán, Dự toán theo định mức nhà
                            nước... Báo giá và hợp đồng
                        </p>
                    </div>
                    <div className="process-item">
                        <img alt="Process 5" src={so5}/>
                        <h3>Tổ chức thi công từ thô đến hoàn thiện</h3>
                        <p>Tổ chức thi công hoặc quản lý, điều phối và giám sát dự án</p>
                    </div>
                    <div className="process-item">
                        <img alt="Process 6" src={so6}/>
                        <h3>Nghiệm thu, bàn giao và bảo dưỡng</h3>
                        <p>
                            Nghiệm thu bàn giao, bảo hành, bảo dưỡng và lập hồ sơ hoàn công
                        </p>
                    </div>
                </div>
                <div id="experience">
                    <div className="experience-item">
                        <h2>70+</h2>
                        <p>DỰ ÁN</p>
                    </div>
                    <div className="experience-item">
                        <h2>10+</h2>
                        <p>NĂM KINH NGHIỆM</p>
                    </div>
                    <div className="experience-item">
                        <h2>50+</h2>
                        <p>KHÁCH HÀNG</p>
                    </div>
                    <div className="experience-item">
                        <h2>2</h2>
                        <p>VĂN PHÒNG</p>
                    </div>
                </div>
            </div>
            <div id="contentlh">
                <div className="text-content">
                    <h2>Liên hệ với chúng tôi!</h2>
                    <p>Mọi sự hài lòng của bạn là niềm kiêu hãnh của chúng tôi!</p>
                </div>
                <button>Nhận tư vấn</button>
            </div>
            <div id="our-skill">
                <div id="skill-content">
                    <div>
                        <span>[ our skills ]</span>
                        <h2>Giá trị cốt lõi</h2>
                    </div>
                    <div>
                        <p>
                            Chúng tôi không ngừng phát triển, học hỏi và cải tiến và các đối tác
                            của chúng tôi cũng không ngừng tăng lên.
                        </p>
                        <br/>
                        <ul>
                            <li>Hồ sơ, tiêu chuẩn và quy trình chuyên nghiệp</li>
                            <li>Đội ngũ nhiều kinh nghiệm, không outsource</li>
                            <li>Tư vấn toàn diện, không chỉ là giá trị thiết kế</li>
                        </ul>
                    </div>
                </div>
                <div id="skill-img">
                    <img alt="our skills" src={bannerfront}/>
                </div>
            </div>
            <div id="our-blog">
                <div id="blog-title">
                    <div>
                        <span>[ OUR BLOG ]</span>
                        <h2>Tin tức kiến trúc cảnh quan</h2>
                    </div>
                    <div>
                        <button>Chi Tiết</button>
                    </div>
                </div>
                <div id="blog-grid">
                    <div className="blog-item">
                        <a href="#">
                            <img alt="Blog 1" src={blog1}/>
                        </a>
                        <a href="#">
                            Kiến trúc Art Deco: Lịch sử phát triển \&amp; các công trình đặc sắc
                        </a>
                    </div>
                    <div className="blog-item">
                        <a href="#">
                            <img alt="Blog 2" src={blog2}/>
                        </a>
                        <a href="#">
                            Hướng dẫn trồng và chăm sóc hoa hồng trong chậu đúng kỹ thuật
                        </a>
                    </div>
                    <div className="blog-item">
                        <a href="#">
                            <img alt="Blog 3" src={blog3}/>
                        </a>
                        <a href="#">
                            \#6 thiết kế tiểu cảnh trong nhà đẹp được ưa chuộng nhất 2024
                        </a>
                    </div>
                    <div className="blog-item">
                        <a href="#">
                            <img alt="Blog 4" src={blog4}/>
                        </a>
                        <a href="#">TOP 10 mẫu thiết kế biệt thự nghỉ dưỡng lộng lẫy, xa hoa</a>
                    </div>
                    <div className="blog-item">
                        <a href="#">
                            <img alt="Blog 5" src={blog5}/>
                        </a>
                        <a href="#">Top mẫu đèn sân vườn đẹp, được ưa chuộng nhất 2024</a>
                    </div>
                    <div className="blog-item">
                        <a href="#">
                            <img alt="Blog 6" src={blog6}/>
                        </a>
                        <a href="#">Khám phá top những quán cafe sân vườn đẹp tại Sài Gòn</a>
                    </div>
                </div>
            </div>
        </div>
            <Footer/>
        </div>
    );
};

export default Trangchu;