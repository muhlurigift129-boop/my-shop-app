import React, { useContext } from "react";
import { CartContext } from "./CartContext";

const Checkout = () => {
  const { cart, clearCart } = useContext(CartContext);

  const handlePayFastCheckout = () => {
    // Create a form and send data to PayFast
    const form = document.createElement("form");
    form.method = "POST";
    form.action = "https://www.payfast.co.za/eng/process";

    // ✅ Merchant details (these should match your .env or PayFast account)
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
    <div style={{ padding: "2rem" }}>
      <h2>Checkout</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cart.map((item, index) => (
              <li key={index}>
                {item.name} - {item.quantity} × R{(item.price || 0).toFixed(2)}
              </li>
            ))}
          </ul>

          <h3>
            Total: R
            {cart
              .reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0)
              .toFixed(2)}
          </h3>

          <button
            onClick={handlePayFastCheckout}
            style={{
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              padding: "12px 25px",
              borderRadius: "8px",
              fontSize: "17px",
              cursor: "pointer",
              fontWeight: "500",
              boxShadow: "0 4px 10px rgba(0, 123, 255, 0.4)",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
          >
            💳 Pay with PayFast
          </button>

        </>
      )}
    </div>
  );
};

export default Checkout;

