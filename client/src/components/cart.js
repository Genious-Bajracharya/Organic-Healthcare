import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/cart.css";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const username = localStorage.getItem("username");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/cart/${username}`);
        setProducts(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, [username]);

  const handleBuy = (product) => {
    console.log(product);
    axios
      .post("http://localhost:3001/buy", product)
      .then((res) => console.log(res.data))
      .catch((err) => console.error(err));
  };

  return (
    <div className="cart-page">
      <h2>Cart</h2>
      <table className="cart-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.Name}>
              <td>{product.Name}</td>
              <td>{product.price}</td>
              <td>
                <img src={product.image} alt={product.Name} />
              </td>
              <button onClick={() => handleBuy(product)}>Buy</button>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Cart;
