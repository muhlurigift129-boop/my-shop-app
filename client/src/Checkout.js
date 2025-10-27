import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "./CartContext";

const Checkout = () => {
  const { cart, total, clearCart } = useContext(CartContext);
  const [deliveryOption, setDeliveryOption] = useState("Delivery");
  const [address, setAddress] = useState("");
  const [deliveryFee, setDeliveryFee] = useState(0);

  useEffect(() => {
    if (deliveryOption === "Delivery" && total < 600) setDeliveryFee(50);
    else setDeliveryFee(0);
  }, [deliveryOption, total]);

  const handlePayFastCheckout = () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const amount = (total + deliveryFee).toFixed(2);
    const form = document.createElement("form");
    form.method = "POST";
    form.action = "https://sandbox.payfast.co.za/eng/process";

    const data = {
      merchant_id: "21640826", // replace with your PayFast merchant ID
      merchant_key: "lbwzjvmjwbsfj", // replace with your PayFast key
      return_url: "https://mg-s-treders.onrender.com/success",
      cancel_url: "https://mg-s-treders.onrender.com/cancel",
      notify_url: "https://mg-s-treders.onrender.com/api/payfast/notify",
      amount,
      item_name: "MGS Traders Order",
      email_confirmation: 1,
      confirmation_address: "your@email.com",
      custom_str1: "MGS App Checkout",
    };

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
        backgroundColor: "#f8f9fa",
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

      <div>
        <label>
          <input
            type="radio"
            checked={deliveryOption === "Delivery"}
            onChange={() => setDeliveryOption("Delivery")}
          />
          Delivery
        </label>

        <label style={{ marginLeft: 20 }}>
          <input
            type="radio"
            checked={deliveryOption === "Collection"}
            onChange={() => setDeliveryOption("Collection")}
          />
          Collection
        </label>
      </div>

      {deliveryOption === "Delivery" && (
        <div style={{ marginTop: 12 }}>
          <textarea
            placeholder="Enter delivery address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            style={{ width: "100%", height: "60px", borderRadius: "8px" }}
          />
        </div>
      )}

      {cart.length === 0 ? (
        <p style={{ textAlign: "center", fontSize: "18px", color: "#666" }}>
          Your cart is empty.
        </p>
      ) : (
        <>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {cart.map((item, i) => (
              <li
                key={i}
                style={{
                  padding: "10px 0",
                  borderBottom: "1px solid #eee",
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "17px",
                }}
              >
                <span>
                  {item.type} × {item.quantity}
                </span>
                <strong>R{(item.price * item.quantity).toFixed(2)}</strong>
              </li>
            ))}
          </ul>

          <p>Subtotal: R{total.toFixed(2)}</p>
          <p>Delivery fee: R{deliveryFee.toFixed(2)}</p>
          <h3
            style={{
              textAlign: "right",
              marginTop: "20px",
              color: "#333",
              fontWeight: "bold",
            }}
          >
            Total: R{(total + deliveryFee).toFixed(2)}
          </h3>

          <button
            onClick={handlePayFastCheckout}
            style={{
              marginTop: "25px",
              width: "100%",
              background: "linear-gradient(135deg, #007bff, #00c8ff)",
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
          >
            💳 Pay with PayFast
          </button>
        </>
      )}
    </div>
  );
};

export default Checkout;

