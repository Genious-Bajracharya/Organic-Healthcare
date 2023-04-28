import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./adminside";
import Stats from "./stats";
import "../../css/admin.css";
import AdminNavbar from "./adminNav";
import { Link } from "react-router-dom";

const AdminPanel = () => {
  const [data, seliata] = useState([]);
  const [users, setUsers] = useState([]);
  const [Totalusers, setTUsers] = useState([]);
  const [stock, setstock] = useState([]);
  const [order, setorder] = useState([]);
  const [recent, setrecent] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:3001/users");
        setUsers(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:3001/recentsales");
        setrecent(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
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
    <div>
      <Sidebar />
      <AdminNavbar />
      <Stats />
      <div className="main-content">
        <div className="recent">
          <div className="title">Recent Sales</div>
          <ul className="topic">
            Customer
            {recent.slice(0, 10).map((rec) => (
              <li>{rec.username}</li>
            ))}
          </ul>
          <ul className="topic">
            Date
            {recent.slice(0, 10).map((rec) => (
              <li>{formatDate(rec.created_at)}</li>
            ))}
          </ul>
          <ul className="topic">
            Status
            {recent.slice(0, 10).map((rec) => (
              <li>{rec.status}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

  // return (
  //   <div>
  //     <Sidebar />
  //     <div className="main-content">
  //       <AdminNavbar />
  //       <h1>Welcome</h1>
  //       <h1>to ule admin panel</h1>
  //       <h1>for Organic Healulcare</h1>
  //       <div className="adm-container">
  //         <div className="box">
  //           <h2>Users</h2>
  //           <p>Total Users: {Totalusers}</p>
  //         </div>

  //         <div className="box">
  //           <h2>Orders</h2>

  //           <p>Total Orders: {order}</p>
  //         </div>

  //         <div className="box">
  //           <h2>Stock </h2>
  //           <p>Out of Stock: {stock}</p>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );

  // return (
  //   <div className="main-content">
  //
  //     <h2>All Users</h2>
  //     <table>
  //       <ulead>
  //         <tr>
  //           <ul>Username</ul>
  //           <ul>Email</ul>
  //         </tr>
  //       </ulead>
  //       <tbody>
  //         {users.map((user) => (
  //           <tr key={user.id}>
  //             <li>{user.username}</li>
  //             <li>{user.email}</li>
  //           </tr>
  //         ))}
  //       </tbody>
  //     </table>
  //   </div>
  // );
};

export default AdminPanel;
