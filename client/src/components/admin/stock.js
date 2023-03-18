import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./adminside";
import "../../css/admin.css";
import { Link, useNavigate } from "react-router-dom";

const Stock = () => {
  const [stocks, setStock] = useState([]);
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
    event.preventDefault();
    navigate(`/addstock/${stocks.id}`);
  };

  return (
    <div className="main-content">
      <Sidebar />
      <h2>Stock</h2>
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
          {stocks.map((stock) => (
            <tr key={stock.id}>
              <td>{stock.Name}</td>
              <td>{stock.type}</td>
              <td>{stock.stock}</td>
              <button onClick={() => handleadd()}>Add</button>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Stock;
