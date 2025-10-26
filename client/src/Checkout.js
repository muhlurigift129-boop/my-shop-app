import React, { useContext } from "react";
import { CartContext } from "./CartContext";

const Checkout = () => {
  const { cart, clearCart } = useContext(CartContext);

  const handlePayFastCheckout = () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    // Create a form and send data to PayFast
    const form = document.createElement("form");
    form.method = "POST";
    form.action = "https://www.payfast.co.za/eng/process";

    // ✅ Merchant details (replace with your real details when live)
    const data = {
      merchant_id: "21640826", // your PayFast Merchant ID
      merchant_key: "lbwzjvmjwbsfj", // your PayFast Merchant Key
      return_url: "https://mg-s-treders.onrender.com/success",
      cancel_url: "https://mg-s-treders.onrender.com/cancel",
      notify_url: "https://mg-s-treders.onrender.com/api/payfast/notify",
      amount: cart
        .reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0)
        .toFixed(2),
      item_name: "MGS Traders Order",
      email_confirmation: 1,
      confirmation_address: "your@email.com", // optional
      custom_str1: "MGS App Checkout",
    };

    // Add form fields dynamically
    for (const key in data) {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = data[key];
      form.appendChild(input);
    }

    document.body.appendChild(form);
    form.submit();
  };

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "40px auto",
        backgroundColor: "white",
        padding: "30px",
        borderRadius: "15px",
        boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          color: "#007bff",
          marginBottom: "20px",
        }}
      >
        Checkout
      </h2>

      {cart.length === 0 ? (
        <p style={{ textAlign: "center", fontSize: "18px", color: "#555" }}>
          Your cart is empty.
        </p>
      ) : (
        <>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {cart.map((item, index) => (
              <li
                key={index}
                style={{
                  padding: "10px 0",
                  borderBottom: "1px solid #eee",
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "17px",
                }}
              >
                <span>
                  {item.name} × {item.quantity}
                </span>
                <strong>R{(item.price || 0) * item.quantity}</strong>
              </li>
            ))}
          </ul>

          <h3
            style={{
              textAlign: "right",
              marginTop: "20px",
              color: "#333",
              fontWeight: "bold",
            }}
          >
            Total: R
            {cart
              .reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0)
              .toFixed(2)}
          </h3>

          <button
            onClick={handlePayFastCheckout}
            style={{
              marginTop: "25px",
              width: "100%",
              background: "linear-gradient(135deg, #007bff, #00c853)",
              color: "white",
              border: "none",
              padding: "15px",
              borderRadius: "12px",
              fontSize: "18px",
              fontWeight: "bold",
              cursor: "pointer",
              boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) =>
              (e.target.style.background = "linear-gradient(135deg, #00c853, #007bff)")
            }
            onMouseOut={(e) =>
              (e.target.style.background = "linear-gradient(135deg, #007bff, #00c853)")
            }
          >
            💳 Pay with PayFast
          </button>
        </>
      )}
    </div>
  );
};

export default Checkout;

