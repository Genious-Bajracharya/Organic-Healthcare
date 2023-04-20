import React, { useEffect, useState } from "react";
import "../css/bar.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BiCart } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

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

  const handleSearch = (event) => {
    event.preventDefault();
    // const searchTerm = event.target.elements.searchTerm.value;
    console.log(searchTerm);
    navigate(`/searchproduct/${searchTerm}`);
  };

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
      <div className="nav">
        <h2 className="brand-logo">Organic Healthcare</h2>
        <div className="nav-items">
          <div className="search">
            <input
              type="text"
              className="search-box"
              placeholder="search product"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="search-btn" onClick={handleSearch}>
              search
            </button>
          </div>

          {isLoggedIn && (
            <>
              <a href="/cart">
                <BiCart size={32} color={"#000"} />
              </a>

              <a href="/profile">
                <CgProfile size={32} color={"#000"} />
              </a>
            </>
          )}
        </div>
      </div>
      <ul className="links-container">
        <li className="link-item">
          <a href="/dashboard" className="link">
            home
          </a>
        </li>
        <li className="link-item">
          <a href="/category" className="link">
            Categories
          </a>
        </li>
        <li className="link-item">
          <a href="/login" className="link">
            Login
          </a>
        </li>
        <li className="link-item">
          <a onClick={handleLogout} href="/login" className="link">
            logout
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
