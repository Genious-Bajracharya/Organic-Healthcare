import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../css/productDes.css";
import Sidebar from "./adminside";
import AdminNavbar from "./adminNav";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [addstock, setstock] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3001/addstock/${id}`)
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
      const res = await axios.post("http://localhost:3001/addstock", {
        addstock,
        productId,
      });
      console.log(productId);
      console.log(res.data.message);
      alert("Stock Updated successfully");
    } catch (error) {
      console.error(error);
      console.log(productId);
      alert("Stock already added");
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
            <h4>In Stock: {product.stock}</h4>

            <input
              className="product-add"
              type="number"
              placeholder="Add Stock"
              value={addstock}
              required
              onChange={(e) => setstock(e.target.value)}
            />

            <button className="add-button" onClick={() => handleUpdate()}>
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
