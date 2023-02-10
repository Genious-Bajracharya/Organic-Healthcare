import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../css/productDes.css";

const ProductDetail = () => {
  let { id } = useParams();
  const [product, setProduct] = useState({});

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
    <div className="product-container">
      <div className="single-product">
        <div className="row">
          <div className="col-6">
            <div className="product-image">
              <div className="product-image-main">
                <img
                  src={`${process.env.PUBLIC_URL}/images/${product.image}`}
                  alt={product.Name}
                  id="product-main-image"
                />
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="product">
              <div className="product-title">
                <h2>{product.Name}</h2>
              </div>
              <div className="product-price">
                <span className="offer-price">RS{product.price}</span>
              </div>

              <div className="product-details">
                <h3>Description</h3>
                <p>{product.description}</p>
              </div>

              <span className="divider" />
            </div>

            <div className="product-btn-group">
              <div className="button buy-now" onClick={handleBuy}>
                <i className="bx bxs-zap" /> Buy Now
              </div>
              <div
                className="button add-cart"
                onClick={() => addToCart(product)}
              >
                <i className="bx bxs-cart" /> Add to Cart
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
