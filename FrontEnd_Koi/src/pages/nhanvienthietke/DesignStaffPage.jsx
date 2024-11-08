import React, { useState } from "react";
import "./DesignStaffPage.css";

const DesignStaffPage = () => {
  const [currentTab, setCurrentTab] = useState("viewOrders");
  const [isFormVisible, setIsFormVisible] = useState(false); // Form không hiển thị mặc định

  const [orders, setOrders] = useState([
    {
      id: 1,
      customerId: "KH001",
      customer: "Khách hàng A",
      description: "Thiết kế mẫu nhà 2 tầng",
    },
    {
      id: 2,
      customerId: "KH002",
      customer: "Khách hàng B",
      description: "Thiết kế nội thất văn phòng",
    },
    {
      id: 3,
      customerId: "KH003",
      customer: "Khách hàng C",
      description: "Thiết kế bản vẽ quán cafe",
    },
  ]);

  const [newRecord, setNewRecord] = useState({
    customerId: "",
    customer: "",
    description: "",
    image: null,
  });

  // Hàm gửi thiết kế và hiển thị thông báo
  const handleSubmitDesign = () => {
    alert("Đã gửi bản thiết kế cho khách hàng");
    setIsFormVisible(false); // Ẩn form sau khi gửi thiết kế
  };

  // Hàm thay đổi ảnh
  const handleImageChange = (e) => {
    setNewRecord({
      ...newRecord,
      image: e.target.files[0],
    });
  };

  // Hàm mở form khi nhấn "Tạo mới"
  const handleNewDesign = () => {
    setNewRecord({
      customerId: "",
      customer: "",
      description: "",
      image: null,
    });
    setIsFormVisible(true); // Hiển thị form tạo mới
  };

  return (
    <div className="design-staff-page">
      <div className="sidebar">
        <h2>Quản lý thiết kế</h2>
        <ul>
          <li
            className={currentTab === "viewOrders" ? "active" : ""}
            onClick={() => setCurrentTab("viewOrders")}
          >
            Xem tất cả đơn hàng cần thiết kế bản vẽ
          </li>
          <li
            className={currentTab === "createRecord" ? "active" : ""}
            onClick={() => setCurrentTab("createRecord")}
          >
            Tạo hồ sơ thiết kế bản vẽ
          </li>
        </ul>
      </div>

      <div className="main-content">
        {/* View Orders Tab */}
        {currentTab === "viewOrders" && (
          <section className="order-list">
            <h3>Danh sách đơn hàng chờ thiết kế</h3>
            {orders.length > 0 ? (
              <ul>
                {orders.map((order) => (
                  <li key={order.id}>
                    <strong>ID Khách hàng:</strong> {order.customerId} <br />
                    <strong>Khách hàng:</strong> {order.customer} <br />
                    <strong>Mô tả:</strong> {order.description} <br />
                  </li>
                ))}
              </ul>
            ) : (
              <p>Không có đơn hàng nào.</p>
            )}
          </section>
        )}

        {/* Create Design Record Tab */}
        {currentTab === "createRecord" && (
          <section className="create-record-form">
            <h3>Tạo Hồ Sơ Thiết Kế Bản Vẽ</h3>

            {/* Nút "Tạo mới" */}
            <button
              onClick={handleNewDesign}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                backgroundColor: "#007bff", // Màu nền nút
                color: "white", // Màu chữ
                padding: "15px 30px", // Làm nút lớn hơn
                fontSize: "1em", // Tăng kích thước chữ
                border: "none",
                borderRadius: "5px", // Bo tròn các góc
                cursor: "pointer", // Con trỏ chuột khi hover
                transition: "background-color 0.3s, box-shadow 0.3s", // Hiệu ứng chuyển màu và đổ bóng
              }}
              className="new-design-btn"
            >
              Tạo mới
            </button>

            {/* Form sẽ hiển thị khi nhấn "Tạo mới" */}
            {isFormVisible && (
              <>
                <input
                  type="text"
                  name="customerId"
                  placeholder="ID Khách hàng"
                  value={newRecord.customerId}
                  onChange={(e) =>
                    setNewRecord({ ...newRecord, customerId: e.target.value })
                  }
                  required
                />
                <input
                  type="text"
                  name="customer"
                  placeholder="Tên khách hàng"
                  value={newRecord.customer}
                  onChange={(e) =>
                    setNewRecord({ ...newRecord, customer: e.target.value })
                  }
                  required
                />
                <input
                  type="text"
                  name="description"
                  placeholder="Mô tả"
                  value={newRecord.description}
                  onChange={(e) =>
                    setNewRecord({ ...newRecord, description: e.target.value })
                  }
                  required
                />
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                />

                {/* Nút gửi thiết kế */}
                <button onClick={handleSubmitDesign}>Gửi thiết kế</button>
              </>
            )}
          </section>
        )}
      </div>
    </div>
  );
};

export default DesignStaffPage;
