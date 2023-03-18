import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./navbar";

const Profile = () => {
  const [userData, setUserData] = useState({});
  const username = localStorage.getItem("username");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3001/profile/${username}`
        );
        setUserData(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserData();
  }, [username]);

  return (
    <div>
      <Navbar />
      <div>
        <h2>Profile</h2>
        <div>Username: {userData.username}</div>
        <div>Email: {userData.email}</div>
        <div>Phone number: {userData.phone}</div>
        <div>Full Password: {userData.password}</div>
        <a href="/editprofile">
          <button>Edit</button>
        </a>
      </div>
    </div>
  );
};

export default Profile;
