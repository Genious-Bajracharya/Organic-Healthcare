import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./adminside";
import "../../css/stats.css";
import AdminNavbar from "./adminNav";
import { Link } from "react-router-dom";

const Stats = () => {
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);
  const [Totalusers, setTUsers] = useState([]);
  const [stock, setstock] = useState([]);
  const [order, setorder] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:3001/users");
        setUsers(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:3001/showusers");
        setTUsers(res.data[0]["count(username)"]);
        console.log(Totalusers);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:3001/showorder");
        setorder(res.data[0]["count(DISTINCT created_at)"]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:3001/showstock");
        setstock(res.data[0]["count(Name)"]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <div className="home-section">
        <div className="home-content">
          <div className="overview-boxes">
            <div className="box">
              <div className="right-side">
                <div className="box-topic">Total Order</div>
                <div className="number">{order}</div>
                <div className="indicator">
                  <i className="bx bx-up-arrow-alt" />
                </div>
              </div>
              <i className="bx bx-cart-alt cart" />
            </div>
            <div className="box">
              <div className="right-side">
                <div className="box-topic">Total Sales</div>
                <div className="number">38,876</div>
                <div className="indicator">
                  <i className="bx bx-up-arrow-alt" />
                  <span className="text">Up from yesterday</span>
                </div>
              </div>
              <i className="bx bxs-cart-add cart two" />
            </div>
            <div className="box">
              <div className="right-side">
                <div className="box-topic">Total Users</div>
                <div className="number">{Totalusers}</div>
                <div className="indicator">
                  <i className="bx bx-up-arrow-alt" />
                  <span className="text">Users Registered</span>
                </div>
              </div>
              <i className="bx bx-cart cart three" />
            </div>
            <div className="box">
              <div className="right-side">
                <div className="box-topic">Out of Stock</div>
                <div className="number">{stock}</div>
                <div className="indicator">
                  <i className="bx bx-down-arrow-alt down" />
                  <span className="text">Products out of stock</span>
                </div>
              </div>
              <i className="bx bxs-cart-download cart four" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
