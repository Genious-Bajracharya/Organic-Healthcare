import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Sidebar from "./adminside";
import "../../css/admin.css";
import AdminNavbar from "./adminNav";

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
      <h2>Orders</h2>
      <table>
        <thead>
          <tr>
            <th>Username</th>

            <th>Order Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {order.map((order) => (
            <tr key={order.order_id}>
              <td>
                <Link to={`/orderdetail/${formatDate(order.created_at)}`}>
                  {order.username}
                </Link>
              </td>

              <td>{formatDate(order.created_at)}</td>
              <td>{order.status}</td>

              <button>Done</button>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
