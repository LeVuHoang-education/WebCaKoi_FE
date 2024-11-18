import { Modal, Descriptions, Spin, message } from "antd";
import { useState, useEffect } from "react";

const ManDetail = ({ open, handleClose, maintenanceID }) => {
  const token = localStorage.getItem("token");
  console.log("🚀 ~ OrderDetailsModal ~ open:", open);
  const [maindetail, setMainDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [maindetailId, setMaindetailId] = useState(null); // Lưu orderId sau khi tạo
  const fetchMainDetail = async () => {
    if (!maintenanceID) {
      aler("bạn chưa lập bảng báo giá kìa!!");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `http://localhost:8081/api/v1/consulting-staff/maintenance/${maintenanceID}`,
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
        setMaindetailId(data.data.maintenanceID);
        message.success("đã lấy thành công");
        setMainDetail(data.data);
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
    if (maintenanceID) {
      fetchMainDetail();
    }
  }, [maintenanceID]);

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
      ) : maindetail ? (
        <Descriptions title="Thông tin bảng bảo trì" bordered column={1}>
          <Descriptions.Item label="Maintenance ID">
            {maindetail.maintenanceID}
          </Descriptions.Item>
          <Descriptions.Item label="Price">
            {maindetail.price}
          </Descriptions.Item>
          <Descriptions.Item label="User ID">
            {maindetail.userId}
          </Descriptions.Item>
          <Descriptions.Item label="Construction Staff">
            {maindetail.constructionStaff}
          </Descriptions.Item>
          <Descriptions.Item label="Start Date">
            {maindetail.startDate}
          </Descriptions.Item>
          <Descriptions.Item label="End Date">
            {maindetail.endDate}
          </Descriptions.Item>
          <Descriptions.Item label="Content">
            {maindetail.content}
          </Descriptions.Item>
        </Descriptions>
      ) : (
        <p>Không có thông tin đơn hàng.</p>
      )}
    </Modal>
  );
};

export default ManDetail;
