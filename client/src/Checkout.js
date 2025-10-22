import React, { useState, useContext } from "react";
import { CartContext } from "./CartContext";

const Checkout = () => {
  const { cart, clearCart } = useContext(CartContext);

  const [deliveryType, setDeliveryType] = useState("Delivery");
  const [address, setAddress] = useState("");

  // Calculate totals
  const subtotal = cart.reduce((sum, item) => {
    const price = item.type === "Box" ? item.boxPrice : item.packetPrice;
    return sum + price * item.quantity;
  }, 0);

  const deliveryFee = deliveryType === "Delivery" ? (subtotal > 600 ? 0 : 50) : 0;
  const total = subtotal + deliveryFee;

  const handlePayNow = async () => {
    try {
      // Prepare the item description for PayFast
      const item_name = cart.map(item => `${item.name} (${item.type}) x${item.quantity}`).join(", ");

      const res = await fetch("http://localhost:5000/pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: total, item_name })
      });

      const data = await res.json();
      if (data.url) {
        clearCart(); // Empty cart after sending to payment
        window.location.href = data.url; // Redirect to PayFast
      } else {
        alert("Payment failed. Please try again.");
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment error. Check the console.");
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Checkout</h1>

      <div>
        <label>
          <input
            type="radio"
            value="Delivery"
            checked={deliveryType === "Delivery"}
            onChange={() => setDeliveryType("Delivery")}
          />
          Delivery
        </label>
        <label style={{ marginLeft: "20px" }}>
          <input
            type="radio"
            value="Collect"
            checked={deliveryType === "Collect"}
            onChange={() => setDeliveryType("Collect")}
          />
          Collect
        </label>
      </div>

      {deliveryType === "Delivery" && (
        <div style={{ marginTop: "10px" }}>
          <input
            type="text"
            placeholder="Enter your delivery address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            style={{ padding: "6px", width: "300px" }}
          />
        </div>
      )}

      <h2 style={{ marginTop: "20px" }}>Subtotal: R{subtotal}</h2>
      <h2>Delivery Fee: R{deliveryFee}</h2>
      <h2>Total: R{total}</h2>

      <button
        onClick={handlePayNow}
        style={{
          marginTop: "20px",
          backgroundColor: "#28a745",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        Pay Now
      </button>
    </div>
  );
};

export default Checkout;

