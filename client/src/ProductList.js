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
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>🍜 MGS Traders – Noodles Shop</h1>
      <p>Select type and quantity, then add to cart:</p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {products.map((product) => {
          const option = selectedOptions[product.id] || { type: "Box", quantity: 1 };
          const price = option.type === "Box" ? product.boxPrice : product.packetPrice;

          return (
            <div
              key={product.id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "12px",
                padding: "10px",
                boxShadow: "2px 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                style={{ width: "100%", borderRadius: "12px" }}
              />
              <h3>{product.name}</h3>
              <p>📦 Box (5×10): <strong>R{product.boxPrice}</strong></p>
              <p>🥢 Packet (1×5): <strong>R{product.packetPrice}</strong></p>

              {/* Type selection */}
              <select
                value={option.type}
                onChange={(e) => handleOptionChange(product.id, e.target.value, option.quantity)}
                style={{ padding: "6px", marginBottom: "10px", width: "100%" }}
              >
                <option value="Box">Box</option>
                <option value="Packet">Packet</option>
              </select>

              {/* Quantity selection */}
              <input
                type="number"
                min="1"
                value={option.quantity}
                onChange={(e) => handleOptionChange(product.id, option.type, Number(e.target.value))}
                style={{ width: "100%", padding: "6px", marginBottom: "10px" }}
              />

              {/* Add to Cart button */}
              <button
                style={{
                  backgroundColor: "#28a745",
                  color: "white",
                  padding: "8px 16px",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  width: "100%",
                }}
                onClick={() => addToCart(product, option.type, option.quantity)}
              >
                Add to Cart - R{price * option.quantity}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;

