import Modal from 'react-modal';
import PropTypes from "prop-types";
import {getOrderDetail} from "../../service/OrderDetailApi.jsx";
import {useEffect, useRef, useState} from "react";

Modal.setAppElement('#root');

const OrderDetailModal = ({ isOpen, onRequestClose, order }) => {
    const [dataOrders, setDataOrders] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const modalRef = useRef(null);
    useEffect(()=>{
        if(order && isOpen) {
            const getOrder = async () => {
                try {
                    const data = await getOrderDetail(order.id);
                    setDataOrders(data);
                }catch (error) {
                    setError(error.message);
                }finally {
                    setLoading(false);
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
    if(loading) return (
        <div>Loading....</div>
    )
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
                    <div className={`text-gray-700 font-semibold`}>Order ID: <span
                        className={`font-light`}> {dataOrders.id}</span></div>
                    <div className={`text-gray-700 font-semibold`}>Name: <span
                        className={` font-light`}>{dataOrders.name}</span></div>

                    <div className={`text-gray-700 font-semibold`}>Customer: <span
                        className={`font-light`}>{dataOrders.customer}</span></div>
                    <div className={`text-gray-700 font-semibold`}>Category: <span
                        className={`font-light`}>{dataOrders.category}</span></div>


                    <div className={`text-gray-700 font-semibold`}>Location: <span
                        className={`font-light`}>{dataOrders.location}</span></div>
                    <div className={`text-gray-700 font-semibold`}>Area: <span
                        className={`font-light`}>{dataOrders.area}</span></div>

                    <div className={`col-span-2`}>
                        <img src={dataOrders.image} alt="" className="w-full h-auto"/>
                    </div>

                    <div className={`col-span-2`}>Description: <span>{dataOrders.description}</span></div>
                </div>
            </div>
        </Modal>
    );
};


OrderDetailModal.propTypes = {
    isOpen: PropTypes.bool,
    onRequestClose: PropTypes.func,
    order: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        area: PropTypes.number.isRequired,
        location: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        customer: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
    })
};

export default OrderDetailModal;