import React, { useState } from "react";
import "./LoginPage.css";
import { useNavigate } from "react-router-dom";
const LoginPage = ({}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Hook điều hướng
  const handleLogin = async (e) => {
    e.preventDefault();

    // Gửi yêu cầu API đăng nhập
    try {
      const response = await fetch("http://localhost:8081/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email, // Gửi 'email' thay vì 'username'
          password,
        }),
      });

      const data = await response.json();
      const token = data.token; // Giả sử token trả về trong trường `token`

      // Lưu token vào localStorage hoặc sessionStorage
      localStorage.setItem("token", token);
      console.log(data); // Log response từ API

      // Kiểm tra mã trạng thái HTTP
      if (response.status === 200) {
        // Nếu mã trạng thái là 200 (thành công), điều hướng đến trang DesignStaffPage
        data.id === 6 ? navigate("/nhanvien") : navigate("/nhan-vien-tu-van");
      } else {
        // Nếu đăng nhập thất bại, hiển thị thông báo lỗi từ API
        setError(data.message || "Đăng nhập thất bại");
      }
    } catch (error) {
      // Xử lý lỗi khi không thể kết nối đến API
      setError("Lỗi kết nối API");
    }
    console.log("🚀 ~ handleLogin ~ token:", token);
  };

  return (
    <div>
      <h1>Đăng Nhập</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email" // Thay 'text' thành 'email' để giúp người dùng nhập email
            value={email} // Sử dụng 'email' thay vì 'username'
            onChange={(e) => setEmail(e.target.value)} // Thay 'setUsername' thành 'setEmail'
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Đăng Nhập</button>
      </form>
    </div>
  );
};

export default LoginPage;
