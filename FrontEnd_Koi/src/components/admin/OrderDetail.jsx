import Modal from 'react-modal';
import PropTypes from "prop-types";
import {useEffect, useRef, useState} from "react";
import {fetchOrdersById} from "../../service/OrdersApi.jsx";

Modal.setAppElement('#root');

const   OrderDetailModal = ({ isOpen, onRequestClose, order }) => {
    const [dataOrders, setDataOrders] = useState(null);
    const [error, setError] = useState(null);
    const modalRef = useRef(null);
    useEffect(()=>{
        if(order && isOpen) {
            const getOrder = async () => {
                try {
                    const data = await fetchOrdersById(order.orderId);
                    setDataOrders(data.data);
                }catch (error) {
                    setError(error.message);
                }
            };
            getOrder();
        }
    },[order,isOpen]);

    useEffect(() => {
        const handleClickOutside = (event) => {

            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onRequestClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onRequestClose]);
    if(error) return (
        <div>Error: {error.message}</div>
    )
    if (!order || !dataOrders) return null;
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className={`w-full h-full flex flex-col items-center justify-center`}
            overlayClassName={`fixed inset-0 bg-black bg-opacity-50`}
            shouldCloseOnOverlayClick={true}
        >
            <div ref={modalRef} className={`relative w-1/2 max-w-screen-md bg-white rounded-lg p-6 bg-[url('/img/25097.jpg')] bg-cover bg-center`}>
                <button
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
                    onClick={onRequestClose}
                >
                    &#x2715;
                </button>

                <div className={`grid grid-cols-2 overflow-auto gap-5 `}>
                    <div className={`text-gray-700 font-semibold`}>Mã đơn hàng: <span
                        className={`font-light`}> {dataOrders.orderNumber}</span></div>
                    <div className={`text-gray-700 font-semibold`}>Tiêu đề: <span
                        className={` font-light`}>{dataOrders.title}</span></div>

                    <div className={`text-gray-700 font-semibold`}>Số điện thoại: <span
                        className={`font-light`}>{dataOrders.userPhone}</span></div>
                    <div className={`text-gray-700 font-semibold`}>Loại dịch vụ: <span
                        className={`font-light`}>{dataOrders.serviceType}</span></div>


                    <div className={`text-gray-700 font-semibold`}>Ngày bắt đầu: <span
                        className={`font-light`}>{dataOrders.startDate}</span></div>
                    <div className={`text-gray-700 font-semibold`}>Ngày kết thúc: <span
                        className={`font-light`}>{dataOrders.endDate}</span></div>

                    <div className={`col-span-2`}>
                        <img src={dataOrders.image} alt="" className="w-full h-auto"/>
                    </div>

                    <div className={`col-span-2 font-semibold`}>Mô tả: <span className={`font-light`}>{dataOrders.designDetails}</span></div>
                </div>
            </div>
        </Modal>
    );
};


OrderDetailModal.propTypes = {
    isOpen: PropTypes.bool,
    onRequestClose: PropTypes.func,
    order: PropTypes.shape({
        orderId: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        orderNumber: PropTypes.string.isRequired,
        userPhone: PropTypes.string.isRequired,
        designDetails: PropTypes.string.isRequired,
        serviceType: PropTypes.string.isRequired,
        startDate: PropTypes.string.isRequired,
        endDate: PropTypes.string.isRequired,
    })
};

export default OrderDetailModal;