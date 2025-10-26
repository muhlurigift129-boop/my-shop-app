import React from "react";

const Cancel = () => {
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>❌ Payment Cancelled</h2>
      <p>Your order was cancelled. You can try again anytime.</p>
      <a href="/" style={{ color: "#007bff" }}>Back to Home</a>
    </div>
  );
};

export default Cancel;

