import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../css/productDes.css";
import Navbar from "./navbar";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [stockStatus, setStockStatus] = useState("");

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (loggedIn) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/products/${id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const handleAddToCart = async () => {
    if (isLoggedIn == false) {
      alert("You need to log in to add products to your cart.");
      return;
    }
    ///////////////////////////////////
    const productId = product.id;
    const username = localStorage.getItem("username");
    try {
      const res = await axios.post("http://localhost:3001/cart", {
        product,
        username,
        quantity,
      });
      alert("Added successfully");
    } catch (error) {
      console.error(error);
      alert("Product already added");
    }
  };

  const handleQuantityChange = (e) => {
    setQuantity(Number(e.target.value));
  };

  const handleBuy = async () => {
    try {
      await axios.post("http://localhost:3001/buy", {
        username: localStorage.getItem("username"),
        product_id: product.id,
        price: product.price,
      });
      alert("Order placed successfully");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Navbar />
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
            <p className="product-price">RS. {product.price}</p>
            <p>
              In Stock: {stockStatus}
              {product.stock}
            </p>
            <p className="product-description-text">{product.description}</p>
            <div className="product-quantity">
              <p> Quantity:</p>
              <input
                type="number"
                id="quantity"
                name="quantity"
                min="1"
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>

            <button onClick={() => handleAddToCart()}>Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
