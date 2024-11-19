import { Button, message, Modal } from "antd";
import { useState } from "react";

const DeleteFile = ({ recordId, open, handleClose }) => {
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const handleDelete = async () => {
    if (!recordId) {
      message.error("Không có recordId để xóa file.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `http://localhost:8081/api/v1/designs/delete/${recordId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        message.success("Xóa file thành công!");
        handleClose(); // Đóng modal sau khi xóa thành công
      } else {
        message.error("Không thể xóa file. Vui lòng thử lại!");
      }
    } catch (error) {
      console.error("🚀 ~ handleDelete ~ error:", error);
      message.error("Đã xảy ra lỗi khi xóa file.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onCancel={handleClose}
      footer={null}
      title="Xóa file ảnh"
    >
      <div>
        <p>Bạn có chắc chắn muốn xóa file này?</p>
        <Button
          type="primary"
          danger
          onClick={handleDelete}
          loading={loading}
          style={{ marginRight: "1rem", backgroundColor: "red" }}
        >
          Xóa file
        </Button>
        <Button onClick={handleClose}>Hủy bỏ</Button>
      </div>
    </Modal>
  );
};

export default DeleteFile;
