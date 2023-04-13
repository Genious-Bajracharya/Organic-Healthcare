import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./adminside";
import "../../css/admin.css";
import AdminNavbar from "./adminNav";
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
      <Sidebar />
      <AdminNavbar />
      <LineChart width={600} height={300} data={data}>
        <XAxis dataKey="user" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="user" stroke="#8884d8" />
      </LineChart>
    </div>
  );

  // return (
  //   <div className="main-content">
  //     <Sidebar /> <AdminNavbar />
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
