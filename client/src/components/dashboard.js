import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import "../css/dashboard.css";

const HomePage = () => {
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

  return (
    <div className="home-page">
      <div className="hero-section">
        <img
          src="https://imgs.search.brave.com/6Kb_PGu9clwnlIwKu377XAAPqb8XnYZwQHGAjTLKw1A/rs:fit:759:225:1/g:ce/aHR0cHM6Ly90c2U0/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC43/c3ZsWXppZ1hvR3Bq/clV2UkNRQmlRSGFF/byZwaWQ9QXBp"
          alt="hero"
        />
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
      <div className="products-section">
        <h2>Popular Products</h2>
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
