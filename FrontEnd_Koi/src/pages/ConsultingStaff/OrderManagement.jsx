import React, { useState, useEffect } from "react";
import { Table, Button, message } from "antd";

const OrderManagement = ({ currentTab }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // Token của bạn (cần được thay bằng giá trị thực tế hoặc lấy từ state/context)
  const token =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJjb25zdWx0aW5nQGdtYWlsLmNvbSIsInJvbGUiOiJST0xFX0NPTlNVTFRJTkdfU1RBRkYiLCJleHAiOjE3MzA5MTE1NzZ9.v0zvOaL23Us6HR9r8qp6IbmJoNwssMXaClkuxyFFjlnmTLc6YEeMC-UB_dck6pGjecuA_NRPuflvVKr0iD8ulg";

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:8081/api/v1/consulting-staff/orders",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Thêm token vào header
          },
        }
      );
      if (!response.ok) throw new Error("Lỗi khi lấy dữ liệu từ API");
      const data = await response.json();
      console.log(data);
      setOrders(data.data); // Giả định API trả về danh sách các đơn hàng
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const columns = [
    {
      title: "Order ID",
      dataIndex: "orderId",
      key: "orderId",
    },
    {
      title: "User ID",
      dataIndex: "userId",
      key: "userId",
    },
    {
      title: "Khách hàng",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Chi tiết thiết kế",
      dataIndex: "designDetails",
      key: "designDetails",
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <Button type="primary" onClick={() => handleOrderClick(record.orderId)}>
          Xem chi tiết
        </Button>
      ),
    },
  ];

  const handleOrderClick = (orderId) => {
    message.info(`Bạn đã chọn đơn hàng: ${orderId}`);
  };

  return (
    <>
      {currentTab === "orders" && (
        <section className="order-management">
          <div className="order-header">
            <h3>Danh sách đơn hàng</h3>
          </div>
          <Table
            columns={columns}
            dataSource={orders}
            rowKey="orderId"
            loading={loading}
            pagination={{ pageSize: 10 }}
          />
        </section>
      )}
    </>
  );
};

export default OrderManagement;
