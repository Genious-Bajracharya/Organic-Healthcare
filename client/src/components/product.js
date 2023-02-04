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

  return (
    <div className="product-detail">
      <img src={product.image} alt={product.Name} />
      <h2>{product.Name}</h2>
      <p>Price: RS {product.price}</p>
      <p>Description: {product.description}</p>
    </div>
  );
};

export default ProductDetail;
