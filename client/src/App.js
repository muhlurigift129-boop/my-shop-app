import React, { useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "./AuthContext";

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
  const { isLoggedIn, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleCartClick = () => {
    if (!isLoggedIn) {
      alert("Please log in or sign up before adding items to cart!");
      navigate("/login");
    } else {
      navigate("/cart");
    }
  };

  return (
    <div>
      {/* ✅ Header Bar */}
      <header
        style={{
          backgroundColor: "#007bff",
          padding: "15px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: "white",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          position: "sticky",
          top: 0,
          zIndex: 1000,
        }}
      >
        {/* ☰ Menu Button */}
        <button
          onClick={toggleMenu}
          style={{
            fontSize: "24px",
            background: "none",
            border: "none",
            color: "white",
            cursor: "pointer",
          }}
        >
          ☰
        </button>

        <h2 style={{ margin: 0 }}>My Shop</h2>

        {/* 🛒 Cart Button */}
        <button
          onClick={handleCartClick}
          style={{
            fontSize: "24px",
            background: "none",
            border: "none",
            color: "white",
            cursor: "pointer",
          }}
        >
          🛒
        </button>
      </header>

      {/* ✅ Animated Sidebar Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Overlay background */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={toggleMenu}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "black",
                zIndex: 999,
              }}
            />

            {/* Sliding menu */}
            <motion.div
              initial={{ x: -250 }}
              animate={{ x: 0 }}
              exit={{ x: -250 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "220px",
                height: "100%",
                backgroundColor: "white",
                padding: "20px",
                zIndex: 1000,
                display: "flex",
                flexDirection: "column",
                gap: "15px",
                boxShadow: "4px 0 10px rgba(0,0,0,0.2)",
              }}
            >
              <h3 style={{ color: "#007bff", marginBottom: "20px" }}>Menu</h3>

              <Link to="/home" onClick={toggleMenu} style={linkStyle}>
                🏠 Home
              </Link>
              <Link to="/checkout" onClick={toggleMenu} style={linkStyle}>
                💳 Checkout
              </Link>

              {!isLoggedIn ? (
                <>
                  <Link to="/login" onClick={toggleMenu} style={linkStyle}>
                    🔐 Login
                  </Link>
                  <Link to="/signup" onClick={toggleMenu} style={linkStyle}>
                    ✍️ Signup
                  </Link>
                </>
              ) : (
                <button
                  onClick={() => {
                    logout();
                    toggleMenu();
                  }}
                  style={{
                    ...linkStyle,
                    background: "none",
                    border: "none",
                    color: "red",
                    textAlign: "left",
                    cursor: "pointer",
                    padding: 0,
                  }}
                >
                  🚪 Logout
                </button>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ✅ Routes */}
      <div style={{ padding: "20px" }}>
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
      </div>
    </div>
  );
}

const linkStyle = {
  textDecoration: "none",
  color: "#333",
  fontSize: "18px",
  fontWeight: "bold",
  transition: "0.2s",
};

export default App;

