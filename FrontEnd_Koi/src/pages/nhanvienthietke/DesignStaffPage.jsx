import { useState } from "react";
import "./DesignStaffPage.css";

const DesignStaffPage = () => {
  const [currentTab, setCurrentTab] = useState("orders");
  const [orders, setOrders] = useState([]);
  const [newOrder, setNewOrder] = useState({
    customer: "",
    description: "",
    status: "",
  });
  const [isAddingOrder, setIsAddingOrder] = useState(false);
  const [editingOrderId, setEditingOrderId] = useState(null); // ID của đơn hàng đang được chỉnh sửa
  const [editingOrder, setEditingOrder] = useState({}); // Thông tin đơn hàng đang được chỉnh sửa

  // State quản lý dữ liệu form gửi tài liệu
  const [form, setForm] = useState({
    customerName: "",
    designFile: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleFileChange = (e) => {
    setForm((prevForm) => ({ ...prevForm, designFile: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Gửi tài liệu:", form);
    alert("Tài liệu đã được gửi thành công!");
  };

  const handleAddOrderClick = () => {
    setIsAddingOrder(true);
  };

  const handleNewOrderChange = (e) => {
    const { name, value } = e.target;
    setNewOrder((prevOrder) => ({ ...prevOrder, [name]: value }));
  };

  const handleSaveNewOrder = () => {
    setOrders((prevOrders) => [
      ...prevOrders,
      {
        id: prevOrders.length + 1,
        customer: newOrder.customer,
        description: newOrder.description,
        status: newOrder.status,
      },
    ]);
    setIsAddingOrder(false);
    setNewOrder({ customer: "", description: "", status: "" });
  };

  const handleEditClick = (order) => {
    setEditingOrderId(order.id);
    setEditingOrder({ ...order });
  };

  const handleEditOrderChange = (e) => {
    const { name, value } = e.target;
    setEditingOrder((prevOrder) => ({ ...prevOrder, [name]: value }));
  };

  const handleSaveEdit = () => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === editingOrderId ? { ...editingOrder } : order
      )
    );
    setEditingOrderId(null);
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
            Danh sách đơn hàng
          </li>
          <li
            className={currentTab === "upload" ? "active" : ""}
            onClick={() => setCurrentTab("upload")}
          >
            Gửi tài liệu thiết kế
          </li>
        </ul>
      </div>

      <div className="main-content">
        {currentTab === "orders" && (
          <section className="order-list">
            <h3>Đơn hàng chờ thiết kế</h3>

            {/* Hiển thị danh sách đơn hàng nếu có */}
            {orders.length > 0 ? (
              <ul>
                {orders.map((order) => (
                  <li key={order.id}>
                    {editingOrderId === order.id ? (
                      <>
                        <label>
                          Khách hàng:
                          <input
                            type="text"
                            name="customer"
                            value={editingOrder.customer}
                            onChange={handleEditOrderChange}
                          />
                        </label>
                        <br />
                        <label>
                          Mô tả:
                          <input
                            type="text"
                            name="description"
                            value={editingOrder.description}
                            onChange={handleEditOrderChange}
                          />
                        </label>
                        <br />
                        <label>
                          Trạng thái:
                          <input
                            type="text"
                            name="status"
                            value={editingOrder.status}
                            onChange={handleEditOrderChange}
                          />
                        </label>
                        <br />
                        <button onClick={handleSaveEdit} className="btn-save">
                          Lưu
                        </button>
                      </>
                    ) : (
                      <>
                        <strong>Khách hàng:</strong> {order.customer} <br />
                        <strong>Mô tả:</strong> {order.description} <br />
                        <strong>Trạng thái:</strong> {order.status} <br />
                        <button
                          onClick={() => handleEditClick(order)}
                          className="btn-update"
                        >
                          Cập nhật
                        </button>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p>Chưa có đơn hàng nào. Nhấn Thêm đơn hàng mới để bắt đầu.</p>
            )}

            {/* Nút thêm đơn hàng mới */}
            <button onClick={handleAddOrderClick} className="btn-add-order">
              Thêm đơn hàng mới
            </button>

            {/* Form thêm đơn hàng mới */}
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
                <button onClick={handleSaveNewOrder} className="btn-save">
                  Lưu đơn hàng
                </button>
              </div>
            )}
          </section>
        )}

        {currentTab === "upload" && (
          <section className="upload-form">
            <h3>Gửi tài liệu thiết kế</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Tên khách hàng:</label>
                <input
                  type="text"
                  name="customerName"
                  value={form.customerName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Tải lên file thiết kế:</label>
                <input
                  type="file"
                  name="designFile"
                  onChange={handleFileChange}
                  required
                />
              </div>
              <button type="submit" className="btn-submit">
                Gửi tài liệu
              </button>
            </form>
          </section>
        )}
      </div>
    </div>
  );
};

export default DesignStaffPage;
