import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/logreg.css";

const Login = () => {
  const [username, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  // const history = useHistory();
  const navigate = useNavigate();

  const Auth = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:3001/login",
        {
          username: username,
          password: password,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        if (response.data.message) {
          setLoginStatus(response.data.message);
        } else {
          if (response.data.role === "admin") {
            navigate("/admin");
          } else {
            setLoginStatus(response.data[0].email);
            localStorage.setItem("username", username);
            navigate("/otp");
          }
        }
      });
  };

  return (
    <div className="container" id="container">
      <div className="form-container sign-in-container">
        <form onSubmit={Auth} method="post">
          <h1>Log in</h1>
          <div className="space"></div>
          <input
            type="text"
            name="username"
            placeholder="Username"
            id="username"
            required
            value={username}
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
          <p className="error">{loginStatus}</p>

          <a className="forgot" href="/forgot">
            Forgot your password?
          </a>
          <br />
          <button type="submit" value="login">
            Log In
          </button>
        </form>
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-right">
            <h1>Welcome To Organic Healthcare!</h1>
            <p>Dont have an account?</p>
            <a className="ghost" href="/register">
              <button className="ghost" id="signUp">
                Register
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
