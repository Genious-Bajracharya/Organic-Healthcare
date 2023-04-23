import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./adminside";
import "../../css/admin.css";
import AdminNavbar from "./adminNav";
import { useParams } from "react-router-dom";

const Orderdetail = () => {
  const [order, setOrders] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/orderdetail/${id}`);
        setOrders(res.data);
        console.log(id);
      } catch (error) {
        console.error(error);
      }
    };
    fetchOrders();
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className="main-content">
      <Sidebar />
      <AdminNavbar />
      <h2 className="main-content_h2">Order Detail</h2>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Order Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {order.map((order) => (
            <tr key={order.order_id}>
              <td>{order.product}</td>
              <td>{order.quantity}</td>
              <td>{order.total_price * order.quantity}</td>

              <td>{formatDate(order.created_at)}</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orderdetail;
