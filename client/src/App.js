import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProductList from "./ProductList";
import Cart from "./Cart";
import Checkout from "./Checkout";
import Success from "./Success";
import Cancel from "./Cancel";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import Welcome from "./Welcome";

function App() {
  return (
    <Router>
      {/* ✅ Navigation Bar */}
      <nav
        style={{
          backgroundColor: "#007bff",
          padding: "15px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "40px",
          color: "white",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          fontFamily: "Arial, sans-serif",
          fontWeight: "bold",
          fontSize: "18px",
          position: "sticky",
          top: 0,
          zIndex: 1000,
        }}
      >
        <Link to="/home" style={{ color: "white", textDecoration: "none" }}>
          🏠 Home
        </Link>
        <Link to="/cart" style={{ color: "white", textDecoration: "none" }}>
          🛒 Cart
        </Link>
        <Link to="/checkout" style={{ color: "white", textDecoration: "none" }}>
          💳 Checkout
        </Link>
        <Link to="/login" style={{ color: "white", textDecoration: "none" }}>
          🔐 Login
        </Link>
        <Link to="/signup" style={{ color: "white", textDecoration: "none" }}>
          ✍️ Signup
        </Link>
      </nav>

      {/* ✅ Page Routes */}
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/products" element={<ProductList />} />
      </Routes>
    </Router>
  );
}

export default App;

