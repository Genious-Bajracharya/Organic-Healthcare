import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./adminside";
import "../../css/admin.css";

const Addadmin = () => {
  const [name, setname] = useState("");
  const [price, setprice] = useState("");
  const [description, setdescription] = useState("");
  const [type, settype] = useState("");
  const [image, setImage] = useState("");

  // const [selectedFile, setSelectedFile] = useState(null);

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("type", type);
    formData.append("description", description);
    formData.append("image", image);
    console.log(image);
    try {
      axios
        .post("http://localhost:3001/addproduct", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response);
          if (response.data.message) {
            console.log(response.data.message);
          } else {
            console.log(
              "ACCOUNT CREATED SUCCESSFULLY CHECK YOU EMAIL FOR VERIFICATION "
            );
          }
        });
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
      }
    }
  };

  return (
    <div className="main-content">
      <Sidebar />
      <form onSubmit={handlesubmit} method="post" encType="multipart/form-data">
        <h1>Add</h1>
        <div className="space"></div>

        <input
          type="text"
          name="name"
          placeholder="name"
          id="name"
          required
          value={name}
          onChange={(e) => setname(e.target.value)}
        />
        <input
          type="type"
          name="type"
          placeholder="type"
          id="type"
          required
          value={type}
          onChange={(e) => settype(e.target.value)}
        />
        <input
          type="price"
          name="price"
          placeholder="price"
          id="price"
          required
          value={price}
          onChange={(e) => setprice(e.target.value)}
        />
        <input
          type="description"
          name="description"
          placeholder="description"
          id="description"
          required
          value={description}
          onChange={(e) => setdescription(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          name="image"
          onChange={handleImageChange}
        />

        <br />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default Addadmin;
