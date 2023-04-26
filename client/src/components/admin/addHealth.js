import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./adminside";
import AdminNavbar from "./adminNav";
import "../../css/add.css";
import "../../css/admin.css";
import Stats from "./stats.js";

const AddHealth = () => {
  const [name, setname] = useState("");
  const [solution1, setsolution1] = useState("");
  const [solution2, setsolution2] = useState("");
  const [solution3, setsolution3] = useState("");
  const [solution4, setsolution4] = useState("");
  const [solution5, setsolution5] = useState("");

  // const [selectedFile, setSelectedFile] = useState(null);

  const handlesubmit = (e) => {
    e.preventDefault();
    try {
      axios
        .post("http://localhost:3001/addhealthproblem", {
          name: name,
          solution1: solution1,
          solution2: solution2,
          solution3: solution3,
          solution4: solution4,
          solution5: solution5,
        })
        .then((response) => {
          console.log(response);
          if (response.data.message) {
            alert(response.data.message);
          } else {
            alert("Added succesfully");
            window.location.reload();
          }
        });
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      }
    }
  };

  return (
    <div>
      <AdminNavbar />
      <Sidebar />
      <Stats />

      <div className="main-content">
        <div className="form-style-6">
          <form
            onSubmit={handlesubmit}
            method="post"
            encType="multipart/form-data"
          >
            <h1>Add Health Problem</h1>
            <div className="space"></div>

            <input
              type="text"
              name="name"
              placeholder="Name of Health Problem"
              id="name"
              required
              value={name}
              onChange={(e) => setname(e.target.value)}
            />
            <input
              type="type"
              name="type"
              placeholder="Solution 1"
              id="type"
              required
              value={solution1}
              onChange={(e) => setsolution1(e.target.value)}
            />
            <input
              type="type"
              name="type"
              placeholder="Solution 2"
              id="type"
              required
              value={solution2}
              onChange={(e) => setsolution2(e.target.value)}
            />
            <input
              type="type"
              name="type"
              placeholder="Solution 3"
              id="type"
              required
              value={solution3}
              onChange={(e) => setsolution3(e.target.value)}
            />
            <input
              type="type"
              name="type"
              placeholder="Solution 4"
              id="type"
              required
              value={solution4}
              onChange={(e) => setsolution4(e.target.value)}
            />
            <input
              type="type"
              name="type"
              placeholder="Solution 5"
              id="type"
              required
              value={solution5}
              onChange={(e) => setsolution5(e.target.value)}
            />

            <br />
            <button className="add-button" type="submit">
              Add
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddHealth;
