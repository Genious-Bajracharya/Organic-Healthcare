import React, { useEffect, useState } from "react";
import "../css/bar.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GrCart } from "react-icons/gr";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (loggedIn) {
      setIsLoggedIn(true);
    }
  }, []);

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
        localStorage.removeItem("username");
        localStorage.removeItem("isLoggedIn");
        setIsLoggedIn(false);
        navigate("/login");
      });
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">Organic Healthcare</div>
        <div className="navbar-menu-icon" onClick={toggleOpen}>
          <i className={isOpen ? "fas fa-times" : "fas fa-bars"} />
        </div>
        <ul className={isOpen ? "navbar-menu show" : "navbar-menu"}>
          <li className="navbar-menu-item">
            <a href="/dashboard">Home</a>
          </li>
          <li className="navbar-menu-item">
            <a href="/profile">Profile</a>
          </li>
          <li className="navbar-menu-item">
            <a href="/category">Categories</a>
          </li>
          {isLoggedIn ? (
            <li className="navbar-menu-item">
              <a href="/cart">Cart</a>
            </li>
          ) : (
            <li className="navbar-menu-item">
              <a onClick={() => alert("Please log in first")}>Cart</a>
            </li>
          )}
          <li className="navbar-menu-item">
            <a onClick={handleLogout}>Logout</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
