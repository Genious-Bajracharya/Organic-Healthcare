import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/cart.css";
import Navbar from "./navbar";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
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

  const handleQuantityChange = (event, productId) => {
    const newQuantities = { ...quantities };
    newQuantities[productId] = parseInt(event.target.value);
    setQuantities(newQuantities);
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    for (const product of products) {
      const quantity = quantities[product.id] || 1;
      totalPrice += product.price * quantity;
    }
    return totalPrice;
  };

  const handleCheckout = () => {
    const items = [];
    for (const product of products) {
      const username = localStorage.getItem("username");
      const quantity = quantities[product.id] || 1;
      items.push({
        id: product.Name,
        quantity,
        username,
      });
      // console.log(quantity);

      console.log(username);
      console.log(product);
    }
    const username = localStorage.getItem("username");
    axios
      .post("http://localhost:3001/order", { items, username })
      .then((res) => console.log(res.data))
      .catch((err) => console.error(err));
    alert("Purhcase successful");
    window.location.reload();
  };

  const handleBuy = (product) => {
    console.log(product);
    axios
      .post("http://localhost:3001/buy", product)
      .then((res) => console.log(res.data))
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <Navbar />
      <div className="cart">
        <h2 className="cart-title">My Cart</h2>
        {products.map((product) => (
          <div className="cart-item" key={product.id}>
            <div className="cart-item-image">
              <img
                src={`data:image/jpeg;base64,${product.pic}`}
                alt={product.Name}
              />
            </div>
            <div className="cart-item-details">
              <h3>{product.Name}</h3>
              <p>Price: RS{product.price}</p>
            </div>
            <div className="cart-item-quantity">
              <input
                type="number"
                min="1"
                value={quantities[product.id] || 1}
                onChange={(event) => handleQuantityChange(event, product.id)}
              />
            </div>
          </div>
        ))}

        <div className="cart-total">
          <span>Total:</span>
          <strong>RS{calculateTotalPrice()}</strong>
        </div>
        <button onClick={handleCheckout}>Checkout</button>
      </div>
    </div>
  );
};

export default Cart;
