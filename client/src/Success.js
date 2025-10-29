import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Success = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);
    const subtotal = savedCart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotal(subtotal);
    // Clear cart after successful payment
    localStorage.removeItem("cart");
  }, []);

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "50px auto",
        padding: "25px",
        textAlign: "center",
        background: "#f4fff9",
        borderRadius: "15px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <h1 style={{ color: "green" }}>✅ Payment Successful!</h1>
      <p style={{ fontSize: "16px", marginTop: "10px" }}>
        Thank you for your order from MGS Traders. Here’s your summary:
      </p>

      <ul style={{ textAlign: "left", marginTop: "20px" }}>
        {cartItems.map((item, i) => (
          <li key={i}>
            {item.name} × {item.quantity} = R{item.price * item.quantity}
          </li>
        ))}
      </ul>

      <h3 style={{ marginTop: "20px" }}>Total Paid: R{total.toFixed(2)}</h3>

      <button
        onClick={() => (window.location.href = "/home")}
        style={{
          marginTop: "25px",
          padding: "12px 25px",
          fontSize: "16px",
          fontWeight: "bold",
          color: "blue",
          background: "linear-gradient(135deg, #00c853, #007bff)",
          border: "none",
          borderRadius: "35px",
          cursor: "pointer",
          boxShadow: "0 4px 15px rgba(0, 200, 83, 0.4)",
          transition: "all 0.3s ease",
        }}
        onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
        onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
      >
        Back to Home 🏠
      </button>
    </div>
  );
};

export default Success;

