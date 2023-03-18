import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./adminside";
import "../../css/admin.css";

const Orders = () => {
  const [order, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:3001/orders");
        setOrders(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="main-content">
      <Sidebar />
      <h2>Orders</h2>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Product</th>
            <th>Order Time</th>
          </tr>
        </thead>
        <tbody>
          {order.map((order) => (
            <tr key={order.order_id}>
              <td>{order.username}</td>
              <td>{order.product}</td>
              <td>{order.created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
