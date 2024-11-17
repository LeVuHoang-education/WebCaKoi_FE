import { Button, message, Modal, Input } from "antd";
import { useState } from "react";

const QuoForm = ({ orderId, open, handleClose }) => {
  const token = localStorage.getItem("token");
  const [areaSize, setAreaSize] = useState(); // Số
  const [location, setLocation] = useState(""); // Chuỗi
  const [designDetails, setDesignDetails] = useState(""); // Chuỗi
  const [materialCost, setMaterialCost] = useState(); // Số
  const [laborCost, setLaborCost] = useState(); // Số
  const [transportationCost, setTransportationCost] = useState(); // Số
  const [totalCost, setTotalCost] = useState(); // Số
  const [quotationDate, setQuotationDate] = useState(""); // Ngày định dạng ISO (YYYY-MM-DD)
  const [expirationDate, setExpirationDate] = useState(""); // Ngày định dạng ISO (YYYY-MM-DD)
  const formatDate = (date) => {
    const [year, month, day] = date.split("-");
    return `${day}-${month}-${year}`;
  };
  const handleSubmit = async () => {
    if (!orderId) {
      message.error("Không có userId");
      return;
    }
    const formattedQuotationDate = formatDate(quotationDate);
    const formattedExpiratonDate = formatDate(expirationDate);
    const formData = new FormData();
    formData.append("areaSize", areaSize); // Số
    formData.append("location", location); // Chuỗi
    formData.append("designDetails", designDetails); // Chuỗi
    formData.append("materialCost", materialCost); // Số
    formData.append("laborCost", laborCost); // Số
    formData.append("transportationCost", transportationCost); // Số
    formData.append("totalCost", totalCost); // Số
    formData.append("quotationDate", formattedQuotationDate); // Ngày định dạng ISO
    formData.append("expirationDate", formattedExpiratonDate); // Ngày định dạng ISO (

    try {
      const response = await fetch(
        `http://localhost:8081/api/v1/designs/create/${orderId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        message.success("Gửi dữ liệu thành công!");
        handleClose(); // Đóng modal sau khi gửi thành công
      }
    } catch (error) {
      console.log("🚀 ~ handleSubmit ~ error:", error);
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
          type="text"
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
        >
          Gửi
        </Button>
      </form>
    </Modal>
  );
};

export default QuoForm;
