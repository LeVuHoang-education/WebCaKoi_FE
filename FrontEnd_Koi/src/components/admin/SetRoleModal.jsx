import Modal from "react-modal";
import { useFormik } from "formik";
import PropTypes from "prop-types";
import {useEffect,useRef} from "react";
import {setRole} from "../../service/UserApi.jsx";

Modal.setAppElement("#root");

const SetRoleModal = ({isOpen, onRequestClose, user ,onUpdateSuccess}) => {
    if (!user) return null;
    const modalRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onRequestClose();
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, onRequestClose]);
    const getRoleValue = (roleName) => {
        switch (roleName) {
            case "ROLE_ADMIN":
                return "1";
            case "ROLE_USER":
                return "2";
            case "ROLE_CONSULTING_STAFF":
                return "3";
            case "ROLE_DESIGN_STAFF":
                return "4";
            case "ROLE_CONSTRUCTION_STAFF":
                return "5";
            case "ROLE_MANAGER":
                return "6";
            default:
                return "";
        }
    };

    const formik = useFormik({
        initialValues: {
            role: getRoleValue(user.roleName) || "",
        },
        enableReinitialize: true,
        onSubmit: async (values) => {
            try {
                await setRole(user.id, values.role);
                onUpdateSuccess();
                onRequestClose();
            } catch (e) {
                console.error("Error updating role:", e);
            }
        },
    });
    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose}
               className={`w-full h-full flex flex-col items-center justify-center`}
               overlayClassName={`fixed inset-0 bg-black bg-opacity-50`}
        >
            <div ref={modalRef} className={`w-1/4 h-auto bg-white rounded-lg p-6 shadow-2xl text-gray-700`}>
                <h2 className={`w-full h-auto text-2xl text-center mb-4`}>Phân quyền người dùng</h2>
                <h3 className={`w-full h-auto text-xl text-left mx-2 mb-4`}>ID: {user.id}</h3>
                <form onSubmit={formik.handleSubmit}>
                    <div className={`flex items-center justify-center mb-4`}>
                        <label htmlFor="role" className={`mx-2 `}>Vai trò</label>
                        <select
                            id="role"
                            name="role"
                            onChange={formik.handleChange}
                            value={formik.values.role}
                            required
                            className={`border border-gray-300 rounded p-2 w-auto focus:outline-none`}
                        >
                            <option value="">Vui lòng chọn quyền</option>
                            <option value="2">User</option>
                            <option value="3">Consulting staff</option>
                            <option value="4">Design staff</option>
                            <option value="5">Construction staff</option>
                        </select>
                    </div>
                    <div className={`flex items-center justify-center`}>
                        <button type="submit" className={`bg-blue-500 text-white px-4 py-2 rounded`}>Lưu</button>
                    </div>
                </form>
            </div>
        </Modal>
    )
}

SetRoleModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onRequestClose: PropTypes.func.isRequired,
    onUpdateSuccess: PropTypes.func,
    user: PropTypes.object,
};
export default SetRoleModal;