import React, { useState } from "react";
import "../css/dashboard.css";

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    event.preventDefault();
    // Perform search with searchTerm
  };

  return (
    <div className="home-page">
      <div className="hero-section">
        <img
          src="https://imgs.search.brave.com/dVAThiCFkFgUGFKSeDWLuZqNMx55bHHEvFeHONoXKF8/rs:fit:1200:1080:1/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJjYXZlLmNv/bS93cC93cDYwNDA5/NTYucG5n"
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
            <button type="submit">Search</button>
          </form>
        </div>
      </div>
      <div className="products-section">
        <h2>Popular Products</h2>
        <div className="products-container">
          <div className="product-card">
            <img src="https://via.placeholder.com/200x200" alt="product" />
            <h3>Product 1</h3>
            <p>$10.99</p>
            <button>Add to Cart</button>
          </div>
          <div className="product-card">
            <img src="https://via.placeholder.com/200x200" alt="product" />
            <h3>Product 2</h3>
            <p>$19.99</p>
            <button>Add to Cart</button>
          </div>
          <div className="product-card">
            <img src="https://via.placeholder.com/200x200" alt="product" />
            <h3>Product 3</h3>
            <p>$29.99</p>
            <button>Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
