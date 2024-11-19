import { Modal, Descriptions, Spin, message } from "antd";
import { useState, useEffect } from "react";

const OrderDetailsModal = ({ open, handleClose, orderId }) => {
  console.log("🚀 ~ OrderDetailsModal ~ open:", open);
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchOrderDetails = async () => {
    if (!orderId) return;

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:8081/api/v1/consulting-staff/orders/${orderId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log("🚀 ~ fetchOrderDetails ~ data :", data);
        setOrderDetails(data.data);
      } else {
        message.error("Không thể lấy dữ liệu đơn hàng.");
      }
    } catch (error) {
      console.error("🚀 ~ fetchOrderDetails ~ error:", error);
      message.error("Đã xảy ra lỗi khi tải thông tin.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (orderId) {
      fetchOrderDetails();
    }
  }, [orderId]);

  return (
    <Modal
      open={open}
      onCancel={handleClose}
      footer={null}
      title="Chi tiết đơn hàng"
      height={1200}
      width={800} // Thêm chiều rộng cho Modal nếu cần
    >
      {loading ? (
        <Spin size="large" /> // Hiển thị loading spinner khi dữ liệu đang được tải
      ) : orderDetails ? (
        <Descriptions title="Thông tin đơn hàng" bordered column={1}>
          <Descriptions.Item label="Order ID">
            {orderDetails.orderId}
          </Descriptions.Item>
          <Descriptions.Item label="User ID">
            {orderDetails.userId}
          </Descriptions.Item>
          <Descriptions.Item label="Customer Name">
            {orderDetails.userName}
          </Descriptions.Item>
          <Descriptions.Item label="Order Number">
            {orderDetails.orderNumber}
          </Descriptions.Item>
          <Descriptions.Item label="User Phone">
            {orderDetails.userPhone}
          </Descriptions.Item>
          <Descriptions.Item label="Design Details">
            {orderDetails.designDetails}
          </Descriptions.Item>
          <Descriptions.Item label="Address">
            {orderDetails.address}
          </Descriptions.Item>
          <Descriptions.Item label="Service Type">
            {orderDetails.serviceType}
          </Descriptions.Item>
          <Descriptions.Item label="Start Date">
            {orderDetails.startDate}
          </Descriptions.Item>
          <Descriptions.Item label="End Date">
            {orderDetails.endDate}
          </Descriptions.Item>
          <Descriptions.Item label="Status">
            {orderDetails.status}
          </Descriptions.Item>
        </Descriptions>
      ) : (
        <p>Không có thông tin đơn hàng.</p>
      )}
    </Modal>
  );
};

export default OrderDetailsModal;
