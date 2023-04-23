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
    <nav className="admin-navbar">
      <ul className="nav-menu">
        <li className="nav-item">
          <a href="/admin" className="nav-link">
            Home
          </a>
        </li>

        <li className="nav-item">
          <a onClick={handleLogout} href="/login" className="nav-link">
            Logout
          </a>
        </li>
        <li className="nav-noti">
          <a href="">
            <AiOutlineBell size={30} color={"#FFF"} />
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default AdminNavbar;
