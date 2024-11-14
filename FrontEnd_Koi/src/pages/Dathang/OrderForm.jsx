import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './OrderForm.css';
import banner from '../../assets/image/banner-chung-chinh-1920-700-e1697443857714.png';
import { addOrder, addMaintenance, fetchOrders } from '../../service/UserOrderApi.jsx';
import moment from 'moment';
import { ModalLoginForm } from '../../components/form/modalLoginForm.jsx';

const OrderForm = () => {
    const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [formType, setFormType] = useState('order'); // State to store the selected form type
    const [orders, setOrders] = useState([]); // Initialize as an empty array

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            setIsSignInModalOpen(true);
        } else {
            setIsLoggedIn(true);
            fetchUserOrders(); // Fetch orders when user is logged in
        }
    }, []);

    const fetchUserOrders = async () => {
        try {
            const orders = await fetchOrders();
            setOrders(Array.isArray(orders.data) ? orders.data : []);
            console.log('Fetched orders:', orders);
        } catch (error) {
            console.error('Error fetching orders:', error);
            setOrders([]);
        }
    };

    const closeSignInModal = () => {
        setIsSignInModalOpen(false);
    };

    const formik = useFormik({
        initialValues: {
            designDetails: '',
            serviceType: '',
            userPhone: '',
            startDate: '',
            address: '',
            content: '',
            orderId: ''
        },
        validationSchema: Yup.object().shape({
            designDetails: Yup.string().required('Chi tiết thiết kế là bắt buộc'),
            serviceType: Yup.string().required('Loại dịch vụ là bắt buộc'),
            userPhone: Yup.string().required('Số điện thoại là bắt buộc'),
            startDate: Yup.date().required('Ngày bắt đầu là bắt buộc'),
            address: Yup.string().required('Địa chỉ là bắt buộc'),
            content: Yup.string().when('formType', {
                is: 'maintenance',
                then: Yup.string().required('Chi tiết bảo trì là bắt buộc')
            }),
            orderId: Yup.string().when('formType', {
                is: 'maintenance',
                then: Yup.string().required('Order ID là bắt buộc')
            }),
        }),
        onSubmit: async (values) => {
            if (!isLoggedIn) {
                alert('Bạn cần đăng nhập để gửi yêu cầu.');
                return;
            }
            try {
                const formattedValues = {
                    ...values,
                    startDate: moment(values.startDate).format('DD-MM-YYYY')
                };
                if (formType === 'maintenance') {
                    const response = await addMaintenance(formattedValues.orderId, formattedValues);
                    console.log('Maintenance submitted successfully:', response);
                    alert('Maintenance submitted successfully!');
                } else if (formType === 'order') {
                    const response = await addOrder(formattedValues);
                    console.log('Order submitted successfully:', response);
                    alert('Order submitted successfully!');
                }
                fetchUserOrders();
            } catch (error) {
                console.error('Error during submission:', error.message);
                alert('Gửi yêu cầu không thành công. Vui lòng thử lại!');
            }
        },
    });

    return (
        <div>
            <ModalLoginForm isOpen={isSignInModalOpen} onRequestClose={closeSignInModal}/>
            <div className="hero" style={{backgroundImage: `url(${banner})`}}>
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
            <div>
                <div className="form-selection">
                    <button className="form-button" onClick={() => setFormType('order')}>Yêu cầu báo giá</button>
                    <button className="form-button" onClick={() => setFormType('maintenance')}>Yêu cầu bảo dưỡng</button>
                </div>
                {!isLoggedIn && <div className="overlay-message">Yêu cầu đăng nhập để sử dụng tính năng này</div>}
                <div className={`order-container ${!isLoggedIn ? 'blurred' : ''}`}>
                    {formType === 'order' && (
                        <>
                            <form className="order-form" onSubmit={formik.handleSubmit}>
                                <h2>Đăng ký nhận báo giá ngay hôm nay!</h2>
                                <div className="form-row">
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            id="address"
                                            name="address"
                                            placeholder="Địa chỉ*"
                                            value={formik.values.address}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className={formik.touched.address && formik.errors.address ? 'input-error' : ''}
                                            required
                                        />
                                        {formik.touched.address && formik.errors.address ? (
                                            <div className="error-message">{formik.errors.address}</div>
                                        ) : null}
                                    </div>
                                    <div className="form-group">
                                        <select
                                            id="serviceType"
                                            name="serviceType"
                                            value={formik.values.serviceType}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className={formik.touched.serviceType && formik.errors.serviceType ? 'input-error' : ''}
                                            required
                                        >
                                            <option value="">Chọn dịch vụ*</option>
                                            <option value="0">Thiết kế</option>
                                            <option value="1">Bảo dưỡng</option>
                                        </select>
                                        {formik.touched.serviceType && formik.errors.serviceType ? (
                                            <div className="error-message">{formik.errors.serviceType}</div>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <input
                                            type="tel"
                                            id="userPhone"
                                            name="userPhone"
                                            placeholder="Số điện thoại*"
                                            value={formik.values.userPhone}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className={formik.touched.userPhone && formik.errors.userPhone ? 'input-error' : ''}
                                            required
                                        />
                                        {formik.touched.userPhone && formik.errors.userPhone ? (
                                            <div className="error-message">{formik.errors.userPhone}</div>
                                        ) : null}
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="date"
                                            id="startDate"
                                            name="startDate"
                                            placeholder="Ngày bắt đầu*"
                                            value={formik.values.startDate}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className={formik.touched.startDate && formik.errors.startDate ? 'input-error' : ''}
                                            required
                                        />
                                        {formik.touched.startDate && formik.errors.startDate ? (
                                            <div className="error-message">{formik.errors.startDate}</div>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="note">
                                    <input
                                        type="text"
                                        id="designDetails"
                                        name="designDetails"
                                        placeholder="Chi tiết thiết kế*"
                                        value={formik.values.designDetails}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className={formik.touched.designDetails && formik.errors.designDetails ? 'input-error' : ''}
                                        required
                                    />
                                    {formik.touched.designDetails && formik.errors.designDetails ? (
                                        <div className="error-message">{formik.errors.designDetails}</div>
                                    ) : null}
                                </div>
                                <button type="submit" className="submit-btn" disabled={!isLoggedIn}>Gửi Yêu Cầu</button>
                                <p className="note">*Thường phản hồi trong vòng 24h làm việc</p>
                            </form>
                            <div className="contact-details">
                                <h3>THÔNG TIN LIÊN HỆ</h3>
                                <h2>Để bắt đầu một dự án mới!</h2>
                                <p>Hãy gọi cho chúng tôi hoặc ghé qua bất cứ lúc nào, chúng tôi cố gắng trả lời mọi thắc mắc
                                    trong
                                    vòng 24 giờ vào các ngày làm việc. Rất hân hạnh được trả lời câu hỏi của bạn.</p>
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
                        </>
                    )}
                    {formType === 'maintenance' && (
                        <>
                            <div className="contact-details">
                                <h3>THÔNG TIN LIÊN HỆ</h3>
                                <h2>Để bắt đầu một dự án mới!</h2>
                                <p>Hãy gọi cho chúng tôi hoặc ghé qua bất cứ lúc nào, chúng tôi cố gắng trả lời mọi
                                    thắc mắc trong
                                    vòng 24 giờ vào các ngày làm việc. Rất hân hạnh được trả lời câu hỏi của
                                    bạn.</p>
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
                            <form className="order-form" onSubmit={formik.handleSubmit}>
                                <h2>Đăng ký bảo trì ngay hôm nay!</h2>
                                <div className="form-group" style={{width: '100%'}}>
                                    <select
                                        id="orderId"
                                        name="orderId"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.orderId}
                                    >
                                        <option value="" label="Chọn đơn hàng"/>
                                        {orders.map((order) => (
                                            <option key={order.orderId} value={order.orderId}>
                                                {order.orderNumber}
                                            </option>
                                        ))}
                                    </select>
                                    {formik.touched.orderId && formik.errors.orderId ? (
                                        <div className="error">{formik.errors.orderId}</div>
                                    ) : null}
                                </div>
                                <div className="note">
                                    <input
                                        type="text"
                                        id="content"
                                        name="content"
                                        placeholder="Chi tiết đơn bảo dưỡng"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.content}
                                    />
                                    {formik.touched.content && formik.errors.content ? (
                                        <div className="error">{formik.errors.content}</div>
                                    ) : null}
                                </div>
                                <button type="submit" className="submit-btn" disabled={!isLoggedIn}>Gửi Yêu Cầu</button>
                                <p className="note">*Thường phản hồi trong vòng 24h làm việc</p>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OrderForm;