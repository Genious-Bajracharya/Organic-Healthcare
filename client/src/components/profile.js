import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "./navbar";
import "../css/profile.css";

const Profile = () => {
  const [userData, setUserData] = useState({});
  const username = localStorage.getItem("username");
  const [order, setOrders] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3001/profile/${username}`
        );
        setUserData(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserData();
  }, [username]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3001/userorders?username=${username}`
        );
        setOrders(res.data);
        console.log(username);
      } catch (error) {
        console.error(error);
      }
    };
    fetchOrders();
  }, [username]);

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
    <div>
      <Navbar />
      <div className="profile-container">
        <h2>Profile</h2>
        <div>Username: {userData.username}</div>
        <div>Email: {userData.email}</div>
        <div>Phone number: {userData.phone}</div>
        <div>Full Password: {userData.password}</div>
        <a href="/editprofile">
          <button>Edit</button>
        </a>
      </div>
      <h2 className="main-content_h2">My Orders</h2>
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
              <td>{order.username}</td>

              <td>{formatDate(order.created_at)}</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Profile;
