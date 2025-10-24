import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "./CartContext";

const Navbar = () => {
  const { cart } = useContext(CartContext);

  // Count total items in cart
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav
      style={{
        backgroundColor: "#007bff",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 20px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <Link
        to="/"
        style={{
          textDecoration: "none",
          color: "white",
          fontSize: "20px",
          fontWeight: "bold",
          letterSpacing: "1px",
        }}
      >
        MGS Shop 🛍️
      </Link>

      <div style={{ display: "flex", gap: "20px" }}>
        <Link
          to="/"
          style={{
            color: "white",
            textDecoration: "none",
            fontWeight: "500",
            fontSize: "16px",
          }}
        >
          Home 🏠
        </Link>

        <Link
          to="/cart"
          style={{
            color: "white",
            textDecoration: "none",
            fontWeight: "500",
            fontSize: "16px",
          }}
        >
          Cart 🛒 {cartCount > 0 && <span>({cartCount})</span>}
        </Link>

        <Link
          to="/checkout"
          style={{
            color: "white",
            textDecoration: "none",
            fontWeight: "500",
            fontSize: "16px",
          }}
        >
          Checkout 💳
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
