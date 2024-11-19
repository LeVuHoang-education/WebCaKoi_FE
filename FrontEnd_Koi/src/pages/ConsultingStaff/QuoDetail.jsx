import { Modal, Descriptions, Spin, message } from "antd";
import { useState, useEffect } from "react";

const QuoDetail = ({ open, handleClose, quoId }) => {
  console.log("🚀 ~ OrderDetailsModal ~ open:", open);
  const [quoDetail, setQuoDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchQuoDetail = async () => {
    if (!quoId) {
      aler("bạn chưa lập bảng báo giá kìa!!");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:8081/api/v1/consulting-staff/quotations/${quoId}`,
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
        setQuoDetail(data.data);
      } else {
        message.error("Không thể lấy dữ liệu đơn hàng.");
      }
    } catch (error) {
      message.error("Đã xảy ra lỗi khi tải thông tin.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (quoId) {
      fetchQuoDetail();
    }
  }, [quoId]);

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
      ) : quoDetail ? (
        <Descriptions title="Thông tin bảng báo giá" bordered column={1}>
          <Descriptions.Item label="Quotation ID">
            {quoDetail.quotationId}
          </Descriptions.Item>
          <Descriptions.Item label="Quotation Number">
            {quoDetail.quotationNumber}
          </Descriptions.Item>
          <Descriptions.Item label="Customer Name">
            {quoDetail.customerName}
          </Descriptions.Item>
          <Descriptions.Item label="Phone Number">
            {quoDetail.phoneNumber}
          </Descriptions.Item>
          <Descriptions.Item label="Email">{quoDetail.email}</Descriptions.Item>
          <Descriptions.Item label="Address">
            {quoDetail.address}
          </Descriptions.Item>
          <Descriptions.Item label="Service Type">
            {quoDetail.serviceType}
          </Descriptions.Item>
          <Descriptions.Item label="Area Size">
            {quoDetail.areaSize}
          </Descriptions.Item>
          <Descriptions.Item label="Location">
            {quoDetail.location}
          </Descriptions.Item>
          <Descriptions.Item label="Design Details">
            {quoDetail.designDetails}
          </Descriptions.Item>
          <Descriptions.Item label="Material Cost">
            {quoDetail.materialCost}
          </Descriptions.Item>
          <Descriptions.Item label="Labor Cost">
            {quoDetail.laborCost}
          </Descriptions.Item>
          <Descriptions.Item label="Transportation Cost">
            {quoDetail.transportationCost}
          </Descriptions.Item>
          <Descriptions.Item label="Total Cost">
            {quoDetail.totalCost}
          </Descriptions.Item>
          <Descriptions.Item label="Payment Method">
            {quoDetail.paymentMethod}
          </Descriptions.Item>
          <Descriptions.Item label="Quotation Date">
            {quoDetail.quotationDate}
          </Descriptions.Item>
          <Descriptions.Item label="Expiration Date">
            {quoDetail.expirationDate}
          </Descriptions.Item>
          <Descriptions.Item label="Status">
            {quoDetail.status}
          </Descriptions.Item>
        </Descriptions>
      ) : (
        <p>Không có thông tin đơn hàng.</p>
      )}
    </Modal>
  );
};

export default QuoDetail;
