import React, { useState, useEffect } from "react";
import axios from "axios";

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
      <h2>Profile</h2>
      <div>Username: {userData.username}</div>
      <div>Email: {userData.email}</div>
      <div>Full Name: {userData.phone}</div>
      <div>Full Password: {userData.password}</div>
      <button>Edit</button>
    </div>
  );
};

export default Profile;
