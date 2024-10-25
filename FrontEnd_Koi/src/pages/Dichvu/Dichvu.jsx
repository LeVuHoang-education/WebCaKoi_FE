import React from 'react';
import { Link } from 'react-router-dom';
import banner from '../../assets/image/banner-chung-chinh-1920-700-e1697443857714.png';
import '../../assets/css/banner.css';
import './Dichvu.css';
import icon1 from "../../assets/image/iconbox2.png";
import icon2 from "../../assets/image/iconbox3.png";
import icon3 from "../../assets/image/iconbox5.png";

const services = [
    {
        id: 1,
        icon: icon1,
        title: "Thiết kế thi công hồ cá KOI",
        description: "Chúng tôi cung cấp dịch vụ toàn diện về lĩnh vực hồ cá koi. Tư vấn khảo sát tại nhà; lên ý tưởng thiết kế, thi công; bàn giao và bảo dưỡng hồ định kỳ.",
    },
    {
        id: 2,
        icon: icon1,
        title: "Thiết kế thi công cảnh quan",
        description: "Chúng tôi hoạt động trong lĩnh vực thiết kế và thi công cảnh quan, tích lũy kinh nghiệm với nhiều dự án cảnh quan: khu dân cư, nhà máy, resort, khu du lịch, homestay, nhà hàng, quán café,...",
    },
    {
        id: 3,
        icon: icon2,
        title: "Thiết kế thi công nhà vườn",
        description: "Chúng tôi mong muốn mang đến cho khách hàng những giá trị đích thực, một thiết kế không gian nhà vườn hoàn hảo để nghỉ ngơi thư giãn.",
    },
    {
        id: 4,
        icon: icon3,
            title: "Thiết kế thi công sân vườn",
        description: "Cung cấp dịch vụ tư vấn chuyên sâu, lên ý tưởng và đưa ra giải pháp về thiết kế, quy hoạch tổng thể những hạng mục thuộc kiến trúc cảnh quan sân vườn.",
    },
    {
        id: 5,
        icon: icon2,
        title: "Thiết kế thi công kiến trúc",
        description: "Chúng tôi cung cấp dịch vụ thiết kế kiến trúc cảnh quan, thi công kiến trúc cảnh quan, xây dựng công trình kiến trúc cảnh quan, cung cấp cây cảnh, cây công trình kiến trúc cảnh quan.",
    }
];

const ServiceCard = ({ id, icon, title, description, link }) => (
    <div className="service-card">
        <img src={icon} alt={title} className="service-icon" />
        <h3>{title}</h3>
        <p>{description}</p>
        <Link to={`/dichvu/${id}`} className="view-more">XEM THÊM</Link>
    </div>
);

const ServicesGrid = () => (
    <div className="services-container">
        <div className="services-grid">
            {services.map((service, index) => (
                <ServiceCard key={index} {...service} />
            ))}
        </div>
    </div>
);

const Dichvu = () => (
    <div>
        <div>
            <div className="hero" style={{ backgroundImage: `url(${banner})` }}>
                <div className="content-banner">
                    <h1 className="title">Dịch Vụ</h1>
                    <div className="breadcrumbs">
                        <ul>
                            <li><a href="/">Trang chủ</a></li>
                            <li>&raquo;</li>
                            <li>Dịch vụ</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <ServicesGrid />
    </div>
);

export default Dichvu;