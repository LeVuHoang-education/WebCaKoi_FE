import React from 'react';
import { useParams } from 'react-router-dom';
import { pagesData } from './DichvuData.jsx';
import banner from '../../assets/image/banner-chung-chinh-1920-700-e1697443857714.png';
import '../../assets/css/banner.css';
import './Dichvu.css';
import StepProcess from './ProcessStep.jsx';

const menuItems = [
    "THIẾT KẾ & THI CÔNG HỒ CÁ KOI",
    "THIẾT KẾ NHÀ VƯỜN",
    "THIẾT KẾ & THI CÔNG CẢNH QUAN",
    "THIẾT KẾ & THI CÔNG SÂN VƯỜN",
    "THIẾT KẾ KIẾN TRÚC",

];


const DichvuDetail = () => {
    const { id } = useParams();
    const service = pagesData.find(service => service.id === parseInt(id));

    if (!service) {
        return <div>Service not found</div>;
    }

    return (
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
            <div className="dichvu-content">
                <div>
                    <div className="toc">
                        <ul>
                            {service.content.map((section, index) => (
                                <li key={index}>
                                    <a href={`#section-${index}`} className="main-heading">{section.heading}</a>
                                    {section.subheading && (
                                        <ul>
                                            <li><a href={`#section-${index}`}
                                                   className="sub-heading">{section.subheading}</a></li>
                                        </ul>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="menu-services">
                        <h2>DỊCH VỤ</h2>
                        <ul>
                            {menuItems.map((item, index) => (
                                <li key={index} className={index === 4 ? "active" : ""}>
                                    <a href={`#service-${index}`}>{item}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="service-details">
                    {service.content.map((section, index) => (
                        <div key={index} id={`section-${index}`} className="service-detail">
                            <h1><strong>{section.heading}</strong></h1>
                            <h2><strong>{section.subheading}</strong></h2>
                            <div>{section.text}</div>
                        </div>
                    ))}
                    <StepProcess stepKey={id}/>
                </div>
            </div>
        </div>
    );
};

export default DichvuDetail;