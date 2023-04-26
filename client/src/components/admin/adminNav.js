import React from "react";
import "../../css/adminnav.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AiOutlineBell } from "react-icons/ai";

function AdminNavbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    // setIsLoggedIn(false);
    navigate("/login");
  };
  return (
    <nav className="admin-nav">
      <div className="sidebar-button">
        <i className="bx bx-menu sidebarBtn" />
        <span className="dashboard">Dashboard</span>
      </div>
      <div className="search-box">
        <input type="text" placeholder="Search..." />
        <i className="bx bx-search" />
      </div>
      <div className="profile-details">
        <span className="admin_name">Admin</span>
        <i className="bx bx-chevron-down" />
      </div>
    </nav>
  );
}

export default AdminNavbar;
