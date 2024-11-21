import { useState, useEffect } from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import OrderDetailsModal from "./OrderDetailsModal";
import QuoForm from "./QuoForm";
import UpdateStatus from "./UpdateStatus";
import QuoDetail from "./QuoDetail";
import CreateMan from "./CreateMan";
import ManDetail from "./ManDetail";

const ConsultingStaff = () => {
  const [currentTab, setCurrentTab] = useState("orders");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userId, setUserId] = useState();
  const [orderId, setOrderId] = useState();
  const [quoId, setQuoId] = useState();
  const [designs, setDesigns] = useState();
  console.log("🚀 ~ DesignStaffPage ~ userId:", userId);
  const [recordId, setRecordId] = useState();
  const [open, setOpen] = useState(false);
  const [openQuo, setOpenQuo] = useState(false);
  const [openMan, setOpenMan] = useState(false);
  const [openManDetail, setOpenManDetail] = useState(false);
  const [openQuoDetail, setOpenQuoDetail] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [maintances, setMaintances] = useState([]);
  const [maintanceID, setMaintanceID] = useState([]);
  // Lưu dữ liệu từ API dữ liệu bảng vẽđơn bảo trì
  // Lấy token từ localStorage (hoặc sessionStorage nếu bạn lưu nó ở đó)
  const token = localStorage.getItem("token");
  if (token) console.log(123);

  // chuyển trang
  const renderContent = () => {
    switch (currentTab) {
      case "orders":
        return <div>Danh sách đơn hàng</div>;
      case "upload":
        return <div>Đơn hàng đã thiết kế</div>;
      default:
        return <div>Chọn một tab để xem nội dung</div>;
    }
  };

  // Fetch dữ liệu đơn hàng từ API
  const fetchOrders = async () => {
    setLoading(true);
    setError(""); // Reset lỗi cũ

    if (!token) {
      setError("Token không hợp lệ hoặc không tồn tại.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8081/api/v1/consulting-staff/orders",
        {
          method: "GET", // HTTP method GET
          headers: {
            "Content-Type": "application/json", // Định dạng dữ liệu là JSON
            Authorization: `Bearer ${token}`, // Thêm token vào header
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.log("Error status:", response.status);
        console.log("Error details:", errorData);
        setError("Không thể tải dữ liệu");
        return;
      }

      const data = await response.json();
      setOrders(data.data); // Cập nhật dữ liệu đơn hàng
    } catch (error) {
      setError("Lỗi kết nối API");
    } finally {
      setLoading(false);
    }
  };
  console.log(orders);

  // Fetch dữ liệu khi component được mount
  useEffect(() => {
    fetchOrders();
  }, []);

  // =========================================LẤY API THÔNG tin  đơn bảo trì============1===============================

  const fetchMaintances = async () => {
    setLoading(true);
    setError(""); // Reset lỗi cũ

    if (!token) {
      setError("Token không hợp lệ hoặc không tồn tại.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8081/api/v1/consulting-staff/maintenance",
        {
          method: "GET", // HTTP method GET
          headers: {
            "Content-Type": "application/json", // Định dạng dữ liệu là JSON
            Authorization: `Bearer ${token}`, // Thêm token vào header
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.log("Error status:", response.status);
        console.log("Error details:", errorData);
        setError("Không thể tải dữ liệu");
        return;
      }

      const data = await response.json();
      setMaintances(data.data); // Cập nhật dữ liệu đơn hàng
    } catch (error) {
      setError("Lỗi kết nối API");
    } finally {
      setLoading(false);
    }
    console.log("🚀 ~ fetchMaintances ~ Maintances:", maintances);
  };
  useEffect(() => {
    fetchMaintances();
  }, []);

  // Fetch dữ liệu khi component được mount

  //============================================================== phương thức get để lấy maintanceID.

  // ========================================= nội dung trang=================================
  return (
    <>
      <div className="design-staff-page">
        <div className="sidebar">
          <h2>TU VẤN KHÁCH HÀNG</h2>
          <ul>
            <li
              onClick={() => setCurrentTab("orders")} // Chuyển tab sang "nhanvien"
              className={currentTab === "orders" ? "active" : ""}
            >
              Danh sách đơn hàng
            </li>
            <li
              onClick={() => setCurrentTab("baotri")} // Chuyển tab sang "phananh"
              className={currentTab === "baotri" ? "active" : ""}
            >
              Đơn bảo trì
            </li>
          </ul>
        </div>

        <div className="main-content">
          {currentTab === "orders" && (
            <section className="order-list">
              <h3 className="tieude">Danh sách đơn hàng</h3>

              {/* Hiển thị lỗi nếu có */}
              {error && <p style={{ color: "red" }}>{error}</p>}

              {/* Hiển thị loading khi đang tải */}
              {loading ? (
                <p>Đang tải...</p>
              ) : (
                <table className="tableConsultingStaff">
                  <thead>
                    <tr>
                      <th>OrderID</th>
                      <th>Username</th>
                      <th>DesignDetails</th>
                      <th>StartDate</th>
                      <th>EndDate</th>
                      <th>Status</th>
                      <th>ChiTiet</th>
                      <th>Action</th>
                      <th>Update Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(orders) && orders.length > 0 ? (
                      orders.map((order) => (
                        <tr key={order.orderId}>
                          <td>{order.orderId}</td>
                          <td>{order.userName}</td>
                          <td>{order.designDetails}</td>
                          <td>{order.startDate}</td>
                          <td>{order.endDate}</td>
                          <td>{order.status}</td>
                          <td>
                            <Button
                              onClick={() => {
                                console.log("Handle click");
                                setOrderId(order.orderId);
                                setOpen(true);
                              }}
                            >
                              Chi tiết đơn hàng
                            </Button>
                          </td>
                          <td>
                            <Button
                              onClick={() => {
                                setOrderId(order.orderId);
                                setOpenQuo(true);
                              }}
                            >
                              lập bảng báo giá
                            </Button>
                            <br />
                          </td>
                          <td>
                            <Button
                              onClick={() => {
                                setOrderId(order.orderId);
                                setOpenUpdate(true);
                              }}
                            >
                              cập nhật trạng thái
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5">Không có đơn hàng nào.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </section>
          )}

          {currentTab === "baotri" && (
            <section className="upload-form">
              <h3 className="tieude">Danh sách đơn bảo trì</h3>
              {/* Hiển thị lỗi nếu có */}
              {error && <p style={{ color: "red" }}>{error}</p>}

              {/* Hiển thị loading khi đang tải */}
              {loading ? (
                <p>Đang tải...</p>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>OrderId</th>
                      <th>UserId</th>
                      <th>UserName</th>
                      <th>serviceType</th>
                      <th>startDate</th>
                      <th>endDate</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(maintances) && maintances.length > 0 ? (
                      maintances.map((maintance) => (
                        <tr key={maintance.orderId}>
                          <td>{maintance.orderId}</td>
                          <td>{maintance.userId}</td>
                          <td>{maintance.userName}</td>
                          <td>{maintance.serviceType}</td>
                          <td>{maintance.startDate}</td>
                          <td>{maintance.endDate}</td>

                          <td>
                            <Button
                              onClick={() => {
                                setOrderId(maintance.orderId);
                                setOpenMan(true);
                              }}
                            >
                              Phân công nhân viên
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7">No maintance available.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </section>
          )}
        </div>
      </div>
      <OrderDetailsModal
        orderId={orderId}
        open={open}
        handleClose={() => {
          setOrderId(undefined);
          setOpen(false);
        }}
      />
      <QuoForm
        orderId={orderId}
        open={openQuo}
        handleClose={() => {
          setOrderId(undefined);
          setOpenQuo(false);
        }}
      />

      <UpdateStatus
        orderId={orderId}
        open={openUpdate}
        handleClose={() => {
          setOrderId(undefined);
          setOpenUpdate(false);
        }}
      />

      <QuoDetail
        quoId={quoId}
        open={openQuoDetail}
        handleClose={() => {
          setQuoId(undefined);
          setOpenQuoDetail(false);
        }}
      />
      <CreateMan
        orderId={orderId}
        open={openMan}
        handleClose={() => {
          setOrderId(undefined);
          setOpenMan(false);
        }}
      />
    </>
  );
};

export default ConsultingStaff;
