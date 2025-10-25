import React, { useState, useContext } from "react";
import { CartContext } from "./CartContext";

const products = [
  { id: 1, name: "Beef Flavour", image: "/images/beef.jpg", boxPrice: 200, packetPrice: 20 },
  { id: 2, name: "Chicken Flavour", image: "/images/chicken.jpg", boxPrice: 200, packetPrice: 20 },
  { id: 3, name: "Vegetable Flavour", image: "/images/vegetable.jpg", boxPrice: 200, packetPrice: 20 },
  { id: 4, name: "Cheese Flavour", image: "/images/cheese.jpg", boxPrice: 200, packetPrice: 20 },
  { id: 5, name: "Curry Flavour", image: "/images/curry.jpg", boxPrice: 200, packetPrice: 20 },
  { id: 6, name: "Spicy Beef Flavour", image: "/images/spicy-beef.jpg", boxPrice: 200, packetPrice: 20 },
  { id: 7, name: "Steak & Chops Flavour", image: "/images/steak-chops.jpg", boxPrice: 200, packetPrice: 20 },
  { id: 8, name: "Roast Lamb Flavour", image: "/images/roast-lamb.jpg", boxPrice: 200, packetPrice: 20 },
];

const ProductList = () => {
  const [selectedOptions, setSelectedOptions] = useState({});
  const { addToCart } = useContext(CartContext);

  const handleOptionChange = (productId, type, quantity) => {
    setSelectedOptions(prev => ({
      ...prev,
      [productId]: { type, quantity }
    }));
  };

  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <h1 style={{ color: "#007bff", fontWeight: "bold" }}>🍜 MGS Traders – Noodles Shop</h1>
      <p style={{ color: "#555", fontSize: "18px" }}>
        Choose your flavour, size, and quantity — then add to your cart
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "25px",
          marginTop: "30px",
        }}
      >
        {products.map(product => {
          const option = selectedOptions[product.id] || { type: "Box", quantity: 1 };
          const price = option.type === "Box" ? product.boxPrice : product.packetPrice;

          return (
            <div
              key={product.id}
              style={{
                backgroundColor: "#fff",
                borderRadius: "16px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                padding: "20px",
                transition: "transform 0.2s ease",
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                style={{
                  width: "100%",
                  height: "180px",
                  objectFit: "cover",
                  borderRadius: "12px",
                }}
              />
              <h3 style={{ color: "#333", marginTop: "10px" }}>{product.name}</h3>
              <p style={{ fontSize: "15px", color: "#777" }}>
                📦 Box (5×10): <strong>R{product.boxPrice}</strong> <br />
                🥢 Packet (1×5): <strong>R{product.packetPrice}</strong>
              </p>

              <div style={{ marginTop: "10px" }}>
                <select
                  value={option.type}
                  onChange={e => handleOptionChange(product.id, e.target.value, option.quantity)}
                  style={{
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                    width: "100%",
                    marginBottom: "10px",
                  }}
                >
                  <option value="Box">Box</option>
                  <option value="Packet">Packet</option>
                </select>

                <input
                  type="number"
                  min="1"
                  value={option.quantity}
                  onChange={e => handleOptionChange(product.id, option.type, Number(e.target.value))}
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                    marginBottom: "10px",
                  }}
                />

                <button
                  style={{
                    backgroundColor: "#007bff",
                    color: "white",
                    padding: "12px",
                    border: "none",
                    borderRadius: "10px",
                    cursor: "pointer",
                    width: "100%",
                    fontWeight: "bold",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.15)",
                    transition: "background-color 0.3s ease",
                  }}
                  onClick={() => addToCart(product, option.type, option.quantity)}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = "#0056b3"}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = "#007bff"}
                >
                  Add to Cart – R{price * option.quantity}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;

