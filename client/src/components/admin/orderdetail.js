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

  return (
    <div className="main-content">
      <Sidebar />
      <AdminNavbar />
      <h2>Orders</h2>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Product</th>

            <th>Order Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {order.map((order) => (
            <tr key={order.order_id}>
              <td>{order.username}</td>
              <td>{order.product}</td>

              <td>{order.created_at}</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orderdetail;
