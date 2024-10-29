import {ConfirmAccount} from "../../service/Auth.jsx";
import {toast} from "react-toastify";
import {useState} from "react";


const VerifyOTP = () => {
    const [otp, setOtp] = useState(new Array(6).fill(''));
    const formatEmail = (email) => {
        const [localPart, domain] = email.split('@');
        const visibleLocalPart = localPart.slice(0, 3);
        const maskedLocalPart = '******';
        return `${visibleLocalPart}${maskedLocalPart}@${domain}`;
    };
    const email = formatEmail(sessionStorage.getItem('userEmail'));
    const userID = localStorage.getItem('userID');
    const handleChange = (e, index) => {
        const value = e.target.value;
        const newOTP = [...otp];

        if (value.length === 1) {
            newOTP[index] = value;
            setOtp(newOTP);
            if (index < 5) {
                e.target.nextElementSibling?.focus();
            }
        } else if (value.length > 1) {
            const chars = value.split('');
            chars.forEach((char, index) => {
                if (index < 6) {
                    newOTP[index] = char;
                }
            });
            setOtp(newOTP);
            if (chars.length > 0) {
                e.target.parentNode.children[Math.min(chars.length, 5)].focus();
            }
        } else {
            newOTP[index] = '';
            setOtp(newOTP);
            if (index > 0) {
                e.target.previousElementSibling?.focus();
            }
        }
    };
    const handlePaste = (e, index) => {
        e.preventDefault(); // Ngăn chặn hành vi dán mặc định
        const pastedData = e.clipboardData.getData('Text');
        const newOTP = [...otp];

        pastedData.split('').forEach((char, i) => {
            if (i < 6) {
                newOTP[i] = char; // Cập nhật mảng OTP
            }
        });
        setOtp(newOTP);
        if (pastedData.length > 0) {
            e.target.parentNode.children[Math.min(pastedData.length, 5)].focus(); // Chọn ô tiếp theo
        }
    };
    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && otp[index] === '') {
            // Nếu ô hiện tại trống và nhấn Backspace, chuyển về ô trước
            if (index > 0) {
                e.preventDefault(); // Ngăn chặn hành vi mặc định
                setOtp((prev) => {
                    const newOTP = [...prev];
                    newOTP[index - 1] = ''; // Xóa ô trước đó
                    return newOTP;
                });
                e.target.previousElementSibling?.focus(); // Chuyển đến ô trước
            }
        }
    };
    const handleSubmit = async () => {
        try {
            console.log('Session Storage:', sessionStorage);
            console.log('User Email from Session Storage:', sessionStorage.getItem('userEmail'));
            console.log('Local Storage:', localStorage);
            console.log('User ID from Local Storage:', localStorage.getItem('userID'));
            const otpCode = otp.join('');
            const id = localStorage.getItem('userID');
            const response = await ConfirmAccount(id,otpCode);
            if (response.status === 200) {
                toast.success('OTP xác nhận thành công!');
                toast.info('Tài khoản của bạn đã được kích hoạt. Đang chuyển hướng về trang chủ...');
                localStorage.setItem('toastMessage', 'Vui lòng đăng nhập bằng tài khoản vừa tạo.');
                setTimeout(() => {
                    window.location.href = "/";
                }, 5000);

            } else {
                toast.error('OTP không chính xác. Vui lòng thử lại.');
            }
        } catch (error) {
            toast.error('OTP không chính xác. Vui lòng thử lại.');
        }
    };

    return (
        <div
            className={`flex text-2xl text-gray-200 font-semibold text-center items-center justify-center w-screen h-screen bg-gradient-to-r from-pink-200 via-purple-700 to-blue-200`}>
            <div className={`p-2 m-auto w-1/2 h-1/2 rounded-3xl`}>
                <h1 className={`text-4xl py-5`}>OTP VERITIFY</h1>
                <h3 className={`text-2xl font-light mb-5`}>Mã OTP đã được gửi về {email}</h3>
                <div className={`mb-1`}>
                    {otp.map((data, index) => (
                        <input
                            type="text"
                            name="otp"
                            maxLength="1"
                            key={index}
                            value={data}
                            onChange={(e) => handleChange(e, index)}
                            onPaste={(e) => handlePaste(e, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            className="w-14 h-14 border-2 mr-5 text-black text-2xl rounded-lg text-center border-gray-600"
                        />
                    ))}
                </div>
                <br/>
                <div className={`group w-1/2 h-auto`}>
                    <button
                        className={`bg-opacity-30 bg-black p-5 rounded-3xl hover:bg-opacity-100 transition-transform duration-500 ease-in-out animate-infinite`}
                        onClick={handleSubmit}>Xác nhận
                    </button>
                </div>
            </div>
        </div>

    )
        ;
};

export default VerifyOTP;