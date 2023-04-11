import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import DisplayImage from "./DisplayImage";

import axios from "axios";
import "../css/dashboard.css";
import Navbar from "./navbar";

const HomePage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [DisplayedProducts, setDisplayedProducts] = useState("");
  const [products, setProducts] = useState([]);
  const [productsherb, setProductsherb] = useState([]);
  const [productsfruit, setProductsfruit] = useState([]);
  const [productsveg, setProductsveg] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (loggedIn) {
      setIsLoggedIn(true);
    }
  }, []);

  const addToCart = async (product) => {
    if (isLoggedIn === false) {
      alert("You need to log in to add products to your cart.");
      return;
    }
    const productId = product.id;
    const username = localStorage.getItem("username");
    try {
      const res = await axios.post("http://localhost:3001/cart", {
        product,
        username,
      });
      console.log(res.data.message);
      alert("Added successfully");
    } catch (error) {
      console.error(error);
      alert("Product already added");
    }
  };

  // const handleSearch = async (event) => {
  //   event.preventDefault();
  //   // Perform search
  //   // Get the search term from the input field
  // const searchTerm = event.target.elements.searchTerm.value;

  // try {
  //   // Execute a database query to retrieve the products that match the search term
  //   const results = await pool.query(
  //     `SELECT * FROM health_problem WHERE Name LIKE '%${searchTerm}%'`
  //   );

  //   // Update the displayed products with the search results
  //   setDisplayedProducts(results);
  // } catch (error) {
  //   console.error(error);
  // }
  // };

  const handleSearch = (event) => {
    event.preventDefault();
    // const searchTerm = event.target.elements.searchTerm.value;
    console.log(searchTerm);
    navigate(`/search/${searchTerm}`);
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

  const handleClick = (product) => {
    navigate("/product");
  };

  return (
    <div>
      <Navbar />
      <div className="home-page">
        <section className="hero">
          <div className="hero-content">
            <h1>Choose a Better LifeStyle!</h1>
            <form className="search-form" onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </form>
          </div>
          <img
            src="https://media.istockphoto.com/id/854725372/photo/healthy-food-clean-eating-selection.jpg?s=612x612&w=0&k=20&c=Ef1hlrgJnDdZvs05v6yKz1ajYZX_KaWJdR9vIVSxXP0="
            alt="Organic Products"
          />
        </section>
        <div className="new">
          <h2>New Products</h2>
        </div>

        <div className="products-section">
          <div className="products-container">
            {products.slice(0, 4).map((product) => (
              <Link to={`/product/${product.id}`}>
                <div className="product-card" key={product.id}>
                  <img
                    src={`data:image/jpeg;base64,${product.pic}`}
                    alt={product.Name}
                  />

                  <h3>{product.Name}</h3>
                  <p>RS. {product.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="new">
          <h2>Herbs</h2>
        </div>
        <div className="products-section">
          <div className="products-container">
            {productsherb.slice(0, 4).map((product) => (
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
        <div className="new">
          <h2>Fruits</h2>
        </div>
        <div className="products-section">
          <div className="products-container">
            {productsfruit.slice(0, 4).map((product) => (
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
        <div className="new">
          <h2>Vegetable</h2>
        </div>
        <div className="products-section">
          <div className="products-container">
            {productsveg.slice(0, 4).map((product) => (
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

export default HomePage;
