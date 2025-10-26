import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "./CartContext";

const Navbar = () => {
  const { cart } = useContext(CartContext);
  const [open, setOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  // Count total items in cart
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

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
      {/* Logo / Title */}
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

      {/* Desktop Menu */}
      <div className="menu-desktop" style={{ display: "flex", gap: "20px" }}>
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

        {user ? (
          <>
            <Link
              to="/profile"
              style={{
                color: "white",
                textDecoration: "none",
                fontWeight: "500",
                fontSize: "16px",
              }}
            >
              Profile 👤
            </Link>
            <button
              onClick={handleLogout}
              style={{
                backgroundColor: "transparent",
                border: "1px solid white",
                color: "white",
                padding: "4px 8px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            style={{
              color: "white",
              textDecoration: "none",
              fontWeight: "500",
              fontSize: "16px",
            }}
          >
            Login 🔑
          </Link>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          background: "transparent",
          border: "none",
          color: "white",
          fontSize: "24px",
          cursor: "pointer",
          display: "none",
        }}
        className="menu-toggle"
      >
        ☰
      </button>

      {/* Mobile Dropdown Menu */}
      {open && (
        <div
          style={{
            position: "absolute",
            top: "60px",
            right: "20px",
            backgroundColor: "#007bff",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            padding: "10px 20px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            zIndex: 2000,
          }}
        >
          <Link
            to="/"
            onClick={() => setOpen(false)}
            style={{ color: "white", textDecoration: "none" }}
          >
            Home 🏠
          </Link>
          <Link
            to="/cart"
            onClick={() => setOpen(false)}
            style={{ color: "white", textDecoration: "none" }}
          >
            Cart 🛒 ({cartCount})
          </Link>
          <Link
            to="/checkout"
            onClick={() => setOpen(false)}
            style={{ color: "white", textDecoration: "none" }}
          >
            Checkout 💳
          </Link>
          {user ? (
            <>
              <Link
                to="/profile"
                onClick={() => setOpen(false)}
                style={{ color: "white", textDecoration: "none" }}
              >
                Profile 👤
              </Link>
              <button
                onClick={handleLogout}
                style={{
                  backgroundColor: "white",
                  color: "#007bff",
                  border: "none",
                  borderRadius: "5px",
                  padding: "5px 10px",
                  cursor: "pointer",
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              style={{ color: "white", textDecoration: "none" }}
            >
              Login 🔑
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

