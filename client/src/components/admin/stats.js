import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./adminside";
import "../../css/stats.css";
import AdminNavbar from "./adminNav";
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";
import { BsCartX } from "react-icons/bs";
import { TbCurrencyRupeeNepalese } from "react-icons/tb";

const Stats = () => {
  const [money, setmoney] = useState([]);
  const [Totalusers, setTUsers] = useState([]);
  const [stock, setstock] = useState([]);
  const [order, setorder] = useState([]);

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
        const res = await axios.get("http://localhost:3001/money");
        setmoney(res.data[0].count_total);
        console.log(money);
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
                <div className="indicator"></div>
                <i className="bx bx-up-arrow-alt" />
                <span className="text">Order Detail</span>
              </div>
              <i className="bx bx-cart-alt cart">
                <AiOutlineShoppingCart />
              </i>
            </div>

            <div className="box">
              <div className="right-side">
                <div className="box-topic">Total Sales</div>
                <div className="number">{money}</div>
                <div className="indicator">
                  <i className="bx bx-up-arrow-alt" />
                  <span className="text">Up from yesterday</span>
                </div>
              </div>
              <i className="bx bxs-cart-add cart two">
                <TbCurrencyRupeeNepalese />
              </i>
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
              <i className="bx bx-cart cart three">
                <AiOutlineUser />
              </i>
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
              <i className="bx bxs-cart-download cart four">
                <BsCartX />
              </i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
