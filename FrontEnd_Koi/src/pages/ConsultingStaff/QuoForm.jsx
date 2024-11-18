import { Button, message, Modal, Input } from "antd";
import { useState } from "react";

const QuoForm = ({ orderId, open, handleClose }) => {
  const [isOrderSubmitted, setIsOrderSubmitted] = useState(false); // Khai báo state theo dõi trạng thái đơn hàng đã được gửi
  const token = localStorage.getItem("token");
  const [areaSize, setAreaSize] = useState("");
  const [location, setLocation] = useState("");
  const [designDetails, setDesignDetails] = useState("");
  const [materialCost, setMaterialCost] = useState("");
  const [laborCost, setLaborCost] = useState("");
  const [transportationCost, setTransportationCost] = useState("");
  const [totalCost, setTotalCost] = useState("");
  const [quotationDate, setQuotationDate] = useState("");
  const [expirationDate, setExpirationDate] = useState("");

  // Hàm gửi form khi người dùng bấm nút
  const formatDate = (date) => {
    // Chuyển đổi từ yyyy-mm-dd thành dd-mm-yyyy
    const [year, month, day] = date.split("-"); // Lấy year, month, day từ ngày
    return `${day}-${month}-${year}`; // Định dạng lại thành dd-mm-yyyy
  };
  const handleSubmit = async () => {
    // Kiểm tra nếu tất cả các trường đã được nhập
    if (
      !areaSize ||
      !location ||
      !designDetails ||
      !materialCost ||
      !laborCost ||
      !transportationCost ||
      !totalCost ||
      !quotationDate ||
      !expirationDate
    ) {
      message.error("Vui lòng điền đầy đủ thông tin.");
      return;
    }
    const formattedQuotationDate = formatDate(quotationDate); // Chuyển định dạng ngày báo giá
    const formattedExpirationDate = formatDate(expirationDate); // Chuyển định dạng ngày hết hạn

    const data = {
      areaSize: parseFloat(areaSize),
      location,
      designDetails,
      materialCost: parseFloat(materialCost),
      laborCost: parseFloat(laborCost),
      transportationCost: parseFloat(transportationCost),
      totalCost: parseFloat(totalCost),
      quotationDate: formattedQuotationDate, // Gửi ngày đã được định dạng
      expirationDate: formattedExpirationDate, // Gửi ngày đã được định dạng
    };

    try {
      const response = await fetch(
        `http://localhost:8081/api/v1/consulting-staff/create-quotation/${orderId}`,
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
        setAreaSize("");
        setLocation("");
        setDesignDetails("");
        setMaterialCost("");
        setLaborCost("");
        setTransportationCost("");
        setTotalCost("");
        setQuotationDate("");
        setExpirationDate("");
      } else {
        const errorData = await response.json();
        message.error(`Gửi thất bại: ${errorData.message || "Có lỗi xảy ra"}`);
        setIsOrderSubmitted(false);
      }
    } catch (error) {
      message.error("Có lỗi xảy ra khi gửi dữ liệu.");
      console.error("Error:", error);
      setIsOrderSubmitted(false);
    }
  };

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
          placeholder="Diện tích khu vực"
          value={areaSize}
          onChange={(e) => setAreaSize(e.target.value)}
          style={{ marginBottom: "1rem" }}
        />

        <Input
          type="text"
          placeholder="Địa điểm"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          style={{ marginBottom: "1rem" }}
        />

        <Input
          type="text"
          placeholder="Chi tiết thiết kế"
          value={designDetails}
          onChange={(e) => setDesignDetails(e.target.value)}
          style={{ marginBottom: "1rem" }}
        />

        <Input
          type="number"
          placeholder="Chi phí nguyên vật liệu"
          value={materialCost}
          onChange={(e) => setMaterialCost(e.target.value)}
          style={{ marginBottom: "1rem" }}
        />

        <Input
          type="number"
          placeholder="Chi phí nhân công"
          value={laborCost}
          onChange={(e) => setLaborCost(e.target.value)}
          style={{ marginBottom: "1rem" }}
        />

        <Input
          type="number"
          placeholder="Chi phí vận chuyển"
          value={transportationCost}
          onChange={(e) => setTransportationCost(e.target.value)}
          style={{ marginBottom: "1rem" }}
        />

        <Input
          type="number"
          placeholder="Tổng chi phí"
          value={totalCost}
          onChange={(e) => setTotalCost(e.target.value)}
          style={{ marginBottom: "1rem" }}
        />

        <Input
          type="date"
          placeholder="Ngày báo giá"
          value={quotationDate} // Quản lý ngày ở định dạng YYYY-MM-DD
          onChange={(e) => {
            setQuotationDate(e.target.value); // Chỉ lưu giá trị ngày chuẩn YYYY-MM-DD
          }}
          style={{ marginBottom: "1rem" }}
        />

        <Input
          type="date"
          placeholder="Ngày hết hạn"
          value={expirationDate}
          onChange={(e) => {
            setExpirationDate(e.target.value); // Chỉ lưu giá trị ngày chuẩn YYYY-MM-DD
          }}
          style={{ marginBottom: "1rem" }}
        />

        <Button
          type="primary"
          onClick={handleSubmit}
          style={{ marginTop: "1rem" }}
          disabled={isOrderSubmitted} // Disable nút khi đã gửi đơn hàng thành công
        >
          {isOrderSubmitted ? "Đã gửi" : "Gửi"}{" "}
          {/* Thay đổi text nút khi gửi */}
        </Button>
      </form>
    </Modal>
  );
};

export default QuoForm;
