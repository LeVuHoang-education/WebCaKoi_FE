import {useEffect, useRef} from "react";
import Modal from "react-modal";
import {useFormik} from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";
import {Register} from "../../service/Auth.jsx";
import {useNavigate} from "react-router-dom";
import {cat} from "@cloudinary/url-gen/qualifiers/focusOn";

Modal.setAppElement('#root');
const API_BASE_URL = 'http://localhost:8080/api/v1/auth/register';
export const ModalSignupForm = ({isOpen, onRequestClose}) => {
    const modalRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onRequestClose();
            }
        };
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            document.addEventListener('mousedown', handleClickOutside);
        }else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = 'auto';
        };
    }, [isOpen, onRequestClose]);
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required('Name is required'),
            email: Yup.string().email('Invalid email format').required('Email is required'),
            phone: Yup.string().required('Phone is required'),
            password: Yup.string()
                .min(8, 'Password must be at least 8 characters')
                .matches(/[A-Z]/, 'Password must contain at least one upper case letters')
                .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
                .required('Password is required'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                .required('Confirm password is required'),

        }),
        onSubmit: async (values) => {
            try {
                const response = await Register(values);
                sessionStorage.setItem('userEmail', values.email);
                const userId = response.data.split("Id: ")[1].trim();
                localStorage.setItem("userID", userId);
                console.log(userId);
                navigate("/VerifyOTP");
                onRequestClose();
            }catch (error) {
                console.error('Register failed: ', error);
                alert(error.message);
            }
        }
    })

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose}
               className={`w-full h-full flex flex-col items-center justify-center`}
               overlayClassName={`fixed inset-0 bg-black bg-opacity-50`}
        >
            <style>
                {`
                    @keyframes move-up-down {
                        0%, 100% {
                            transform: translateY(0);
                        }
                        50% {
                            transform: translateY(-5px);
                        }
                    }
                    .hover\\:move-up-down:hover {
                        animation: move-up-down 0.6s ease-in-out infinite;
                    }
                `}
            </style>
            <div ref={modalRef} className={`w-3/5 h-4/5 bg-white rounded-lg p-6 shadow-2xl text-gray-700 flex`}>
                <div className={`w-1/2 h-2/3 flex flex-col justify-center ml-12 mt-12`}>
                    <h2 className={`text-black text-4xl mb-2 font-semibold`}>Sign Up</h2>
                    <form onSubmit={formik.handleSubmit} className="flex flex-col w-full h-full">
                        <div className="mb-2">
                            <div className="flex items-center justify-center border-b border-gray-700 w-2/3">
                                <img src="/img/icons8-user-100.png" className={`w-4 h-4`} alt=""/>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder={`Enter your full name`}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.name}
                                    className={`mt-1 block w-full border focus:outline-none outline-none border-none bg-transparent     ${
                                        formik.touched.name && formik.errors.name ? 'border-red-500' : 'border-none'
                                    } rounded-md shadow-sm p-2`}
                                />
                            </div>
                            {formik.touched.name && formik.errors.name ? (
                                <div className="text-red-500 text-sm">{formik.errors.name}</div>
                            ) : null}
                        </div>
                        <div className="mb-2">
                            <div className="flex items-center justify-center border-b border-gray-700 w-2/3">
                                <img src="/img/icons8-email-100.png" className={`w-4 h-4`} alt=""/>
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
                            <div className="flex items-center justify-center border-b border-gray-700 w-2/3">
                                <img src="/img/icons8-phone-100.png" className={`w-4 h-4`} alt=""/>
                                <input
                                    id="phone"
                                    name="phone"
                                    type="text"
                                    placeholder={`Enter your phone number`}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.phone}
                                    className={`mt-1 block w-full border focus:outline-none outline-none border-none bg-transparent     ${
                                        formik.touched.phone && formik.errors.phone ? 'border-red-500' : 'border-none'
                                    } rounded-md shadow-sm p-2`}
                                />
                            </div>
                            {formik.touched.phone && formik.errors.phone ? (
                                <div className="text-red-500 text-sm">{formik.errors.phone}</div>
                            ) : null}
                        </div>

                        <div className="mb-4">
                            <div className={`flex items-center justify-center border-b border-gray-700 w-2/3`}>
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
                        <div className="mb-4">
                            <div className={`flex items-center justify-center border-b border-gray-700 w-2/3`}>
                                <img src="/img/icons8-password-100.png" className={`w-4 h-4`} alt=""/>
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.confirmPassword}
                                    placeholder={`Enter your password`}
                                    className={`mt-1 block w-full border focus:outline-none outline-none border-none bg-transparent ${
                                        formik.touched.confirmPassword && formik.errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                                    } rounded-md shadow-sm p-2`}
                                />
                            </div>
                            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                                <div className="text-red-500 text-sm">{formik.errors.confirmPassword}</div>
                            ) : null}
                        </div>
                        <button
                            type="submit"
                            className="bg-gradient-to-r from-teal-400 via-violet-400 via-yellow-400 to-emerald-600 inline-block px-5 py-2.5 bg-blue-500 text-white border-none rounded-lg cursor-pointer w-1/2 transition-transform duration-300 hover:move-up-down"
                        >
                            Sign Up
                        </button>
                    </form>

                </div>
                <div className={`w-1/2 h-full grid grid-cols-2 gap-2`}>
                    <img className={`w-full h-full object-cover border rounded-l-full col-span-2`} src="/img/KoiPound1.webp" alt=""/>
                    <div className={`w-full h-full flex flex-col justify-center border-b border-gray-700 col-span-2`}>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

ModalSignupForm.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onRequestClose: PropTypes.func.isRequired,
};