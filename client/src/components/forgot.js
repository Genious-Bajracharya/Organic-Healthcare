import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import "../css/otp.css";

const Otp = () => {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  // const history = useHistory();
  const navigate = useNavigate();

  const handlesubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:3001/forgot",
        {
          email: email,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        if (response.data.message) {
          setMsg(response.data.message);
        } else {
          setMsg("email found");
          navigate("/reset");
        }
      });
  };

  return (
    <div className="container" id="container">
      <div className="form-container sign-in-container">
        <form onSubmit={handlesubmit} method="post">
          <h1>Enter your email address</h1>
          <input
            type="email"
            name="email"
            placeholder="emal"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <p className="has-text-centered">{msg}</p>
          <button type="submit" value="forgot">
            next
          </button>
        </form>
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-right">
            <h1>Organic Healthcare!</h1>
            <p>Go back to login?</p>
            <button className="ghost" id="signUp">
              <a className="ghost" href="/login">
                Back
              </a>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Otp;
