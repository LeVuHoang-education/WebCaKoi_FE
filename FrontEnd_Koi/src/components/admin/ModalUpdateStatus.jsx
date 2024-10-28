import Modal from 'react-modal';
import {useFormik} from 'formik';
import PropTypes from "prop-types";
import {patchOrder} from "../../service/OrdersApi.jsx";
import {useEffect, useRef} from "react";

Modal.setAppElement('#root');

const UpdateStatus = ({isOpen, onRequestClose, order}) => {
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
                await patchOrder(order.id, {status: values.status});
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
                <h3 className={`w-full h-auto text-xl text-left mx-2 mb-4`}>ID: {order.id}</h3>
                <form onSubmit={formik.handleSubmit}>
                    <div className={`flex items-center justify-center mb-4`}>
                        <label htmlFor="status" className={`mx-2 `}>Status</label>
                        <select
                            id="status"
                            name="status"
                            onChange={formik.handleChange}
                            value={formik.values.status}
                            required
                            className={`border border-gray-300 rounded p-2 w-full focus:outline-none`}
                        >
                            <option value="" disabled selected>Select Status</option>
                            <option value="Đang yêu cầu">Requesting</option>
                            <option value="Đang thiết kế">Designing</option>
                            <option value="Đang thi công">Building</option>
                            <option value="Hoàn thiện">Complete</option>
                        </select>
                    </div>
                    <div className={`flex items-center justify-evenly mb-4`}>
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
    order: PropTypes.shape({
        id: PropTypes.number.isRequired,
        status: PropTypes.string.isRequired,
    }),
}

export default UpdateStatus;
