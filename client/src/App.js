import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProductList from "./ProductList";
import Cart from "./Cart";
import Checkout from "./Checkout";
import Success from "./Success";
import Cancel from "./Cancel";

function App() {
  return (
    <Router>
      {/* ✅ Modern Blue Navigation Bar */}
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
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          🏠 Home
        </Link>
        <Link to="/cart" style={{ color: "white", textDecoration: "none" }}>
          🛒 Cart
        </Link>
        <Link to="/checkout" style={{ color: "white", textDecoration: "none" }}>
          💳 Checkout
        </Link>
      </nav>

      {/* ✅ Page Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
      </Routes>
    </Router>
  );
}

export default App;

