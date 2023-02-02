import React, { useState } from "react";
import "../css/bar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
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
            <a href="#">About</a>
          </li>
          <li className="navbar-menu-item">
            <a href="#">Categories</a>
          </li>
          <li className="navbar-menu-item">
            <a href="#">Contact</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
