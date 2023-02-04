import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
import "../css/dashboard.css";

const HomePage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = (event) => {
    event.preventDefault();
    // Perform search with searchTerm
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

  return (
    <div className="home-page">
      <div className="hero-section">
        <img src={require("../image/thumb.png")} alt="hero" />
        <div className="search-container">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search products"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="search" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
      <div className="new">
        <h2>New Products</h2>
      </div>

      <div className="products-section">
        <div className="products-container">
          {products.map((product) => (
            <Link to={`/product/${product.id}`}>
              <div className="product-card" key={product.id}>
                <img
                  src="https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="product"
                />
                <h3>{product.Name}</h3>
                <p>RS {product.price}</p>
                <button>Add to Cart</button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
