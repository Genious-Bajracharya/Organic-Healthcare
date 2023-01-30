import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [password, setPassword] = useState("");
  const [code, setcode] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [resetstatus, setResetStatus] = useState("");
  //   const history = useHistory();
  const navigate = useNavigate();

  const handlesubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/reset", {
        code: code,
        password: password,
        confPassword: confPassword,
      })
      .then((response) => {
        setResetStatus(response);
        console.log(response);
        if (response.data.message) {
          setResetStatus(response.data.message);
        } else {
          setResetStatus("Password has been changed");
        }
      });
  };

  return (
    <div className="container" id="container">
      <div className="form-container sign-in-container">
        <form onSubmit={handlesubmit} method="post">
          <h1>Reset you password</h1>
          <p>A code has been sent to you email</p>
          <input
            type="text"
            name="code"
            placeholder="code"
            id="code"
            required
            value={code}
            onChange={(e) => setcode(e.target.value)}
          />
          <input
            type="password"
            name="password"
            placeholder="Enter new password"
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            name="password1"
            placeholder="Confirm Password"
            id="password1"
            required
            value={confPassword}
            onChange={(e) => setConfPassword(e.target.value)}
          />
          <br />
          <p className="has-text-centered">{resetstatus}</p>
          <button value="reset">Reset</button>
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

export default Register;
