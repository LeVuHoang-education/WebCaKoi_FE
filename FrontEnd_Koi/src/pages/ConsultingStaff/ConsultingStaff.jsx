import { useState } from "react";
import "./ConsultingStaff.css";

const ConsultingStaff = () => {
  const [currentTab, setCurrentTab] = useState("orders");
  const [orders, setOrders] = useState([
    {
      id: 1,
      name: "Đơn hàng A",
      status: "Chờ xác nhận",
      description: "Mô tả đơn hàng A",
    },
    {
      id: 2,
      name: "Đơn hàng B",
      status: "Đang xử lý",
      description: "Mô tả đơn hàng B",
    },
    {
      id: 3,
      name: "Đơn hàng C",
      status: "Đã hoàn thành",
      description: "Mô tả đơn hàng C",
    },
  ]);
  const [maintenances, setMaintenances] = useState([
    {
      id: 101,
      customer: "Khách hàng X",
      description: "Bảo trì máy A",
      status: "Chờ xử lý",
    },
    {
      id: 102,
      customer: "Khách hàng Y",
      description: "Bảo trì máy B",
      status: "Đang xử lý",
    },
  ]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedMaintenance, setSelectedMaintenance] = useState(null);
  const [status, setStatus] = useState("");
  const [searchId, setSearchId] = useState("");

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setStatus(order.status);
    setSelectedMaintenance(null);
  };

  const handleMaintenanceClick = (maintenance) => {
    setSelectedMaintenance(maintenance);
    setStatus(maintenance.status);
    setSelectedOrder(null);
  };

  const handleGenerateQuote = () => {
    alert("Bảng báo giá đã được lập!");
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSaveStatus = () => {
    const updateItem = selectedOrder || selectedMaintenance;
    const updatedList = (selectedOrder ? orders : maintenances).map((item) =>
      item.id === updateItem.id ? { ...item, status } : item
    );
    selectedOrder ? setOrders(updatedList) : setMaintenances(updatedList);
    alert("Trạng thái đã được cập nhật!");
  };

  const filteredMaintenances = maintenances.filter(
    (maintenance) => searchId === "" || maintenance.id.toString() === searchId
  );

  return (
    <div className="management-page">
      <div className="sidebar">
        <h2>Quản lý</h2>
        <ul>
          <li
            className={currentTab === "orders" ? "active" : ""}
            onClick={() => setCurrentTab("orders")}
          >
            Quản lý đơn hàng
          </li>
          <li
            className={currentTab === "maintenance" ? "active" : ""}
            onClick={() => setCurrentTab("maintenance")}
          >
            Quản lý bảo trì
          </li>
        </ul>
      </div>

      <div className="main-content">
        {currentTab === "orders" && (
          <section className="order-management">
            <div className="order-header">
              <h3>Danh sách đơn hàng</h3>
            </div>
            <div className="order-list">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="order-item"
                  onClick={() => handleOrderClick(order)}
                >
                  <strong>{order.name}</strong>
                  <p>Trạng thái: {order.status}</p>
                </div>
              ))}
            </div>

            {selectedOrder && (
              <div className="order-detail">
                <h4>Chi tiết đơn hàng: {selectedOrder.name}</h4>
                <p>
                  <strong>Mô tả:</strong> {selectedOrder.description}
                </p>
                <div className="status-container">
                  <strong>Trạng thái:</strong>
                  <div>
                    <input
                      type="radio"
                      id="pending"
                      name="status"
                      value="Chờ xác nhận"
                      checked={status === "Chờ xác nhận"}
                      onChange={handleStatusChange}
                    />
                    <label htmlFor="pending">Chờ xác nhận</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="processing"
                      name="status"
                      value="Đang xử lý"
                      checked={status === "Đang xử lý"}
                      onChange={handleStatusChange}
                    />
                    <label htmlFor="processing">Đang xử lý</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="completed"
                      name="status"
                      value="Đã hoàn thành"
                      checked={status === "Đã hoàn thành"}
                      onChange={handleStatusChange}
                    />
                    <label htmlFor="completed">Đã hoàn thành</label>
                  </div>
                </div>
                <button onClick={handleSaveStatus} className="btn-save">
                  Lưu trạng thái
                </button>
                <button onClick={handleGenerateQuote} className="btn-quote">
                  Lập bảng báo giá
                </button>
              </div>
            )}
          </section>
        )}

        {currentTab === "maintenance" && (
          <section className="maintenance-management">
            <h3>Quản lý bảo trì</h3>
            <input
              type="text"
              placeholder="Tìm đơn bảo trì theo ID"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
            />
            <div className="maintenance-list">
              {filteredMaintenances.map((maintenance) => (
                <div
                  key={maintenance.id}
                  className="maintenance-item"
                  onClick={() => handleMaintenanceClick(maintenance)}
                >
                  <strong>ID: {maintenance.id}</strong>
                  <p>Khách hàng: {maintenance.customer}</p>
                </div>
              ))}
            </div>

            {selectedMaintenance && (
              <div className="maintenance-detail">
                <h4>Chi tiết đơn bảo trì: {selectedMaintenance.customer}</h4>
                <p>
                  <strong>Mô tả:</strong> {selectedMaintenance.description}
                </p>
                <div className="status-container">
                  <strong>Trạng thái:</strong>
                  <div>
                    <input
                      type="radio"
                      id="maintenance-pending"
                      name="maintenance-status"
                      value="Chờ xử lý"
                      checked={status === "Chờ xử lý"}
                      onChange={handleStatusChange}
                    />
                    <label htmlFor="maintenance-pending">Chờ xử lý</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="maintenance-processing"
                      name="maintenance-status"
                      value="Đang xử lý"
                      checked={status === "Đang xử lý"}
                      onChange={handleStatusChange}
                    />
                    <label htmlFor="maintenance-processing">Đang xử lý</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="maintenance-completed"
                      name="maintenance-status"
                      value="Hoàn thành"
                      checked={status === "Hoàn thành"}
                      onChange={handleStatusChange}
                    />
                    <label htmlFor="maintenance-completed">Hoàn thành</label>
                  </div>
                </div>
                <button onClick={handleSaveStatus} className="btn-save">
                  Cập nhật trạng thái
                </button>
                <button onClick={handleGenerateQuote} className="btn-quote">
                  Lập bảng báo giá
                </button>
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
};

export default ConsultingStaff;
