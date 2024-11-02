import {useEffect, useRef,} from 'react'
import Modal from 'react-modal'
import {useFormik} from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";
import {useNavigate} from "react-router-dom";
import {Login} from "../../service/Auth.jsx";
import {jwtDecode} from "jwt-decode";

Modal.setAppElement('#root');
export const ModalLoginForm = ({isOpen, onRequestClose}) => {
    const modalRef = useRef(null);
    const navigate = useNavigate();

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
            email: '',
            password: ''
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().required('Email is required'),
            password: Yup.string().required('Password is required')
        }),
        onSubmit: async (values) => {
            try {
                const response = await Login(values);
                console.log(response)
                const {token, id} = response;
                localStorage.setItem('token', token);
                localStorage.setItem('userId', id);
                console.log(localStorage);
                const decodedToken = jwtDecode(token);
                localStorage.setItem('email', decodedToken.sub);
                const userRole = decodedToken.role;
                if (userRole === 'ROLE_USER') {
                    navigate("/Home");
                } else if (userRole === 'ROLE_MANAGER') {
                    navigate("/Admin/Dashboard");
                } else {
                    navigate("/");
                }
                onRequestClose();
            } catch (error) {
                console.error('Login failed: ', error);
                alert(error.message);
            }
        },
    });
    if (!isOpen) return null;
    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose}
               className={`w-full h-full flex flex-col items-center justify-center`}
               overlayClassName={`fixed inset-0 bg-black bg-opacity-50`}
        >
            <div ref={modalRef}
                 className={`w-3/5 h-3/4 bg-gradient-to-r from-cyan-100 via-violet-100 to-yellow-100 rounded-3xl p-6 shadow-2xl text-gray-700 flex`}>
                <div className={`w-1/2 h-full`}>
                    <img className={`w-full h-full object-cover`} src="/img/Koi_Image_Login.jpg" alt=""/>
                </div>
                <div className={`w-1/2 h-full flex flex-col justify-center ml-12`}>
                    <h2 className={`text-black text-4xl mb-8 font-semibold`}>Sign In</h2>
                    <form onSubmit={formik.handleSubmit} className="flex flex-col">
                        <div className="mb-4">
                            <div className="flex items-center justify-center border-b border-gray-700">
                                <img src="/img/icons8-user-100.png" className={`w-4 h-4`} alt=""/>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder={`Enter your email`}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.email}
                                    className={`mt-1 block w-full border focus:outline-none outline-none border-none bg-transparent     ${
                                        formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-none'
                                    } rounded-md shadow-sm p-2`}
                                />
                            </div>
                            {formik.touched.email && formik.errors.email ? (
                                <div className="text-red-500 text-sm">{formik.errors.email}</div>
                            ) : null}
                        </div>

                        <div className="mb-4">
                            <div className={`flex items-center justify-center border-b border-gray-700`}>
                                <img src="/img/icons8-password-100.png" className={`w-4 h-4`} alt=""/>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.password}
                                    placeholder={`Enter your password`}
                                    className={`mt-1 block w-full border focus:outline-none outline-none border-none bg-transparent ${
                                        formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-gray-300'
                                    } rounded-md shadow-sm p-2`}
                                />
                            </div>
                            {formik.touched.password && formik.errors.password ? (
                                <div className="text-red-500 text-sm">{formik.errors.password}</div>
                            ) : null}
                        </div>

                        <button
                            type="submit"
                            className="bg-blue-400 text-white rounded-lg w-1/3 p-4 hover:bg-blue-700"
                        >
                            Đăng nhập
                        </button>
                    </form>
                </div>
            </div>
        </Modal>
    );
}
ModalLoginForm.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onRequestClose: PropTypes.func.isRequired,
}