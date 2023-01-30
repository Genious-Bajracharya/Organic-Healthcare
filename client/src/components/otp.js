import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/otp.css";

const Otp = () => {
  const [otp, setotp] = useState("");
  const [msg, setMsg] = useState("");

  // const history = useHistory();
  const navigate = useNavigate();

  const handlesubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:3001/otp",
        {
          otp: otp,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        if (response.data.message) {
          setMsg(response.data.message);
        } else {
          navigate("/dashboard");
        }
      });
  };

  return (
    <form className="otp" method="post" onSubmit={handlesubmit}>
      <span className="otp">Please check your phone for a code</span>

      <input
        id="code"
        name="code"
        placeholder="Enter code"
        className="otp"
        required
        value={otp}
        onChange={(e) => setotp(e.target.value)}
      />
      <p className="error">{msg}</p>

      <button className="otp">Verify</button>
    </form>
  );
};

export default Otp;
