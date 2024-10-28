import React, { useState } from 'react';
import './OrderForm.css';
import banner from '../../assets/image/banner-chung-chinh-1920-700-e1697443857714.png';

const OrderForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        gardenSize: '',
        service: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form data submitted:', formData);
    };

    return (
        <div >
            <div className="hero" style={{ backgroundImage: `url(${banner})` }}>
                <div className="content-banner">
                    <h1 className="title">Đăng Ký Nhận Báo Giá</h1>
                    <div className="breadcrumbs">
                        <ul>
                            <li><a href="/">Trang chủ</a></li>
                            <li>&raquo;</li>
                            <li>Báo Giá</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="order-container">
                <form className="order-form" onSubmit={handleSubmit}>
                    <h2>Đăng ký nhận báo giá ngay hôm nay!</h2>
                    <div className="form-row">
                        <div className="form-group">
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Họ tên*"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Email*"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                placeholder="Số điện thoại*"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                id="address"
                                name="address"
                                placeholder="Địa chỉ*"
                                value={formData.address}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <input
                                type="number"
                                id="gardenSize"
                                name="gardenSize"
                                placeholder="Diện tích sân vườn (m²)*"
                                value={formData.gardenSize}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <select
                                id="service"
                                name="service"
                                value={formData.service}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Chọn dịch vụ*</option>
                                <option value="koi-pond">Thiết kế & Thi công hồ cá Koi</option>
                                <option value="garden-design">Thiết kế nhà vườn</option>
                                <option value="landscape-design">Thiết kế & Thi công cảnh quan</option>
                                <option value="garden-construction">Thiết kế & Thi công sân vườn</option>
                                <option value="architecture-design">Thiết kế kiến trúc</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group full-width">
                    <textarea
                        id="message"
                        name="message"
                        placeholder="Nội dung yêu cầu"
                        value={formData.message}
                        onChange={handleChange}
                    />
                    </div>
                    <button type="submit" className="submit-btn">Gửi Yêu Cầu</button>
                    <p className="note">*Thường phản hồi trong vòng 24h làm việc</p>
                </form>
                <div className="contact-details">
                    <h3>(OUR CONTACT DETAILS)</h3>
                    <h2>Để bắt đầu một dự án mới!</h2>
                    <p>
                        Hãy gọi cho chúng tôi hoặc ghé qua bất cứ lúc nào, chúng tôi cố gắng trả lời
                        mọi thắc mắc trong vòng 24 giờ vào các ngày làm việc. Rất hân hạnh được trả
                        lời câu hỏi &nbsp; của bạn.
                    </p>
                    <div className="company-info">
                        <h4>SGL VIETNAM</h4>
                        <ul>
                            <li>Mã số thuế: 0316287084</li>
                            <li>Studio: 57 đường Vành Đai Tây, An Khánh, Tp. Thủ Đức, Tp. HCM</li>
                            <li>
                                Văn phòng: Số A-12a-1 Tầng 12a, Block A, Tòa nhà Centana Thủ Thiêm, 36
                                Mai Chí Thọ, P.An Phú, TP. Thủ Đức, TP.HCM
                            </li>
                            <li>Hotline: 0903 957 033</li>
                            <li>Email: info@sgl.com.vn</li>
                            <li>Website: sgl.com.vn</li>
                            <li>Google Sites: sites.google.com/site/slandcape</li>
                            <li>Google My Business: saigonSGL Vietnam.business.site</li>
                        </ul>
                    </div>
                    <div className="social-icons">
                        <a href="#" className="fab fa-facebook-f"/>
                        <a href="#" className="fab fa-instagram"/>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default OrderForm;
