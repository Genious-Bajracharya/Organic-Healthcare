import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import axios from "axios";
import "../css/dashboard.css";
import Navbar from "./navbar";

const SearchProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);

  const handleSearch = (event) => {
    event.preventDefault();
    // Perform search
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3001/searchproduct/${id}`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  return (
    <div>
      <Navbar />
      <div className="home-page">
        <div className="new">
          <h2>Search Results.</h2>
        </div>
        <div className="products-section">
          <div className="products-container">
            {products.map((product) => (
              <Link to={`/product/${product.id}`}>
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

export default SearchProduct;
