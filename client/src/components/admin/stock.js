import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./adminside";
import "../../css/admin.css";
import { Link, useNavigate } from "react-router-dom";
import AdminNavbar from "./adminNav";

const Stock = () => {
  const [product, setStock] = useState([]);
  const [stock, setStoc] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:3001/stock");
        setStock(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, []);

  const handleadd = (event) => {
    navigate(`/addstock/${product.id}`);
    console.log(product.id);
    console.log(stock.id);
  };

  return (
    <div className="main-content">
      <Sidebar />
      <AdminNavbar />
      <h2 className="main-content_h2">Stock</h2>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Type</th>
            <th>InStock</th>
            <th>Add Stock</th>
          </tr>
        </thead>
        <tbody>
          {product.map((stock) => (
            <tr key={stock.id}>
              <td>{stock.Name}</td>
              <td>{stock.type}</td>
              <td>{stock.stock}</td>
              <button
                className="main-content_button"
                onClick={() => navigate(`/addstock/${stock.id}`)}
              >
                Add
              </button>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Stock;
