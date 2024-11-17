// import { useState } from "react";
// import "./DesignStaffPage.css";

// const DesignStaffPage = () => {
//   const [currentTab, setCurrentTab] = useState("orders");
//   const [orders, setOrders] = useState([]);
//   const [newOrder, setNewOrder] = useState({
//     customer: "",
//     description: "",
//     status: "",
//   });
//   const [isAddingOrder, setIsAddingOrder] = useState(false);
//   const [editingOrderId, setEditingOrderId] = useState(null); // ID của đơn hàng đang được chỉnh sửa
//   const [editingOrder, setEditingOrder] = useState({}); // Thông tin đơn hàng đang được chỉnh sửa

//   // State quản lý dữ liệu form gửi tài liệu
//   const [form, setForm] = useState({
//     customerName: "",
//     designFile: null,
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prevForm) => ({ ...prevForm, [name]: value }));
//   };

//   const handleFileChange = (e) => {
//     setForm((prevForm) => ({ ...prevForm, designFile: e.target.files[0] }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Gửi tài liệu:", form);
//     alert("Tài liệu đã được gửi thành công!");
//   };

//   const handleAddOrderClick = () => {
//     setIsAddingOrder(true);
//   };

//   const handleNewOrderChange = (e) => {
//     const { name, value } = e.target;
//     setNewOrder((prevOrder) => ({ ...prevOrder, [name]: value }));
//   };

//   const handleSaveNewOrder = () => {
//     setOrders((prevOrders) => [
//       ...prevOrders,
//       {
//         id: prevOrders.length + 1,
//         customer: newOrder.customer,
//         description: newOrder.description,
//         status: newOrder.status,
//       },
//     ]);
//     setIsAddingOrder(false);
//     setNewOrder({ customer: "", description: "", status: "" });
//   };

//   const handleEditClick = (order) => {
//     setEditingOrderId(order.id);
//     setEditingOrder({ ...order });
//   };

//   const handleEditOrderChange = (e) => {
//     const { name, value } = e.target;
//     setEditingOrder((prevOrder) => ({ ...prevOrder, [name]: value }));
//   };

//   const handleSaveEdit = () => {
//     setOrders((prevOrders) =>
//       prevOrders.map((order) =>
//         order.id === editingOrderId ? { ...editingOrder } : order
//       )
//     );
//     setEditingOrderId(null);
//   };

//   return (
//     <div className="design-staff-page">
//       <div className="sidebar">
//         <h2>Quản lý thiết kế</h2>
//         <ul>
//           <li
//             className={currentTab === "orders" ? "active" : ""}
//             onClick={() => setCurrentTab("orders")}
//           >
//             Danh sách đơn hàng
//           </li>
//           <li
//             className={currentTab === "upload" ? "active" : ""}
//             onClick={() => setCurrentTab("upload")}
//           >
//             Gửi tài liệu thiết kế
//           </li>
//         </ul>
//       </div>

//       <div className="main-content">
//         {currentTab === "orders" && (
//           <section className="order-list">
//             <h3>Đơn hàng chờ thiết kế</h3>

//             {/* Hiển thị danh sách đơn hàng nếu có */}
//             {orders.length > 0 ? (
//               <ul>
//                 {orders.map((order) => (
//                   <li key={order.id}>
//                     {editingOrderId === order.id ? (
//                       <>
//                         <label>
//                           Khách hàng:
//                           <input
//                             type="text"
//                             name="customer"
//                             value={editingOrder.customer}
//                             onChange={handleEditOrderChange}
//                           />
//                         </label>
//                         <br />
//                         <label>
//                           Mô tả:
//                           <input
//                             type="text"
//                             name="description"
//                             value={editingOrder.description}
//                             onChange={handleEditOrderChange}
//                           />
//                         </label>
//                         <br />
//                         <label>
//                           Trạng thái:
//                           <input
//                             type="text"
//                             name="status"
//                             value={editingOrder.status}
//                             onChange={handleEditOrderChange}
//                           />
//                         </label>
//                         <br />
//                         <button onClick={handleSaveEdit} className="btn-save">
//                           Lưu
//                         </button>
//                       </>
//                     ) : (
//                       <>
//                         <strong>Khách hàng:</strong> {order.customer} <br />
//                         <strong>Mô tả:</strong> {order.description} <br />
//                         <strong>Trạng thái:</strong> {order.status} <br />
//                         <button
//                           onClick={() => handleEditClick(order)}
//                           className="btn-update"
//                         >
//                           Cập nhật
//                         </button>
//                       </>
//                     )}
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <p>Chưa có đơn hàng nào. Nhấn Thêm đơn hàng mới để bắt đầu.</p>
//             )}

