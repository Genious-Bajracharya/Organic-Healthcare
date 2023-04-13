import React from "react";
import "../../css/adminnav.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const handleLogout = () => {
  axios
    .post(
      "http://localhost:3001/logout",
      {},
      {
        withCredentials: true,
      }
    )
    .then(() => {
      const navigate = useNavigate();
      localStorage.removeItem("isAdmin");
      // setIsLoggedIn(false);
      navigate("/login");
    });
};

function AdminNavbar() {
  return (
    <nav className="admin-navbar">
      <ul className="nav-menu">
        <li className="nav-item">
          <a href="/" className="nav-link">
            Home
          </a>
        </li>
        <li className="nav-item">
          <a href="/about" className="nav-link">
            About
          </a>
        </li>
        <li className="nav-item">
          <a href="/login" className="nav-link" onClick={handleLogout}>
            Logout
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default AdminNavbar;
