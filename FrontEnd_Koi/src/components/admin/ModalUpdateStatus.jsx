import Modal from 'react-modal';
import {useFormik} from 'formik';
import PropTypes from "prop-types";
import {patchOrder} from "../../service/OrdersApi.jsx";
import {useEffect, useRef} from "react";

Modal.setAppElement('#root');

const UpdateStatus = ({isOpen, onRequestClose, order,onUpdateSuccess}) => {
    if (!order) return null;
    const modalRef = useRef(null);
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
    const formik = useFormik({
        initialValues: {
            status: order.status || '',
        },
        enableReinitialize: true,
        onSubmit: async (values) => {
            try {
                await patchOrder(order.orderId, {status: values.status});
                onUpdateSuccess();
                onRequestClose();
            } catch (e) {
                console.error('Error updating status:', e);
            }
        },
    });

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose}
               className={`w-full h-full flex flex-col items-center justify-center`}
               overlayClassName={`fixed inset-0 bg-black bg-opacity-50`}
        >
            <div ref={modalRef} className={`w-1/4 h-auto bg-white rounded-lg p-6 shadow-2xl text-gray-700`}>
                <h2 className={`w-full h-auto text-2xl text-center mb-4`}>Update Order Status</h2>
                <h3 className={`w-full h-auto text-xl text-left mx-2 mb-4`}>ID: {order.orderNumber}</h3>
                <form onSubmit={formik.handleSubmit}>
                    <div className={`flex items-center justify-center mb-4 p-2 rounded-lg`}>
                        <label htmlFor="status" className={`mx-2 `}>Status: </label>
                        <select
                            id="status"
                            name="status"
                            onChange={formik.handleChange}
                            value={formik.values.status}
                            required
                            className={`border-none rounded p-2  w-full focus:outline-none`}
                        >
                            <option value="" disabled>Select Status</option>
                            <option value="INPROGRESS">INPROGRESS</option>
                            <option value="COMPLETED">COMPLETED</option>
                        </select>
                    </div>
                    <div className={`flex items-center justify-evenly mb-4 pb-4`}>
                        <button
                            className={`bg-blue-400 text-white rounded px-4 py-2 transform duration-500 hover:bg-blue-700`}
                            type="submit">Update Status
                        </button>
                        <button
                            className={`bg-blue-400 text-white rounded px-4 py-2 transform duration-500 hover:bg-blue-700`}
                            type="button" onClick={onRequestClose}>Cancel
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
}

UpdateStatus.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onRequestClose: PropTypes.func.isRequired,
    onUpdateSuccess: PropTypes.func.isRequired,
    order: PropTypes.shape({
        orderId: PropTypes.number.isRequired,
        orderNumber: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
    }),
}

export default UpdateStatus;
