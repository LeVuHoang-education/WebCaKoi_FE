import { useState } from "react";
import "./DesignStaffPage.css";

const DesignStaffPage = () => {
  const [currentTab, setCurrentTab] = useState("orders");
  const [orders, setOrders] = useState([]);
  const [newOrder, setNewOrder] = useState({
    customer: "",
    description: "",
    status: "",
    designFile: null,
  });
  const [isAddingOrder, setIsAddingOrder] = useState(false);

  const handleAddOrderClick = () => {
    setIsAddingOrder(true);
  };

  const handleNewOrderChange = (e) => {
    const { name, value } = e.target;
    setNewOrder((prevOrder) => ({ ...prevOrder, [name]: value }));
  };

  const handleFileChange = (e) => {
    setNewOrder((prevOrder) => ({
      ...prevOrder,
      designFile: e.target.files[0],
    }));
  };

  const handleSaveNewOrder = () => {
    const newOrderWithId = {
      ...newOrder,
      id: orders.length + 1,
    };
    setOrders((prevOrders) => [...prevOrders, newOrderWithId]);
    setNewOrder({
      customer: "",
      description: "",
      status: "",
      designFile: null,
    });
    setIsAddingOrder(false);

    console.log("New Order with Document:", newOrderWithId);
    alert("Đơn hàng và tài liệu đã được thêm thành công!");
  };

  return (
    <div className="design-staff-page">
      <div className="sidebar">
        <h2>Quản lý thiết kế</h2>
        <ul>
          <li
            className={currentTab === "orders" ? "active" : ""}
            onClick={() => setCurrentTab("orders")}
          >
            Thông tin đơn hàng
          </li>
        </ul>
      </div>

      <div className="main-content">
        {currentTab === "orders" && (
          <section className="order-list">
            <h2>Đơn hàng chờ thiết kế</h2>

            {orders.length > 0 ? (
              <ul>
                {orders.map((order) => (
                  <li key={order.id}>
                    <strong>Khách hàng:</strong> {order.customer} <br />
                    <strong>Mô tả:</strong> {order.description} <br />
                    <strong>Trạng thái:</strong> {order.status} <br />
                    {order.designFile && (
                      <p>
                        <strong>Tài liệu thiết kế:</strong>{" "}
                        {order.designFile.name}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p>Chưa có đơn hàng nào. Nhấn Thêm đơn hàng mới để bắt đầu.</p>
            )}

            <button onClick={handleAddOrderClick} className="btn-add-order">
              Thêm đơn hàng mới
            </button>

            {isAddingOrder && (
              <div className="new-order-form">
                <h4>Thêm đơn hàng mới</h4>
                <input
                  type="text"
                  name="customer"
                  placeholder="Tên khách hàng"
                  value={newOrder.customer}
                  onChange={handleNewOrderChange}
                  style={{
                    padding: "8px",
                    width: "100%",
                    marginBottom: "10px",
                  }}
                />
                <input
                  type="text"
                  name="description"
                  placeholder="Mô tả đơn hàng"
                  value={newOrder.description}
                  onChange={handleNewOrderChange}
                  style={{
                    padding: "8px",
                    width: "100%",
                    marginBottom: "10px",
                  }}
                />
                <input
                  type="text"
                  name="status"
                  placeholder="Trạng thái"
                  value={newOrder.status}
                  onChange={handleNewOrderChange}
                  style={{
                    padding: "8px",
                    width: "100%",
                    marginBottom: "10px",
                  }}
                />
                <div className="form-group">
                  <label>Tải lên file thiết kế:</label>
                  <input
                    type="file"
                    name="designFile"
                    onChange={handleFileChange}
                    style={{
                      padding: "8px",
                      width: "100%",
                      marginBottom: "10px",
                    }}
                    required
                  />
                </div>
                <button onClick={handleSaveNewOrder} className="btn-save">
                  Lưu đơn hàng và tài liệu
                </button>
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
};

export default DesignStaffPage;
