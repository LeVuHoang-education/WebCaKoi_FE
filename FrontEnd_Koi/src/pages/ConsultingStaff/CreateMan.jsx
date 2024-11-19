import { Button, message, Modal, Input } from "antd";
import { useState } from "react";

const CreateMan = ({ orderId, open, handleClose }) => {
  console.log("🚀 ~ CreateMan ~ orderId:", orderId);
  const [isOrderSubmitted, setIsOrderSubmitted] = useState(false); // Khai báo state theo dõi trạng thái đơn hàng đã được gửi
  const token = localStorage.getItem("token");
  const [price, setPrice] = useState(""); // Giá
  const [constructionStaff, setConstructionStaff] = useState(""); // Nhân viên thi công
  const [endDate, setEndDate] = useState(""); // Ngày kết thúc
  const [content, setContent] = useState(""); // Nội dung
  const [submittedOrders, setSubmittedOrders] = useState([]); // Lưu danh sách các đơn hàng đã gửi
  const [maintenanceID, setMaintenanceID] = useState(null); // Lưu orderId sau khi tạo
  // Hàm gửi form khi người dùng bấm nút
  const formatDate = (date) => {
    // Chuyển đổi từ yyyy-mm-dd thành dd-mm-yyyy
    const [year, month, day] = date.split("-"); // Lấy year, month, day từ ngày
    return `${day}-${month}-${year}`; // Định dạng lại thành dd-mm-yyyy
  };
  const handleSubmit = async () => {
    // Kiểm tra nếu tất cả các trường đã được nhập
    if (!price || !constructionStaff || !endDate || !content) {
      message.error("Vui lòng điền đầy đủ thông tin.");
      return;
    }
    const formattedEndDate = formatDate(endDate); // Chuyển định dạng ngày báo giá

    const data = {
      price: parseFloat(price),
      constructionStaff,
      endDate: formattedEndDate, // Gửi ngày đã được định dạng
      content,
    };

    try {
      const response = await fetch(
        `http://localhost:8081/api/v1/consulting-staff/create-maintenance/${orderId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Đảm bảo gửi JSON
            Authorization: `Bearer ${token}`, // Nếu cần token
          },
          body: JSON.stringify(data), // Chuyển đối tượng thành chuỗi JSON
        }
      );

      if (response.ok) {
        message.success("Dữ liệu đã được gửi thành công.");
        setIsOrderSubmitted(true); // Đánh dấu là đã gửi đơn hàng, vô hiệu hóa nút "Gửi"
        // Reset các trường form sau khi gửi thành công
        setPrice("");
        setConstructionStaff("");
        setEndDate("");
        setContent("");
      } else {
        const errorData = await response.json();
        message.error(`Gửi thất bại: ${errorData.message || "Có lỗi xảy ra"}`);
      }
    } catch (error) {
      message.error("Có lỗi xảy ra khi gửi dữ liệu.");
      console.error("Error:", error);
    }
  };
  // Hàm GET: Xem chi tiết đơn hàng
  return (
    <Modal
      open={open}
      onCancel={handleClose}
      footer={null}
      title="Lập bản báo giá"
    >
      <form>
        {/* Input các trường */}
        <Input
          type="number"
          placeholder="giá tiền"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={{ marginBottom: "1rem" }}
        />

        <Input
          type="text"
          placeholder="nhân viên "
          value={constructionStaff}
          onChange={(e) => setConstructionStaff(e.target.value)}
          style={{ marginBottom: "1rem" }}
        />

        <Input
          type="text"
          placeholder="nội dung"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{ marginBottom: "1rem" }}
        />
        <Input
          type="date"
          placeholder="Ngày kết thúc"
          value={endDate}
          onChange={(e) => {
            setEndDate(e.target.value); // Chỉ lưu giá trị ngày chuẩn YYYY-MM-DD
          }}
          style={{ marginBottom: "1rem" }}
        />

        {!submittedOrders.includes(orderId) && ( // Nếu chưa gửi thì hiển thị nút
          <Button
            type="primary"
            onClick={handleSubmit}
            style={{ marginTop: "1rem" }}
          >
            Gửi đơn giá
          </Button>
        )}
      </form>
    </Modal>
  );
};

export default CreateMan;

// import { Button, message, Modal, Input, Descriptions } from "antd";
// import { useState } from "react";

// const CreateMan = ({ orderId, open, handleClose }) => {
//   const [isOrderSubmitted, setIsOrderSubmitted] = useState(false); // Theo dõi trạng thái đơn hàng đã gửi
//   const token = localStorage.getItem("token");
//   const [price, setPrice] = useState(""); // Giá
//   const [constructionStaff, setConstructionStaff] = useState(""); // Nhân viên thi công
//   const [endDate, setEndDate] = useState(""); // Ngày kết thúc
//   const [content, setContent] = useState(""); // Nội dung
//   const [maintenanceID, setMaintenanceID] = useState(null); // Lưu maintenanceID sau khi tạo
//   const [maintenanceDetails, setMaintenanceDetails] = useState(null); // Lưu thông tin chi tiết
//   const [detailsModalVisible, setDetailsModalVisible] = useState(false); // Điều khiển hiển thị Modal chi tiết

//   // Hàm định dạng ngày (dd-mm-yyyy)
//   const formatDate = (date) => {
//     const [year, month, day] = date.split("-");
//     return `${day}-${month}-${year}`;
//   };

//   // Hàm POST: Gửi form tạo đơn hàng
//   const handleSubmit = async () => {
//     if (!price || !constructionStaff || !endDate || !content) {
//       message.error("Vui lòng điền đầy đủ thông tin.");
//       return;
//     }

//     const data = {
//       price: parseFloat(price),
//       constructionStaff,
//       endDate: formatDate(endDate),
//       content,
//     };

//     try {
//       const response = await fetch(
//         `http://localhost:8081/api/v1/consulting-staff/create-maintenance/${orderId}`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify(data),
//         }
//       );

//       if (response.ok) {
//         const result = await response.json();
//         setMaintenanceID(result.data.maintenanceID); // Lưu maintenanceID
//         message.success(
//           `Đơn hàng được tạo thành công với ID: ${result.data.maintenanceID}`
//         );
//         setPrice("");
//         setConstructionStaff("");
//         setEndDate("");
//         setContent("");
//         setIsOrderSubmitted(true);
//       } else {
//         const errorData = await response.json();
//         message.error(
//           `Tạo đơn hàng thất bại: ${errorData.message || "Có lỗi xảy ra"}`
//         );
//       }
//     } catch (error) {
//       message.error("Có lỗi xảy ra khi tạo đơn hàng.");
//       console.error("Error:", error);
//     }
//   };

//   return (
//     <>
//       {/* Modal tạo đơn hàng */}
//       <Modal
//         open={open}
//         onCancel={handleClose}
//         footer={null}
//         title="Lập bản báo giá"
//       >
//         <form>
//           <Input
//             type="number"
//             placeholder="Giá tiền"
//             value={price}
//             onChange={(e) => setPrice(e.target.value)}
//             style={{ marginBottom: "1rem" }}
//           />
//           <Input
//             type="text"
//             placeholder="Nhân viên"
//             value={constructionStaff}
//             onChange={(e) => setConstructionStaff(e.target.value)}
//             style={{ marginBottom: "1rem" }}
//           />
//           <Input
//             type="text"
//             placeholder="Nội dung"
//             value={content}
//             onChange={(e) => setContent(e.target.value)}
//             style={{ marginBottom: "1rem" }}
//           />
//           <Input
//             type="date"
//             placeholder="Ngày kết thúc"
//             value={endDate}
//             onChange={(e) => setEndDate(e.target.value)}
//             style={{ marginBottom: "1rem" }}
//           />
//           <Button
//             type="primary"
//             onClick={handleSubmit}
//             style={{ marginRight: "1rem" }}
//           >
//             Gửi đơn giá
//           </Button>
//         </form>
//       </Modal>
//     </>
//   );
// };

// export default CreateMan;
