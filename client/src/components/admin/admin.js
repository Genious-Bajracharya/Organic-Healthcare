import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./adminside";
import "../../css/admin.css";
import AdminNavbar from "./adminNav";
import { Link } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const AdminPanel = () => {
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);

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

  return (
    <div className="main-content">
      <Sidebar /> <AdminNavbar />
      <h1>Welcome</h1>
      <h1>to the admin panel</h1>
      <h1>for Organic Helthcare</h1>
      <div className="adm-container">
        <div className="box">
          <h2>Users</h2>
          <p>Total Users: </p>
        </div>

        <div className="box">
          <h2>Orders</h2>

          <p>total Orders:</p>
        </div>

        <div className="box">
          <h2>Stock </h2>
          <p>Out of Stock:</p>
        </div>
      </div>
    </div>
  );

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
