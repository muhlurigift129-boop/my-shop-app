import React from "react";
import { Link } from "react-router-dom";

export default function Cancel() {
  return (
    <div style={{ textAlign: "center", padding: "60px" }}>
      <h1 style={{ color: "red" }}>❌ Payment Cancelled</h1>
      <p>Your payment was cancelled. You can try again anytime.</p>
      <Link to="/" style={{ color: "blue" }}>
        Return to Home
      </Link>
    </div>
  );
}

