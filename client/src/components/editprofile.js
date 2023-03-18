import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/register.css";

const Register = () => {
  const [username, setusername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setphone] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const username1 = localStorage.getItem("username");

  const [profileStatus, setProfileStatus] = useState("");
  //   const history = useHistory();
  const navigate = useNavigate();

  const handlesubmit = (e) => {
    e.preventDefault();
    try {
      axios
        .post("http://localhost:3001/editprofile", {
          email: email,
          username: username,
          password: password,
          phone: phone,
          confPassword: confPassword,
          username1,
        })
        .then((response) => {
          setProfileStatus(response);
          console.log(response);
          if (response.data.message) {
            setProfileStatus(response.data.message);
          } else {
            setProfileStatus("Profile edited successfully ");
          }
        });
    } catch (error) {
      if (error.response) {
        setProfileStatus(error.response.data.message);
      }
    }
  };

  return (
    <div className="container" id="container">
      <div className="form-container sign-in-container">
        <form onSubmit={handlesubmit} className="box">
          <h1>Edit Profile</h1>
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
          <p className="has-text-centered">{profileStatus}</p>
          <button type="submit">Save</button>
        </form>
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-right">
            <h1>Organic Healthcare!</h1>
            <p>Edit your personal details </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
