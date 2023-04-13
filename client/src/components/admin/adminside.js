import React from "react";
import { Link } from "react-router-dom";
import "../../css/adminbar.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>Admin</h3>
      </div>

      <ul className="sidebar-menu">
        <li>
          <Link to="/admin">Users</Link>
        </li>
        <li>
          <Link to="/orders">Orders</Link>
        </li>
        <li>
          <Link to="/allproduct">Products</Link>
        </li>
        <li>
          <Link to="/addhealth">Add HealthProblem</Link>
        </li>
        <li>
          <Link to="/stock">Stock</Link>
        </li>
        <li>
          <Link to="/addadmin">Add Admin</Link>
        </li>
        <li>
          <Link to="/addproduct">Add Product</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
