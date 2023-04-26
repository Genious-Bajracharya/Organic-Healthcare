import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "./adminside";
import AdminNavbar from "./adminNav";
import Stats from "./stats";

import axios from "axios";
import "../../css/dashboard.css";

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

  const handleSearch = (event) => {
    event.preventDefault();
    // Perform search
  };

  const handleupdate = (event) => {
    event.preventDefault();
    navigate("/admin");
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
      <Sidebar />
      <AdminNavbar />
      <Stats />
      <div className="main-content">
        <div className="new">
          <h2>Herbs</h2>
        </div>
        <div className="products-section">
          <div className="products-container">
            {productsherb.map((product) => (
              <Link to={`/updateproduct/${product.id}`}>
                <div className="product-card" key={product.id}>
                  <img
                    src={`data:image/jpeg;base64,${product.pic}`}
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
              <Link to={`/updateproduct/${product.id}`}>
                <div className="product-card" key={product.id}>
                  <img
                    src={`data:image/jpeg;base64,${product.pic}`}
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
              <Link to={`/updateproduct/${product.id}`}>
                <div className="product-card" key={product.id}>
                  <img
                    src={`data:image/jpeg;base64,${product.pic}`}
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