//             {/* Nút thêm đơn hàng mới */}
//             <button onClick={handleAddOrderClick} className="btn-add-order">
//               Thêm đơn hàng mới
//             </button>

//             {/* Form thêm đơn hàng mới */}
//             {isAddingOrder && (
//               <div className="new-order-form">
//                 <h4>Thêm đơn hàng mới</h4>
//                 <input
//                   type="text"
//                   name="customer"
//                   placeholder="Tên khách hàng"
//                   value={newOrder.customer}
//                   onChange={handleNewOrderChange}
//                   style={{
//                     padding: "8px",
//                     width: "100%",
//                     marginBottom: "10px",
//                   }}
//                 />
//                 <input
//                   type="text"
//                   name="description"
//                   placeholder="Mô tả đơn hàng"
//                   value={newOrder.description}
//                   onChange={handleNewOrderChange}
//                   style={{
//                     padding: "8px",
//                     width: "100%",
//                     marginBottom: "10px",
//                   }}
//                 />
//                 <input
//                   type="text"
//                   name="status"
//                   placeholder="Trạng thái"
//                   value={newOrder.status}
//                   onChange={handleNewOrderChange}
//                   style={{
//                     padding: "8px",
//                     width: "100%",
//                     marginBottom: "10px",
//                   }}
//                 />
//                 <button onClick={handleSaveNewOrder} className="btn-save">
//                   Lưu đơn hàng
//                 </button>
//               </div>
//             )}
//           </section>
//         )}

//         {currentTab === "upload" && (
//           <section className="upload-form">
//             <h3>Gửi tài liệu thiết kế</h3>
//             <form onSubmit={handleSubmit}>
//               <div className="form-group">
//                 <label>Tên khách hàng:</label>
//                 <input
//                   type="text"
//                   name="customerName"
//                   value={form.customerName}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Tải lên file thiết kế:</label>
//                 <input
//                   type="file"
//                   name="designFile"
//                   onChange={handleFileChange}
//                   required
//                 />
//               </div>
//               <button type="submit" className="btn-submit">
//                 Gửi tài liệu
//               </button>
//             </form>
//           </section>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DesignStaffPage;

import { useState, useEffect } from "react";
import "./DesignStaffPage.css";
import { Button } from "antd";
import DesignForm from "./DesignForm";
import { useNavigate } from "react-router-dom";
import FormUpdate from "./FormUpdate";
import DeleteFile from "./DeleteFile";

const DesignStaffPage = () => {
  const [currentTab, setCurrentTab] = useState("orders");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userId, setUserId] = useState();
  console.log("🚀 ~ DesignStaffPage ~ userId:", userId);
  const [recordId, setRecordId] = useState();
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [designs, setDesigns] = useState([]); // Lưu dữ liệu từ API dữ liệu bảng vẽ
  const [sortOrder, setSortOrder] = useState("asc"); // "asc" hoặc "desc"
  // Lấy token từ localStorage (hoặc sessionStorage nếu bạn lưu nó ở đó)
  const token = localStorage.getItem("token"); // Điều chỉnh cách lấy token tùy thuộc vào cách bạn lưu nó.

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
        "http://localhost:8081/api/v1/designs/get-orders-inprogress",
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
        const response = await fetch("http://localhost:8081/api/v1/designs", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

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

  // ========================================= nội dung trang=================================
  return (
    <>
      <div className="design-staff-page">
        <div className="sidebar">
          <h2>Quản lý thiết kế</h2>
          <ul>
            <li
              onClick={() => setCurrentTab("orders")} // Chuyển tab sang "nhanvien"
              className={currentTab === "nhanvien" ? "active" : ""}
            >
              Danh sách đơn hàng
            </li>
            <li
              onClick={() => setCurrentTab("upload")} // Chuyển tab sang "phananh"
              className={currentTab === "upload" ? "active" : ""}
            >
              Đơn hàng đã thiết kế
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
                      <th>Order ID</th>
                      <th>Username</th>
                      <th>Design Details</th>
                      <th>Start Date</th>
                      <th>End Date</th>

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
                          <td>
                            <Button
                              onClick={() => {
                                setUserId(order.userId);
                                setOpen(true);
                              }}
                            >
                              lập bảng thiết kế
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
          {currentTab === "upload" && (
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
                                setOpenDelete(true);
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
      <DesignForm
        userId={userId}
        open={open}
        handleClose={() => {
          setUserId(undefined);
          setOpen(false);
        }}
      />

      <FormUpdate
        recordId={recordId}
        open={open}
        handleClose={() => {
          setRecordId(undefined);
          setOpen(false);
        }}
      />

      <DeleteFile
        recordId={recordId}
        open={openDelete}
        handleClose={() => {
          setRecordId(undefined);
          setOpenDelete(false);
        }}
      />
    </>
  );
};

export default DesignStaffPage;
