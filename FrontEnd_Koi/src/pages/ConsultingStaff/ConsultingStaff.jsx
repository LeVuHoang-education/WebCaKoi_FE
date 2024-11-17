import { useState, useEffect } from "react";
import "./ConsultingStaff.css";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import OrderDetailsModal from "./OrderDetailsModal";
import QuoForm from "./QuoForm";

const ConsultingStaff = () => {
  const [currentTab, setCurrentTab] = useState("orders");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userId, setUserId] = useState();
  const [orderId, setOrderId] = useState();
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  console.log("🚀 ~ DesignStaffPage ~ userId:", userId);
  const [recordId, setRecordId] = useState();
  const [open, setOpen] = useState(false);
  const [openQuo, setOpenQuo] = useState(false);
  const [designs, setDesigns] = useState([]); // Lưu dữ liệu từ API dữ liệu bảng vẽ
  const [sortOrder, setSortOrder] = useState("asc"); // "asc" hoặc "desc"
  // Lấy token từ localStorage (hoặc sessionStorage nếu bạn lưu nó ở đó)

  const navigate = useNavigate(); // Hook để điều hướng
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

  // ========================================lấy dữ liệu bản vẽ đã được post====================================================
  useEffect(() => {
    const fetchDesigns = async () => {
      try {
        const response = await fetch(
          "http://localhost:8081/api/v1/consulting-staff/maintenance",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json(); // Lấy dữ liệu JSON từ phản hồi
        console.log("🚀 ~ fetchDesigns ~ data:", data);
        setDesigns(data.data.content); // Lưu dữ liệu vào state
      } catch (err) {
        setError(err.message); // Lưu thông báo lỗi
      } finally {
        setLoading(false); // Tắt trạng thái loading
      }
    };

    fetchDesigns();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Hiển thị trạng thái đang tải
  }

  if (error) {
    return <div>Error: {error}</div>; // Hiển thị lỗi nếu có
  }

  // ==========================sort recoder ID==================================

  const handleSort = () => {
    const sortedDesigns = [...designs].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.recordId - b.recordId;
      } else {
        return b.recordId - a.recordId;
      }
    });
    setDesigns(sortedDesigns);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc"); // Đổi trạng thái sắp xếp
  };

  // =========================================LẤY API THÔNG TIN CHI TIẾT ĐƠN HÀNG============1===============================

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
              <h3>Danh sách đơn hàng</h3>

              {/* Hiển thị lỗi nếu có */}
              {error && <p style={{ color: "red" }}>{error}</p>}

              {/* Hiển thị loading khi đang tải */}
              {loading ? (
                <p>Đang tải...</p>
              ) : (
                <table>
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
              <h3>Danh sách bản vẽ đã gửi</h3>
              {/* Hiển thị lỗi nếu có */}
              {error && <p style={{ color: "red" }}>{error}</p>}

              {/* Hiển thị loading khi đang tải */}
              {loading ? (
                <p>Đang tải...</p>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th onClick={handleSort} style={{ cursor: "pointer" }}>
                        Record ID {sortOrder === "asc" ? "↑" : "↓"}
                      </th>
                      <th>Engineer Name</th>
                      <th>Customer Name</th>
                      <th>Drawing File</th>
                      <th>Customer Feedback</th>
                      <th>Creation Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(designs) && designs.length > 0 ? (
                      designs.map((design) => (
                        <tr key={design.recordId}>
                          <td>{design.recordId}</td>
                          <td>{design.engineerName}</td>
                          <td>{design.customerName}</td>
                          <td>
                            <a
                              href={design.drawingFile}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              View File
                            </a>
                          </td>
                          <td>{design.customerFeedback}</td>
                          <td>{design.creationDate}</td>
                          <td>
                            {/* <Button
                            // onClick={() => {
                            //   setUserId(design.recordId);
                            //   setOpen(true);
                            // }}
                            >
                              Update Design
                            </Button> */}
                            <Button
                              disabled={design.customerFeedback === null} // Kiểm tra nếu customerFeedback là null
                              onClick={() => {
                                setRecordId(design.recordId);
                                setOpen(true);
                              }}
                            >
                              Update Design
                            </Button>
                            <Button
                              onClick={() => {
                                setRecordId(design.recordId);
                                setOpen(true);
                              }}
                            >
                              xóa bản vẽ
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7">No designs available.</td>
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
    </>
  );
};

export default ConsultingStaff;
