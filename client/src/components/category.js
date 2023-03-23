import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
import "../css/dashboard.css";
import Navbar from "./navbar";

const HomePage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [productsherb, setProductsherb] = useState([]);
  const [productsfruit, setProductsfruit] = useState([]);
  const [productsveg, setProductsveg] = useState([]);
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);

  const handleAddToCart = (product) => {
    const addToCart = (product) => {
      return {
        type: "ADD_TO_CART",
        payload: product,
      };
    };
  };

  const addToCart = async (product) => {
    const productId = product.id;
    const username = localStorage.getItem("username");
    try {
      const res = await axios.post("http://localhost:3001/cart", {
        product,
        username,
      });
      console.log(res.data.message);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    // Perform search
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  const handleClick = (product) => {
    navigate("/product");
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/productsherb")
      .then((response) => {
        setProductsherb(response.data);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3001/productsfruit")
      .then((response) => {
        setProductsfruit(response.data);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3001/productsveg")
      .then((response) => {
        setProductsveg(response.data);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <div className="home-page">
        <div className="new">
          <h2>Herbs</h2>
        </div>
        <div className="products-section">
          <div className="products-container">
            {productsherb.map((product) => (
              <Link to={`/product/${product.id}`}>
                <div className="product-card" key={product.id}>
                  <img
                    src={process.env.PUBLIC_URL + `/images/${product.image}`}
                    alt={product.Name}
                  />
                  <h3>{product.Name}</h3>
                  <p>RS {product.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="new">
          <h2>Fruits</h2>
        </div>
        <div className="products-section">
          <div className="products-container">
            {productsfruit.map((product) => (
              <Link to={`/product/${product.id}`}>
                <div className="product-card" key={product.id}>
                  <img
                    src={process.env.PUBLIC_URL + `/images/${product.image}`}
                    alt={product.Name}
                  />
                  <h3>{product.Name}</h3>
                  <p>RS {product.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="new">
          <h2>Vegetable</h2>
        </div>
        <div className="products-section">
          <div className="products-container">
            {productsveg.map((product) => (
              <Link to={`/product/${product.id}`}>
                <div className="product-card" key={product.id}>
                  <img
                    src={process.env.PUBLIC_URL + `/images/${product.image}`}
                    alt={product.Name}
                  />
                  <h3>{product.Name}</h3>
                  <p>RS {product.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
