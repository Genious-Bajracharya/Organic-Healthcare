import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/cart.css";
import Navbar from "./navbar";
import { BiTrash } from "react-icons/bi";
import { RxCross1 } from "react-icons/rx";
import KhaltiCheckout from "khalti-checkout-web";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [quantities, setQuantities] = useState({});
  const username = localStorage.getItem("username");
  const [email, setEmail] = useState("");

  // const [product, setProduct] = useState({});

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
      totalPrice += product.price * product.quantity;
    }
    return totalPrice;
  };

  const handlebuy = () => {
    if (products.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    setShowForm(true);
  };

  const config = {
    // replace this key with yours
    publicKey: "test_public_key_acf579ed65084fd0981860d6294df70f",
    productIdentity: "1234567890",
    productName: "product",
    productUrl: "http://product.com/buy/product",
    eventHandler: {
      onSuccess: function (payload) {
        // hit merchant api for initiating verfication
        handleCheckout();
        console.log(payload);
      },
      onError: function (error) {
        // handle errors
        alert("Error During Payment");
        console.log(error);
      },
      onClose: function () {
        console.log("widget is closing");
      },
    },
    paymentPreference: ["KHALTI"],
  };

  const checkout = new KhaltiCheckout(config);

  const handleCheckout = async () => {
    const items = [];
    for (const product of products) {
      const username = localStorage.getItem("username");
      const quantity = product.quantity;
      const price = product.price;
      console.log(price);
      items.push({
        id: product.Name,
        quantity,
        username,
        price,
      });
      console.log(quantity);

      console.log(username);
      console.log(product);
    }
    const username = localStorage.getItem("username");
    axios
      .post("http://localhost:3001/order", { items, username })
      .then((res) => console.log(res.data))
      .catch((err) => console.error(err));

    const date = new Date();
    const totalPrice = calculateTotalPrice();
    const html = `
  <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
    <div style="background-color: #F5F5F5; padding: 20px;">
    <h1 style="font-size: 28px; margin-top: 0;text-align: center;">Organic Healthcare</h1>
      <h2 style="font-size: 28px; margin-top: 0;text-align: center;">Invoice</h2>
      <p>Order placed on ${date.toLocaleString()}.</p>
      <p style="font-size: 16px; margin-top: 0;">Thank you for your purchase. Your order total is RS. ${totalPrice}.</p>
    </div>
    <table style="border-collapse: collapse; width: 100%;">
      <thead style="background-color: #F5F5F5;">
        <tr>
          <th style="border: 1px solid #ddd; padding: 10px; text-align: left;">Product Name</th>
          <th style="border: 1px solid #ddd; padding: 10px; text-align: left;">Quantity</th>
          <th style="border: 1px solid #ddd; padding: 10px; text-align: left;">Price</th>
        </tr>
      </thead>
      <tbody>
        ${products.map(
          (product) => `
          <tr>
            <td style="border: 1px solid #ddd; padding: 10px;">${
              product.Name
            }</td>
            <td style="border: 1px solid #ddd; padding: 10px;">${
              product.quantity
            }</td>
            <td style="border: 1px solid #ddd; padding: 10px;">RS. ${
              product.price * product.quantity
            }</td>
          </tr>
        `
        )}
        <tr>
          <td colspan="2" style="border: 1px solid #ddd; padding: 10px; text-align: right;">Total</td>
          <td style="border: 1px solid #ddd; padding: 10px;">RS. ${totalPrice}</td>
        </tr>
      </tbody>
    </table>
    <div style="background-color: #F5F5F5; padding: 20px;">
      <p style="font-size: 16px; margin-top: 0;">Thank you for choosing us!</p>
    </div>
  </div>
`;
    const mailOptions = {
      from: '"Organic Healtcare" <bajracharyagenious@gmail.com>',
      to: email,
      subject: "Invoice",
      html: html,
    };
    await axios.post("http://localhost:3001/send-email", mailOptions);

    alert("Purhcase successful");

    window.location.reload();
  };

  const RemovefromCart = async (product) => {
    const productId = product.Name;
    const username = localStorage.getItem("username");
    try {
      await axios.post(`http://localhost:3001/removecart`, {
        productId,
        username,
      });
      console.log(productId);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
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
              <p>Price: RS. {product.price}</p>
            </div>
            <div className="cart-item-quantity">
              <p>{product.quantity}</p>
            </div>

            <BiTrash
              size={28}
              color={"#FF0000"}
              onClick={() => RemovefromCart(product)}
            />
          </div>
        ))}
        <div className="cart-total">
          <span>Total:</span>
          <strong>RS{calculateTotalPrice()}</strong>
        </div>
        <button className="cart-button" onClick={handlebuy}>
          Checkout
        </button>
        {showForm && (
          <div className="modal">
            <div className="modal-form">
              <RxCross1
                className="model-cross"
                size={28}
                color={"#FF0000"}
                onClick={() => setShowForm(false)}
              />
              <h2 className="modal-h2">CONFIRM CHECKOUT</h2>
              <input
                className="modal-input"
                type="text"
                name="name"
                placeholder="Full Name"
                id="name"
                required
              />
              <input
                className="modal-input"
                type="email"
                name="email"
                placeholder="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="modal-input"
                type="text"
                name="Address"
                placeholder="Address"
                id="Address"
                required
              />
              <button
                className="modal-button"
                onClick={() => {
                  const name = document.getElementById("name").value;
                  const email = document.getElementById("email").value;
                  const address = document.getElementById("Address").value;

                  if (!name || !email || !address) {
                    alert("Please fill in all the required fields.");
                    return;
                  }

                  checkout.show({ amount: calculateTotalPrice() * 100 });
                }}
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
