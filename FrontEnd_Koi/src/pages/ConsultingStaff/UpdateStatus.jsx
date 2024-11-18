import { Button, message, Modal, Input, Select } from "antd";
import { useState } from "react";

const UpdateStatus = ({ orderId, open, handleClose }) => {
  const token = localStorage.getItem("token");

  const [status, setStatus] = useState("");

  // Hàm gửi form khi người dùng bấm nút
  const handleSubmit = async () => {
    // Kiểm tra nếu tất cả các trường đã được nhập
    if (!status) {
      message.error("Chưa đủ thông tin.");
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:8081/api/v1/consulting-staff/orders/change-status/${orderId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json", // Đảm bảo gửi JSON
            Authorization: `Bearer ${token}`, // Nếu cần token
          },
          body: JSON.stringify({ status }), // Chuyển đối tượng thành chuỗi JSON
        }
      );

      if (response.ok) {
        message.success("Dữ liệu đã được gửi thành công.");
      } else {
        const errorData = await response.json();
        message.error(
          `Cập nhật thất bại: ${errorData.message || "Có lỗi xảy ra"}`
        );
      }
    } catch (error) {
      message.error("Có lỗi xảy ra khi gửi dữ liệu.");
      console.error("Error:", error);
    }
  };

  return (
    <Modal
      open={open}
      onCancel={handleClose}
      footer={null}
      title="sữa đổi trạng thái"
    >
      <Select
        placeholder="Chọn một tùy chọn"
        style={{ width: 200 }}
        value={status}
        onChange={(value) => setStatus(value)}
      >
        <Option value="PENDING">PENDING</Option>
        <Option value="INPROGRESS">INPROGRESS</Option>
        <Option value="COMPLETED">COMPLETED</Option>
        <Option value="CANCELED">CANCELED</Option>
      </Select>
      <Button
        type="primary"
        onClick={handleSubmit}
        style={{ marginTop: "1rem" }}
      >
        Gửi
      </Button>
    </Modal>
  );
};

export default UpdateStatus;
