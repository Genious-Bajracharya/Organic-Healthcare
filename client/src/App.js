import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/dashboard";
import Login from "./components/login";
import Register from "./components/register";
import Forgot from "./components/forgot";
import Otp from "./components/otp";
import Reset from "./components/reset";
import Navbar from "./components/navbar";
import Product from "./components/product";
import Cart from "./components/cart";
import Profile from "./components/profile";
import EditProfile from "./components/editprofile";
import Admin from "./components/admin/admin";
import Category from "./components/category";
import Allproduct from "./components/admin/Allproduct";
import Updateproduct from "./components/admin/updateProduct";
import Orders from "./components/admin/orders";
import Stock from "./components/admin/stock";
import AddStock from "./components/admin/addStock";
import Search from "./components/search";
import SearchProduct from "./components/searchproduct";
import AddProduct from "./components/admin/addProduct";
import AddAdmin from "./components/admin/addAdmin";
import AddHealth from "./components/admin/addHealth";
import Orderdetail from "./components/admin/orderdetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/forgot" element={<Forgot />} />
        <Route exact path="/reset" element={<Reset />} />
        <Route exact path="/otp" element={<Otp />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/product/:id" element={<Product />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/editprofile" element={<EditProfile />} />
        <Route exact path="/admin" element={<Admin />} />
        <Route exact path="/category" element={<Category />} />
        <Route exact path="/allproduct" element={<Allproduct />} />
        <Route exact path="/updateproduct/:id" element={<Updateproduct />} />
        <Route exact path="/orders" element={<Orders />} />
        <Route exact path="/stock" element={<Stock />} />
        <Route exact path="/addstock/:id" element={<AddStock />} />
        <Route exact path="/search/:id" element={<Search />} />
        <Route exact path="/searchproduct/:id" element={<SearchProduct />} />
        <Route exact path="/addadmin" element={<AddAdmin />} />
        <Route exact path="/addproduct" element={<AddProduct />} />
        <Route exact path="/addhealth" element={<AddHealth />} />
        <Route exact path="/orderdetail/:id" element={<Orderdetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
