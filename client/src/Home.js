import React, { useContext } from "react";
import { CartContext } from "./CartContext";
import "./Home.css";

const products = [
  { id: 1, name: "Beef", image: "/images/beef.jpg", boxPrice: 200, packetPrice: 20 },
  { id: 2, name: "Chicken", image: "/images/chicken.jpg", boxPrice: 200, packetPrice: 20 },
  { id: 3, name: "Vegetable", image: "/images/vegetable.jpg", boxPrice: 200, packetPrice: 20 },
  { id: 4, name: "Cheese", image: "/images/cheese.jpg", boxPrice: 200, packetPrice: 20 },
  { id: 5, name: "Curry", image: "/images/curry.jpg", boxPrice: 200, packetPrice: 20 },
  { id: 6, name: "Spicy Beef", image: "/images/spicy-beef.jpg", boxPrice: 200, packetPrice: 20 },
  { id: 7, name: "Steak & Chops", image: "/images/steak-chops.jpg", boxPrice: 200, packetPrice: 20 },
  { id: 8, name: "Roast Lamb", image: "/images/roast-lamb.jpg", boxPrice: 200, packetPrice: 20 }
];

export default function Home() {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="home-container">
      <h1 className="page-title">🍜 MGS Traders – Product List</h1>

      <div className="product-grid">
        {products.map((product, i) => (
          <div className="product-card" key={product.id}>
            <img className="product-image" src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>Box (5×10): R{product.boxPrice} • Packet (1×5): R{product.packetPrice}</p>

            <div className="controls">
              <select id={`type-${i}`} defaultValue="box" className="select">
                <option value="box">Box</option>
                <option value="packet">Packet</option>
              </select>

              <input id={`qty-${i}`} type="number" min="1" defaultValue="1" className="qty-input" />
            </div>

            <button
              className="add-btn"
              onClick={() => {
                const type = document.querySelector(`input[name="ignore-${i}"]`)?.value; // not used
                const chosenType = document.getElementById(`type-${i}`).value;
                const qty = Number(document.getElementById(`qty-${i}`).value) || 1;
                const price = chosenType === "box" ? product.boxPrice : product.packetPrice;
                addToCart(product, chosenType, price, qty);
              }}
            >
              🛒 Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

