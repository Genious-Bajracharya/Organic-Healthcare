import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./adminside";
import Stats from "./stats";
import "../../css/admin.css";
import AdminNavbar from "./adminNav";
import { Link } from "react-router-dom";

const AdminPanel = () => {
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);
  const [Totalusers, setTUsers] = useState([]);
  const [stock, setstock] = useState([]);
  const [order, setorder] = useState([]);

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
        const res = await axios.get("http://localhost:3001/showusers");
        setTUsers(res.data[0]["count(username)"]);
        console.log(Totalusers);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:3001/showorder");
        setorder(res.data[0]["count(DISTINCT created_at)"]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:3001/showstock");
        setstock(res.data[0]["count(Name)"]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <Sidebar />
      <AdminNavbar />
      <Stats />
      <div className="main-content"></div>
    </div>
  );

  // return (
  //   <div>
  //     <Sidebar />
  //     <div className="main-content">
  //       <AdminNavbar />
  //       <h1>Welcome</h1>
  //       <h1>to the admin panel</h1>
  //       <h1>for Organic Healthcare</h1>
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
  //       <thead>
  //         <tr>
  //           <th>Username</th>
  //           <th>Email</th>
  //         </tr>
  //       </thead>
  //       <tbody>
  //         {users.map((user) => (
  //           <tr key={user.id}>
  //             <td>{user.username}</td>
  //             <td>{user.email}</td>
  //           </tr>
  //         ))}
  //       </tbody>
  //     </table>
  //   </div>
  // );
};

export default AdminPanel;
