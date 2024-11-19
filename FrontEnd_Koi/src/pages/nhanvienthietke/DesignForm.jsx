import { Button, message, Modal, Input, Upload } from "antd";
import { useState } from "react";

const DesignForm = ({ userId, open, handleClose }) => {
  const [engineerNotes, setEngineerNotes] = useState("");
  const [drawingFile, setDrawingFile] = useState(null);
  const [previewContent, setPreviewContent] = useState(null);
  const token = localStorage.getItem("token");
  const handleFileChange = (file) => {
    setDrawingFile(file); // Tạo FileReader để đọc file và hiển thị preview

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result; // Kiểm tra loại file để hiển thị phù hợp

      if (file.type.includes("image")) {
        setPreviewContent(
          <img src={result} alt="Preview" style={{ width: "100%" }} />
        );
      } else if (file.type.includes("pdf")) {
        setPreviewContent(
          <embed
            src={result}
            type="application/pdf"
            width="100%"
            height="400px"
          />
        );
      } else {
        setPreviewContent(<p>Không hỗ trợ preview cho loại file này.</p>);
      }
    };

    reader.readAsDataURL(file); // Đọc file dưới dạng Base64
  };

  const handleSubmit = async () => {
    if (!userId) {
      message.error("Không có userId");
      return;
    }

    if (!drawingFile) {
      message.error("Vui lòng chọn file để upload");
      return;
    }

    const formData = new FormData();
    formData.append("engineerNotes", engineerNotes);
    formData.append("drawingFile", drawingFile);

    try {
      const response = await fetch(
        `http://localhost:8081/api/v1/designs/create/${userId}`,
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
      footer={null} // Tùy chỉnh nút footer của modal
      title="Gửi Thiết Kế"
    >
           {" "}
      <form>
               {" "}
        <Input
          type="text"
          placeholder="Mô tả"
          value={engineerNotes}
          onChange={(e) => setEngineerNotes(e.target.value)}
          style={{ marginBottom: "1rem" }}
        />
               {" "}
        <Upload
          beforeUpload={(file) => {
            handleFileChange(file);
            return false; // Ngăn không để Upload tự động
          }}
          showUploadList={false} // Không hiển thị danh sách file được chọn
        >
                    <Button>Chọn File</Button>       {" "}
        </Upload>
                {/* Hiển thị Preview */}       {" "}
        {previewContent && (
          <div style={{ margin: "1rem 0" }}>
                        <h4>Xem trước file:</h4>            {previewContent}   
                 {" "}
          </div>
        )}
               {" "}
        <Button
          type="primary"
          onClick={handleSubmit}
          style={{ marginTop: "1rem" }}
        >
                    Gửi        {" "}
        </Button>
             {" "}
      </form>
         {" "}
    </Modal>
  );
};

export default DesignForm;
