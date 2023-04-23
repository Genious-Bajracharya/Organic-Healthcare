import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./adminside";
import AdminNavbar from "./adminNav";
// import "../../css/addadmin.css";

const Addadmin = () => {
  const [username, setusername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setphone] = useState("");
  const [confPassword, setConfPassword] = useState("");

  const [registerStatus, setRegisterStatus] = useState("");

  const handlesubmit = (e) => {
    e.preventDefault();
    try {
      axios
        .post("http://localhost:3001/registeradmin", {
          email: email,
          username: username,
          password: password,
          phone: phone,
          confPassword: confPassword,
        })
        .then((response) => {
          setRegisterStatus(response);
          console.log(response);
          if (response.data.message) {
            setRegisterStatus(response.data.message);
          } else {
            setRegisterStatus(
              "ACCOUNT CREATED SUCCESSFULLY CHECK YOUR EMAIL FOR VERIFICATION "
            );
          }
        });
    } catch (error) {
      if (error.response) {
        setRegisterStatus(error.response.data.message);
      }
    }
  };

  return (
    <div>
      <Sidebar />

      <div className="container" id="container">
        <div className="form-container sign-in-container">
          <form onSubmit={handlesubmit} className="box">
            <h1>Register</h1>
            <div className="space"></div>

            <input
              type="text"
              name="username"
              placeholder="Username"
              id="username"
              required
              value={username}
              onChange={(e) => setusername(e.target.value)}
            />
            <input
              type="email"
              name="email"
              placeholder="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="phone"
              name="phone"
              placeholder="phone"
              id="phone"
              required
              value={phone}
              onChange={(e) => setphone(e.target.value)}
            />

            <br />
            <p className="has-text-centered">{registerStatus}</p>
            <button type="submit" value="register">
              Register
            </button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-right">
              <h1>Welcome To Organic Healthcare!</h1>
              <p>Resgiter an Admin here </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Addadmin;
