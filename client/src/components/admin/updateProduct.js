import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../css/productDes.css";
import Sidebar from "./adminside";
import AdminNavbar from "./adminNav";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3001/updateproducts/${id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const handleUpdate = async () => {
    const productId = product.id;
    const username = localStorage.getItem("username");
    try {
      const res = await axios.post("http://localhost:3001/updateproducts", {
        price,
        name,
        description,
        productId,
      });
      console.log(res.data.message);
      alert("Updated successfully");
    } catch (error) {
      console.error(error);
      alert("Product already updated");
    }
  };

  const handleRemove = async () => {
    const productId = product.id;
    const username = localStorage.getItem("username");
    try {
      const res = await axios.post("http://localhost:3001/removeproducts", {
        price,
        name,
        description,
        productId,
      });
      console.log(res.data.message);
      alert("removed successfully");
    } catch (error) {
      console.error(error);
      alert("Product already Removed");
    }
  };

  return (
    <div className="main-content">
      <Sidebar />
      <AdminNavbar />
      <div className="product-page">
        <div className="product-description">
          <div className="product-images">
            <img
              src={`data:image/jpeg;base64,${product.pic}`}
              alt={product.Name}
            />
          </div>
          <div className="product-details">
            <h2>{product.Name}</h2>

            <input
              type="text"
              placeholder="Name"
              required
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="number"
              placeholder="Price"
              required
              onChange={(e) => setPrice(e.target.value)}
            />
            <input
              type="text"
              placeholder="Description"
              required
              onChange={(e) => setDescription(e.target.value)}
            />

            <button onClick={() => handleUpdate()}>Update</button>
            <button onClick={() => handleRemove()}>Remove</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
